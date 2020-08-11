import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactTypesRepository from '@modules/users/repositories/IContactTypesRepository';

import ContactType from '@modules/users/infra/typeorm/entities/ContactType';

interface IRequest {
  name: string;
  contact_type: string;
}
@injectable()
class UpdateContactTypeService {
  constructor(
    @inject('ContactTypesRepository')
    private contactTypesRepository: IContactTypesRepository,
  ) {}

  public async execute({ name, contact_type }: IRequest): Promise<ContactType> {
    const contactType = await this.contactTypesRepository.findByName(
      contact_type,
    );

    if (!contactType) {
      throw new AppError('Contact not found.');
    }

    contactType.name = name;

    const updatedContactType = await this.contactTypesRepository.save(
      contactType,
    );

    return updatedContactType;
  }
}

export default UpdateContactTypeService;
