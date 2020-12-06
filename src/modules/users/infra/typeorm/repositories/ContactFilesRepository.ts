import { getRepository, Repository } from 'typeorm';

import IContactFilesRepository from '@modules/users/repositories/IContactFilesRepository';
import ICreateContactFileDTO from '@modules/users/dtos/ICreateContactFileDTO';

import ContactFile from '@modules/users/infra/typeorm/entities/ContactFile';
import AppError from '@shared/errors/AppError';

class ContactFilesRepository implements IContactFilesRepository {
  private ormRepository: Repository<ContactFile>;

  constructor() {
    this.ormRepository = getRepository(ContactFile);
  }

  public async findByContactId(contact_id: string): Promise<ContactFile[]> {
    const findContactFile = await this.ormRepository.find({
      where: { contact_id },
    });

    return findContactFile;
  }

  public async findById(id: string): Promise<ContactFile | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(data: ICreateContactFileDTO): Promise<ContactFile> {
    try {
      const contactFile = this.ormRepository.create(data);

      await this.ormRepository.save(contactFile);

      return contactFile;
    } catch (err) {
      throw new AppError('Algo deu errado, ContactFilesRepository.create');
    }
  }

  public async save(data: ContactFile): Promise<ContactFile> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, ContactFilesRepository.save');
    }
  }

  public async delete(data: ContactFile): Promise<void> {
    try {
      await this.ormRepository.delete(data.id);
    } catch (err) {
      throw new AppError('Algo deu errado, ContactFilesRepository.delete');
    }
  }
}

export default ContactFilesRepository;
