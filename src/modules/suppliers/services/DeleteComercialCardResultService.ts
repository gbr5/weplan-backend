import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IComercialCardResultsRepository from '@modules/suppliers/repositories/IComercialCardResultsRepository';

@injectable()
class DeleteComercialCardResultService {
  constructor(
    @inject('ComercialCardResultsRepository')
    private coemrcialCardResultsRepository: IComercialCardResultsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const coemrcialCardResult = await this.coemrcialCardResultsRepository.findById(
      id,
    );

    if (!coemrcialCardResult) {
      throw new AppError('Event card relation not found.');
    }

    await this.coemrcialCardResultsRepository.delete(coemrcialCardResult);
  }
}

export default DeleteComercialCardResultService;
