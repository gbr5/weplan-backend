import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactFilesRepository from '@modules/users/repositories/IContactFilesRepository';
import ContactFile from '@modules/users/infra/typeorm/entities/ContactFile';
import ICompanyContactsRepository from '@modules/suppliers/repositories/ICompanyContactsRepository';
import ICreateContactFileDTO from '../dtos/ICreateContactFileDTO';
import IUserFilesRepository from '../repositories/IUserFilesRepository';

@injectable()
class CreateContactFileService {
  constructor(
    @inject('ContactFilesRepository')
    private contactFilesRepository: IContactFilesRepository,

    @inject('CompanyContactsRepository')
    private companycontactsRepository: ICompanyContactsRepository,

    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,
  ) {}

  public async execute({
    contact_id,
    file_id,
  }: ICreateContactFileDTO): Promise<ContactFile> {
    const contactExists = await this.companycontactsRepository.findById(
      contact_id,
    );

    if (!contactExists) {
      throw new AppError('Contact not found!');
    }

    const fileExists = await this.userFilesRepository.findById(file_id);

    if (!fileExists) {
      throw new AppError('File not found!');
    }

    const file = await this.contactFilesRepository.create({
      contact_id,
      file_id,
    });

    return file;
  }
}

export default CreateContactFileService;
