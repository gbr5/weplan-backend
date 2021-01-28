import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventInspirationImagesRepository from '@modules/events/repositories/IEventInspirationImagesRepository';

@injectable()
class DeleteEventInspirationImageService {
  constructor(
    @inject('EventInspirationImagesRepository')
    private eventInspirationImagesRepository: IEventInspirationImagesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventInspirationImage = await this.eventInspirationImagesRepository.findById(
      id,
    );

    if (!eventInspirationImage) {
      throw new AppError('Image not found!');
    }

    await this.eventInspirationImagesRepository.delete(eventInspirationImage);
  }
}

export default DeleteEventInspirationImageService;
