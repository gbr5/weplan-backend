import { injectable, inject } from 'tsyringe';

import IUserGoogleProfilesRepository from '@modules/googleProfiles/repositories/IUserGoogleProfilesRepository';
import AppError from '@shared/errors/AppError';
import IGoogleProfilesRepository from '../repositories/IGoogleProfilesRepository';
import GoogleProfile from '../infra/typeorm/entities/GoogleProfile';

interface IResponse {
  id: string;
  user_id: string;
  profileObj: GoogleProfile;
}

@injectable()
class ShowUserGoogleProfileService {
  constructor(
    @inject('UserGoogleProfilesRepository')
    private userGoogleProfilesRepository: IUserGoogleProfilesRepository,

    @inject('GoogleProfilesRepository')
    private googleProfilesRepository: IGoogleProfilesRepository,
  ) {}

  public async execute(user_id: string): Promise<IResponse> {
    const userGoogleProfile = await this.userGoogleProfilesRepository.findByUserId(
      user_id,
    );

    if (!userGoogleProfile) {
      throw new AppError('GoogleProfile not found.');
    }
    const googleProfile = await this.googleProfilesRepository.findById(
      userGoogleProfile.google_profile_id,
    );

    if (!googleProfile) {
      throw new AppError('GoogleProfile not found.');
    }

    return {
      id: userGoogleProfile.id,
      user_id,
      profileObj: googleProfile,
    };
  }
}

export default ShowUserGoogleProfileService;
