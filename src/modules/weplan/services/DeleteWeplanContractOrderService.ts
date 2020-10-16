import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWeplanContractOrdersRepository from '@modules/weplan/repositories/IWeplanContractOrdersRepository';

@injectable()
class DeleteWeplanContractOrderService {
  constructor(
    @inject('WeplanContractOrdersRepository')
    private weplanContractOrder: IWeplanContractOrdersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const product = await this.weplanContractOrder.findById(id);

    if (!product) {
      throw new AppError('Event card relation not found.');
    }

    await this.weplanContractOrder.delete(id);
  }
}

export default DeleteWeplanContractOrderService;
