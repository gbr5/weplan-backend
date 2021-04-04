import { getRepository, Repository } from 'typeorm';
import IUserGoogleProfilesRepository from '@modules/googleProfiles/repositories/IUserGoogleProfilesRepository';
import UserGoogleProfile from '../entities/UserGoogleProfile';

class UserGoogleProfilesRepository implements IUserGoogleProfilesRepository {
  private ormRepository: Repository<UserGoogleProfile>;

  constructor() {
    this.ormRepository = getRepository(UserGoogleProfile);
  }

  public async findById(id: string): Promise<UserGoogleProfile | undefined> {
    const findUserGoogleProfile = await this.ormRepository.findOne(id);

    return findUserGoogleProfile;
  }

  public async findByGoogleId(
    googleId: string,
  ): Promise<UserGoogleProfile | undefined> {
    const findUserGoogleProfile = await this.ormRepository.findOne({
      where: { googleId },
    });

    return findUserGoogleProfile;
  }

  public async findByUserId(
    user_id: string,
  ): Promise<UserGoogleProfile | undefined> {
    const findUserGoogleProfile = await this.ormRepository.findOne({
      where: { user_id },
    });

    return findUserGoogleProfile;
  }

  public async create(
    user_id: string,
    google_profile_id: string,
  ): Promise<UserGoogleProfile> {
    const userGoogleProfile = this.ormRepository.create({
      user_id,
      google_profile_id,
    });

    await this.ormRepository.save(userGoogleProfile);

    return userGoogleProfile;
  }

  public async save(
    userGoogleProfile: UserGoogleProfile,
  ): Promise<UserGoogleProfile> {
    return this.ormRepository.save(userGoogleProfile);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserGoogleProfilesRepository;
