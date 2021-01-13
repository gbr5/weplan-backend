import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventImagesRepository from '@modules/events/repositories/IEventImagesRepository';

@injectable()
class DeleteEventImageService {
  constructor(
    @inject('EventImagesRepository')
    private eventImagesRepository: IEventImagesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventImage = await this.eventImagesRepository.findById(id);

    if (!eventImage) {
      throw new AppError('Image not found!');
    }

    await this.eventImagesRepository.delete(eventImage);
  }
}

export default DeleteEventImageService;
