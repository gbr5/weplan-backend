import { getRepository, Repository } from 'typeorm';

import IWeplanContractOrdersRepository from '@modules/weplan/repositories/IWeplanContractOrdersRepository';
import ICreateWeplanContractOrderDTO from '@modules/weplan/dtos/ICreateWeplanContractOrderDTO';

import WeplanContractOrder from '@modules/weplan/infra/typeorm/entities/WeplanContractOrder';
import AppError from '@shared/errors/AppError';

class WeplanContractOrdersRepository
  implements IWeplanContractOrdersRepository {
  private ormRepository: Repository<WeplanContractOrder>;

  constructor() {
    this.ormRepository = getRepository(WeplanContractOrder);
  }

  public async findById(id: string): Promise<WeplanContractOrder | undefined> {
    const findWeplanContractOrder = await this.ormRepository.findOne(id);

    return findWeplanContractOrder;
  }

  public async findByUserId(user_id: string): Promise<WeplanContractOrder[]> {
    const findWeplanContractOrder = await this.ormRepository.find({
      where: { user_id },
    });

    return findWeplanContractOrder;
  }

  public async findAll(): Promise<WeplanContractOrder[]> {
    const findWeplanContractOrders = await this.ormRepository.find();

    return findWeplanContractOrders;
  }

  public async create(
    data: ICreateWeplanContractOrderDTO,
  ): Promise<WeplanContractOrder> {
    const funnelType = this.ormRepository.create(data);

    await this.ormRepository.save(funnelType);

    return funnelType;
  }

  public async save(
    weplanManagementModule: WeplanContractOrder,
  ): Promise<WeplanContractOrder> {
    return this.ormRepository.save(weplanManagementModule);
  }

  public async delete(id: string): Promise<void> {
    const module = await this.findById(id);
    if (!module) {
      throw new AppError('Management module not found.');
    }
    await this.ormRepository.delete(module.id);
  }
}

export default WeplanContractOrdersRepository;
