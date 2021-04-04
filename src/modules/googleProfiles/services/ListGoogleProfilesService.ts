import { injectable, inject } from 'tsyringe';

import GoogleProfile from '@modules/googleProfiles/infra/typeorm/entities/GoogleProfile';
import IGoogleProfilesRepository from '@modules/googleProfiles/repositories/IGoogleProfilesRepository';

// Deletar ESSE ARQUIVO console.log()
// E o de listagem de usuários, ou pelo menos proteger com senha
@injectable()
class ListGoogleProfilesService {
  constructor(
    @inject('GoogleProfilesRepository')
    private googleProfilesRepository: IGoogleProfilesRepository,
  ) {}

  public async execute(): Promise<GoogleProfile[]> {
    const googleProfiles = await this.googleProfilesRepository.list();

    return googleProfiles;
  }
}

export default ListGoogleProfilesService;
