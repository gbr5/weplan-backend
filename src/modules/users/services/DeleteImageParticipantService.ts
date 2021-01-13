import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IImageParticipantsRepository from '@modules/users/repositories/IImageParticipantsRepository';

@injectable()
class DeleteImageParticipantService {
  constructor(
    @inject('ImageParticipantsRepository')
    private userImagesRepository: IImageParticipantsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userImage = await this.userImagesRepository.findById(id);

    if (!userImage) {
      throw new AppError('No confirmation found.');
    }

    await this.userImagesRepository.delete(userImage);
  }
}

export default DeleteImageParticipantService;
