import { injectable, inject } from 'tsyringe';

import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICreateUserFormDTO from '../dtos/ICreateUserFormDTO';
import IFormStylesRepository from '../repositories/IFormStylesRepository';
import IFormFieldsRepository from '../repositories/IFormFieldsRepository';
import IFormEmailNotificationsRepository from '../repositories/IFormEmailNotificationsRepository';
import IFormSuccessMessageRepository from '../repositories/IFormSuccessMessageRepository';

@injectable()
class CreateUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,

    @inject('FormStylesRepository')
    private formStylesRepository: IFormStylesRepository,

    @inject('FormFieldsRepository')
    private formFieldsRepository: IFormFieldsRepository,

    @inject('FormSuccessMessageRepository')
    private formSuccessMessageRepository: IFormSuccessMessageRepository,

    @inject('FormEmailNotificationsRepository')
    private formEmailNotificationsRepository: IFormEmailNotificationsRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    slug,
    user_id,
    name,
    title,
    message,
    isActive,
  }: ICreateUserFormDTO): Promise<UserForm> {
    const employee = await this.companyEmployeesRepository.findById(user_id);

    if (!employee) {
      throw new AppError('User not found.');
    }

    const userForm = await this.userFormsRepository.findByUserIdAndSlug({
      slug,
      user_id: employee.company_id,
    });

    if (userForm) {
      throw new AppError(
        'A page with the same slug already exists. Try another one!',
      );
    }

    const form = await this.userFormsRepository.create({
      user_id: employee.company_id,
      slug,
      name,
      title,
      message,
      isActive,
    });

    Promise.all([
      await this.formFieldsRepository.create({
        form_id: form.id,
        title: 'Nome Completo',
        name: 'name',
        placeholder: 'Nome',
        type: 'text',
        position: 1,
        isRequired: true,
      }),
      await this.formEmailNotificationsRepository.create({
        form_id: form.id,
        subject: `[Nova Mensagem - ${form.name}] | We Plan PRO`,
        message: `Você recebeu uma nova mensagem por meio do formulário ${form.name}`,
        notification_type: 'internal_message',
      }),
      await this.formSuccessMessageRepository.create({
        form_id: form.id,
        title: `Formulário enviado com sucesso!`,
        message: `Em breve entraremos em contato.`,
      }),
      await this.formStylesRepository.create({
        form_id: form.id,
        background_color: '#c9c9c9',
        text_color: '#050115',
        button_color: '#ff9900',
        button_text_color: '#050115',
      }),
    ]);
    await this.formFieldsRepository.create({
      form_id: form.id,
      title: 'E-mail para contato',
      name: 'email',
      placeholder: 'E-mail',
      type: 'email',
      position: 2,
      isRequired: true,
    });
    await this.formFieldsRepository.create({
      form_id: form.id,
      title: 'Telefone para contato',
      name: 'phone',
      placeholder: ' ',
      type: 'number',
      position: 3,
      isRequired: false,
    });
    await this.formFieldsRepository.create({
      form_id: form.id,
      title: 'Como podemos ajudá-lo?',
      name: 'message',
      placeholder: 'Sua mensagem ...',
      type: 'textarea',
      position: 4,
      isRequired: true,
    });

    const updatedForm = await this.userFormsRepository.findById(form.id);

    return updatedForm || form;
  }
}

export default CreateUserFormService;
