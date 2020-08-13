import { getRepository, Repository } from 'typeorm';

import IFunnelsRepository from '@modules/suppliers/repositories/IFunnelsRepository';

import Funnel from '@modules/suppliers/infra/typeorm/entities/Funnel';
import ICreateFunnelDTO from '@modules/suppliers/dtos/ICreateFunnelDTO';

class FunnelsRepository implements IFunnelsRepository {
  private ormRepository: Repository<Funnel>;

  constructor() {
    this.ormRepository = getRepository(Funnel);
  }

  public async findById(id: string): Promise<Funnel | undefined> {
    const findFunnel = await this.ormRepository.findOne({ id });

    return findFunnel;
  }

  public async findBySupplierId(supplier_id: string): Promise<Funnel[]> {
    const funnels = await this.ormRepository.find({
      where: { supplier_id },
    });

    return funnels;
  }

  public async create(data: ICreateFunnelDTO): Promise<Funnel> {
    const funnel = await this.ormRepository.create(data);

    await this.ormRepository.save(funnel);

    return funnel;
  }

  public async save(funnel: Funnel): Promise<Funnel> {
    return this.ormRepository.save(funnel);
  }

  public async delete({ id, supplier_id }: Funnel): Promise<void> {
    await this.ormRepository.delete({ id, supplier_id });
  }
}

export default FunnelsRepository;
