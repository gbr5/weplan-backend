import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWeplanProductsRepository from '@modules/suppliers/repositories/IWeplanProductsRepository';

@injectable()
class DeleteWeplanProductService {
  constructor(
    @inject('WeplanProductsRepository')
    private weplanManagementModulesRepository: IWeplanProductsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const product = await this.weplanManagementModulesRepository.findById(id);

    if (!product) {
      throw new AppError('Event card relation not found.');
    }

    await this.weplanManagementModulesRepository.delete(id);
  }
}

export default DeleteWeplanProductService;
