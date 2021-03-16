import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactPageFormsRepository from '../repositories/IContactPageFormsRepository';
import ContactPageForm from '../infra/typeorm/entities/ContactPageForm';

interface IRequest {
  id: string;
  user_id: string;
  isActive: boolean;
}

@injectable()
class UpdateContactPageFormService {
  constructor(
    @inject('ContactPageFormsRepository')
    private contactPageFormsRepository: IContactPageFormsRepository,
  ) {}

  public async execute({
    id,
    user_id,
    isActive,
  }: IRequest): Promise<ContactPageForm> {
    const form = await this.contactPageFormsRepository.findById(id);

    if (!form) {
      throw new AppError('Contact page form not found!');
    }

    if (form.form.user_id !== user_id) {
      throw new AppError('Contact page not found!');
    }

    form.isActive = isActive;

    await this.contactPageFormsRepository.save(form);

    return form;
  }
}

export default UpdateContactPageFormService;
