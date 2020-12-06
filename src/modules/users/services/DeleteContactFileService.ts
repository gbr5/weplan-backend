import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactFilesRepository from '@modules/users/repositories/IContactFilesRepository';

@injectable()
class DeleteContactFileService {
  constructor(
    @inject('ContactFilesRepository')
    private contactFilesRepository: IContactFilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const contactFile = await this.contactFilesRepository.findById(id);

    if (!contactFile) {
      throw new AppError('No confirmation found.');
    }

    await this.contactFilesRepository.delete(contactFile);
  }
}

export default DeleteContactFileService;
