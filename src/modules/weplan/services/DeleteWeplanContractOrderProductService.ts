import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWeplanContractOrderProductsRepository from '@modules/weplan/repositories/IWeplanContractOrderProductsRepository';

@injectable()
class DeleteWeplanContractOrderProductService {
  constructor(
    @inject('WeplanContractOrderProductsRepository')
    private weplanContractOrder: IWeplanContractOrderProductsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const product = await this.weplanContractOrder.findById(id);

    if (!product) {
      throw new AppError('Event card relation not found.');
    }

    await this.weplanContractOrder.delete(id);
  }
}

export default DeleteWeplanContractOrderProductService;
