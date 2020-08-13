import { getRepository, Repository } from 'typeorm';

import IFunnelTypesRepository from '@modules/suppliers/repositories/IFunnelTypesRepository';
import ICreateFunnelTypeDTO from '@modules/suppliers/dtos/ICreateFunnelTypeDTO';

import FunnelType from '@modules/suppliers/infra/typeorm/entities/FunnelType';

class FunnelTypesRepository implements IFunnelTypesRepository {
  private ormRepository: Repository<FunnelType>;

  constructor() {
    this.ormRepository = getRepository(FunnelType);
  }

  public async findByName(name: string): Promise<FunnelType | undefined> {
    const findFunnelType = await this.ormRepository.findOne({
      where: { name },
    });

    return findFunnelType;
  }

  public async findAll(): Promise<FunnelType[]> {
    const findFunnelTypes = await this.ormRepository.find();

    return findFunnelTypes;
  }

  public async create(data: ICreateFunnelTypeDTO): Promise<FunnelType> {
    const funnelType = this.ormRepository.create(data);

    await this.ormRepository.save(funnelType);

    return funnelType;
  }

  public async save(funnelType: FunnelType): Promise<FunnelType> {
    return this.ormRepository.save(funnelType);
  }
}

export default FunnelTypesRepository;
