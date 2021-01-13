import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserImagesRepository from '@modules/users/repositories/IUserImagesRepository';

@injectable()
class DeleteUserImageService {
  constructor(
    @inject('UserImagesRepository')
    private userImagesRepository: IUserImagesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userImage = await this.userImagesRepository.findById(id);

    if (!userImage) {
      throw new AppError('No confirmation found.');
    }

    await this.userImagesRepository.delete(userImage);
  }
}

export default DeleteUserImageService;
