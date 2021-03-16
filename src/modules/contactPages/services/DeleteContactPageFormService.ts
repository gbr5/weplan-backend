import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactPageFormsRepository from '../repositories/IContactPageFormsRepository';

@injectable()
class DeleteContactPageFormService {
  constructor(
    @inject('ContactPageFormsRepository')
    private contactPageFormsRepository: IContactPageFormsRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const form = await this.contactPageFormsRepository.findById(id);

    if (!form) {
      throw new AppError('Contact page form not found!');
    }

    if (form.form.user_id !== user_id) {
      throw new AppError('Contact page not found!');
    }

    await this.contactPageFormsRepository.delete(id);
  }
}

export default DeleteContactPageFormService;
