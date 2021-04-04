import GoogleProfile from '@modules/googleProfiles/infra/typeorm/entities/GoogleProfile';
import ICreateGoogleProfileDTO from '../dtos/ICreateGoogleProfileDTO';

export default interface IGoogleProfilesRepository {
  create(data: ICreateGoogleProfileDTO): Promise<GoogleProfile>;
  findById(id: string): Promise<GoogleProfile | undefined>;
  findByGoogleId(googleId: string): Promise<GoogleProfile | undefined>;
  list(): Promise<GoogleProfile[]>;
  save(form: GoogleProfile): Promise<GoogleProfile>;
  delete(form_id: string): Promise<void>;
}
