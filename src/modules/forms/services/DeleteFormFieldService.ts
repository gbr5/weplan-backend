import { injectable, inject } from 'tsyringe';

import IFormFieldsRepository from '@modules/forms/repositories/IFormFieldsRepository';
import AppError from '@shared/errors/AppError';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

@injectable()
class DeleteFormFieldService {
  constructor(
    @inject('FormFieldsRepository')
    private formFieldsRepository: IFormFieldsRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const formField = await this.formFieldsRepository.findById(id);

    if (!formField) {
      throw new AppError('Contact page not found.');
    }

    const form = await this.userFormsRepository.findById(formField.form_id);

    if (!form) {
      throw new AppError('Form not found.');
    }
    await this.formFieldsRepository.delete(id);

    const fieldsToUpdate = form.fields
      .filter(thisField => thisField.position >= formField.position)
      .map(thisField => {
        return {
          ...thisField,
          position: thisField.position - 1,
        };
      });

    Promise.all([
      fieldsToUpdate.map(thisField => {
        return this.formFieldsRepository.save(thisField);
      }),
    ]);
  }
}

export default DeleteFormFieldService;
