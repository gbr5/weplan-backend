import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardFilesRepository from '@modules/users/repositories/ICardFilesRepository';

@injectable()
class DeleteCardFileService {
  constructor(
    @inject('CardFilesRepository')
    private cardFilesRepository: ICardFilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cardFile = await this.cardFilesRepository.findById(id);

    if (!cardFile) {
      throw new AppError('No confirmation found.');
    }

    await this.cardFilesRepository.delete(cardFile);
  }
}

export default DeleteCardFileService;
