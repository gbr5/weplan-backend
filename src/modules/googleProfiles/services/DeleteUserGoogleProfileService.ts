import { injectable, inject } from 'tsyringe';

import IUserGoogleProfilesRepository from '@modules/googleProfiles/repositories/IUserGoogleProfilesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteUserGoogleProfileService {
  constructor(
    @inject('UserGoogleProfilesRepository')
    private userGoogleProfilesRepository: IUserGoogleProfilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userGoogleProfile = await this.userGoogleProfilesRepository.findById(
      id,
    );

    if (!userGoogleProfile) {
      throw new AppError('GoogleProfile not found.');
    }
    await this.userGoogleProfilesRepository.delete(id);
  }
}

export default DeleteUserGoogleProfileService;
