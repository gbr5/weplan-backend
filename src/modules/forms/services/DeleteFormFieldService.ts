import { injectable, inject } from 'tsyringe';

import IFormFieldsRepository from '@modules/forms/repositories/IFormFieldsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteFormFieldService {
  constructor(
    @inject('FormFieldsRepository')
    private formFieldsRepository: IFormFieldsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const formField = await this.formFieldsRepository.findById(id);

    if (!formField) {
      throw new AppError('Contact page not found.');
    }

    await this.formFieldsRepository.delete(id);
  }
}

export default DeleteFormFieldService;
