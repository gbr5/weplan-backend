import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IContactFilesRepository from '@modules/users/repositories/IContactFilesRepository';
import ContactFile from '../infra/typeorm/entities/ContactFile';

@injectable()
class ListContactFileService {
  constructor(
    @inject('ContactFilesRepository')
    private contactFilesRepository: IContactFilesRepository,
  ) {}

  public async execute(contact_id: string): Promise<ContactFile[]> {
    const contactFiles = this.contactFilesRepository.findByContactId(
      contact_id,
    );

    return contactFiles;
  }
}

export default ListContactFileService;
