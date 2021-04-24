import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ComercialCardResult from '@modules/suppliers/infra/typeorm/entities/ComercialCardResult';
import IComercialCardResultsRepository from '@modules/suppliers/repositories/IComercialCardResultsRepository';

@injectable()
class ShowComercialCardResultsService {
  constructor(
    @inject('ComercialCardResultsRepository')
    private comercialCardResultsRepository: IComercialCardResultsRepository,
  ) {}

  public async execute(
    card_id: string,
  ): Promise<ComercialCardResult | undefined> {
    const comercialCardResults = await this.comercialCardResultsRepository.findByCardId(
      card_id,
    );

    return comercialCardResults;
  }
}

export default ShowComercialCardResultsService;
