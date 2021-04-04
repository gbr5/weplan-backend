import UserGoogleProfile from '@modules/googleProfiles/infra/typeorm/entities/UserGoogleProfile';

export default interface IUserGoogleProfilesRepository {
  create(
    user_id: string,
    google_profile_id: string,
  ): Promise<UserGoogleProfile>;
  findByGoogleId(googleId: string): Promise<UserGoogleProfile | undefined>;
  findByUserId(user_id: string): Promise<UserGoogleProfile | undefined>;
  findById(id: string): Promise<UserGoogleProfile | undefined>;
  save(userGoogleProfile: UserGoogleProfile): Promise<UserGoogleProfile>;
  delete(id: string): Promise<void>;
}
