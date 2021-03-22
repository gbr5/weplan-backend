import { injectable, inject } from 'tsyringe';

import FormLandingPage from '@modules/forms/infra/typeorm/entities/FormLandingPage';
import IFormLandingPageRepository from '@modules/forms/repositories/IFormLandingPageRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  url: string;
  isActive: boolean;
}

@injectable()
class UpdateFormLandingPageService {
  constructor(
    @inject('FormLandingPageRepository')
    private formLandingPageRepository: IFormLandingPageRepository,
  ) {}

  public async execute({
    id,
    isActive,
    url,
  }: IRequest): Promise<FormLandingPage> {
    const fomrLandingPage = await this.formLandingPageRepository.findById(id);

    if (!fomrLandingPage) {
      throw new AppError('Form landing page not found.');
    }

    fomrLandingPage.isActive = isActive;
    fomrLandingPage.url = url;

    const updatedForm = await this.formLandingPageRepository.save(
      fomrLandingPage,
    );

    return updatedForm;
  }
}

export default UpdateFormLandingPageService;
