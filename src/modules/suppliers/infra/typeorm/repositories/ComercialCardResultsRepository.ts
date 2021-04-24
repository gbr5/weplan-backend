import { getRepository, Repository } from 'typeorm';

import IComercialCardResultsRepository from '@modules/suppliers/repositories/IComercialCardResultsRepository';
import ICreateComercialCardResultsDTO from '@modules/suppliers/dtos/ICreateComercialCardResultsDTO';
import ComercialCardResult from '@modules/suppliers/infra/typeorm/entities/ComercialCardResult';

class ComercialCardResultsRepository
  implements IComercialCardResultsRepository {
  private ormRepository: Repository<ComercialCardResult>;

  constructor() {
    this.ormRepository = getRepository(ComercialCardResult);
  }

  public async findByCardId(
    card_id: string,
  ): Promise<ComercialCardResult | undefined> {
    const findComercialCardResults = await this.ormRepository.findOne({
      where: { card_id },
    });

    return findComercialCardResults;
  }

  public async findById(id: string): Promise<ComercialCardResult | undefined> {
    const findComercialCardResults = await this.ormRepository.findOne(id);

    return findComercialCardResults;
  }

  public async create(
    data: ICreateComercialCardResultsDTO,
  ): Promise<ComercialCardResult> {
    const card = this.ormRepository.create(data);

    await this.ormRepository.save(card);

    return card;
  }

  public async save(data: ComercialCardResult): Promise<ComercialCardResult> {
    return this.ormRepository.save(data);
  }

  public async delete({ id }: ComercialCardResult): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default ComercialCardResultsRepository;
