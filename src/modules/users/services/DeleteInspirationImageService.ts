import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInspirationImagesRepository from '@modules/users/repositories/IInspirationImagesRepository';

@injectable()
class DeleteInspirationImageService {
  constructor(
    @inject('InspirationImagesRepository')
    private inspirationImagesRepository: IInspirationImagesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const inspirationImage = await this.inspirationImagesRepository.findById(
      id,
    );

    if (!inspirationImage) {
      throw new AppError('No confirmation found.');
    }

    await this.inspirationImagesRepository.delete(inspirationImage);
  }
}

export default DeleteInspirationImageService;
