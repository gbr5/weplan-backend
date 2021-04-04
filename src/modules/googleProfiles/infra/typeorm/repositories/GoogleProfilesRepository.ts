import { getRepository, Repository } from 'typeorm';
import IGoogleProfilesRepository from '@modules/googleProfiles/repositories/IGoogleProfilesRepository';
import GoogleProfile from '../entities/GoogleProfile';

class GoogleProfilesRepository implements IGoogleProfilesRepository {
  private ormRepository: Repository<GoogleProfile>;

  constructor() {
    this.ormRepository = getRepository(GoogleProfile);
  }

  public async findById(id: string): Promise<GoogleProfile | undefined> {
    const findGoogleProfile = await this.ormRepository.findOne(id);

    return findGoogleProfile;
  }

  public async findByGoogleId(
    googleId: string,
  ): Promise<GoogleProfile | undefined> {
    const findGoogleProfile = await this.ormRepository.findOne({
      where: { googleId },
    });

    return findGoogleProfile;
  }

  public async list(): Promise<GoogleProfile[]> {
    const findGoogleProfile = await this.ormRepository.find();

    return findGoogleProfile;
  }

  public async create(data: GoogleProfile): Promise<GoogleProfile> {
    const form = this.ormRepository.create(data);

    await this.ormRepository.save(form);

    return form;
  }

  public async save(form: GoogleProfile): Promise<GoogleProfile> {
    return this.ormRepository.save(form);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default GoogleProfilesRepository;
