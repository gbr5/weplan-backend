import { getRepository, Repository } from 'typeorm';

import ISelectedSuppliersRepository from '@modules/events/repositories/ISelectedSuppliersRepository';
import ICreateSelectedSupplierDTO from '@modules/events/dtos/ICreateSelectedSupplierDTO';
import SelectedSupplier from '@modules/events/infra/typeorm/entities/SelectedSupplier';

interface IRequest {
  supplier_id: string;
  event_id: string;
}

class SelectedSuppliersRepository implements ISelectedSuppliersRepository {
  private ormRepository: Repository<SelectedSupplier>;

  constructor() {
    this.ormRepository = getRepository(SelectedSupplier);
  }

  public async findByIdAndEvent(
    supplier_id: string,
    event_id: string,
  ): Promise<SelectedSupplier | undefined> {
    const findSelectedSupplier = await this.ormRepository.findOne({
      where: { supplier_id, event_id },
    });

    return findSelectedSupplier;
  }

  public async findByEventAndIsHired(
    event_id: string,
  ): Promise<SelectedSupplier[]> {
    const findSelectedSupplier = await this.ormRepository.find({
      where: { event_id, isHired: true },
    });

    return findSelectedSupplier;
  }

  public async findByEvent(event_id: string): Promise<SelectedSupplier[]> {
    const findSelectedSupplier = await this.ormRepository.find({
      where: { event_id },
    });

    return findSelectedSupplier;
  }

  public async create(
    userData: ICreateSelectedSupplierDTO,
  ): Promise<SelectedSupplier> {
    const eventSupplier = this.ormRepository.create(userData);

    await this.ormRepository.save(eventSupplier);

    return eventSupplier;
  }

  public async save(
    eventSupplier: SelectedSupplier,
  ): Promise<SelectedSupplier> {
    return this.ormRepository.save(eventSupplier);
  }

  public async delete({ supplier_id, event_id }: IRequest): Promise<void> {
    await this.ormRepository.delete({
      supplier_id,
      event_id,
    });
  }
}

export default SelectedSuppliersRepository;
