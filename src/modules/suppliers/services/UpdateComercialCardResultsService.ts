import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IComercialCardResultsRepository from '@modules/suppliers/repositories/IComercialCardResultsRepository';

import ComercialCardResult from '@modules/suppliers/infra/typeorm/entities/ComercialCardResult';

interface IRequest {
  id: string;
  note: string;
  contract_value: number;
  isSuccessful: boolean;
}

@injectable()
class UpdateComercialCardResultsService {
  constructor(
    @inject('ComercialCardResultsRepository')
    private comercialCardResultsRepository: IComercialCardResultsRepository,
  ) {}

  public async execute({
    id,
    note,
    contract_value,
    isSuccessful,
  }: IRequest): Promise<ComercialCardResult> {
    const comercialCardResults = await this.comercialCardResultsRepository.findById(
      id,
    );

    if (!comercialCardResults) {
      throw new AppError('ComercialCardResults not found.');
    }

    comercialCardResults.note = note;
    comercialCardResults.contract_value = contract_value;
    comercialCardResults.isSuccessful = isSuccessful;

    const updatedComercialCardResults = await this.comercialCardResultsRepository.save(
      comercialCardResults,
    );

    return updatedComercialCardResults;
  }
}

export default UpdateComercialCardResultsService;
