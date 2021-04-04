import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ICreateUserGoogleProfileDTO from '../dtos/ICreateUserGoogleProfileDTO';
import IGoogleProfilesRepository from '../repositories/IGoogleProfilesRepository';
import IUserGoogleProfilesRepository from '../repositories/IUserGoogleProfilesRepository';
import UserGoogleProfile from '../infra/typeorm/entities/UserGoogleProfile';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GoogleProfilesRepository')
    private googleProfilesRepository: IGoogleProfilesRepository,

    @inject('UserGoogleProfilesRepository')
    private userGoogleProfilesRepository: IUserGoogleProfilesRepository,
  ) {}

  public async execute({
    profileObj,
    user_id,
  }: ICreateUserGoogleProfileDTO): Promise<UserGoogleProfile> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }

    const findGoogleProfile = await this.googleProfilesRepository.findByGoogleId(
      profileObj.googleId,
    );

    if (findGoogleProfile) {
      throw new AppError('This Google profile already exists!');
    }

    const googleProfile = await this.googleProfilesRepository.create({
      googleId: profileObj.googleId,
      email: profileObj.email,
      name: profileObj.name,
      givenName: profileObj.givenName,
      familyName: profileObj.familyName,
      imageUrl: profileObj.imageUrl,
    });

    const userGoogleProfile = await this.userGoogleProfilesRepository.create(
      user_id,
      googleProfile.id,
    );

    return userGoogleProfile;
  }
}

export default CreateUserService;
