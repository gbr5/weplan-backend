import { injectable, inject } from 'tsyringe';

import FormLandingPage from '@modules/forms/infra/typeorm/entities/FormLandingPage';
import IFormLandingPageRepository from '@modules/forms/repositories/IFormLandingPageRepository';
import AppError from '@shared/errors/AppError';
import ICreateFormLandingPageDTO from '../dtos/ICreateFormLandingPageDTO';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

@injectable()
class CreateFormLandingPageService {
  constructor(
    @inject('FormLandingPageRepository')
    private formLandingPageRepository: IFormLandingPageRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute({
    form_id,
    isActive,
    url,
  }: ICreateFormLandingPageDTO): Promise<FormLandingPage> {
    const form = await this.userFormsRepository.findById(form_id);

    if (!form) {
      throw new AppError('Form not found.');
    }

    if (form.landingPage) {
      throw new AppError('This form already have a landing page.');
    }

    const newLandingPage = await this.formLandingPageRepository.create({
      form_id,
      isActive,
      url,
    });

    return newLandingPage;
  }
}

export default CreateFormLandingPageService;
