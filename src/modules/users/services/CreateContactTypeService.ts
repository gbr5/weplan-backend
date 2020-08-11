import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactTypesRepository from '@modules/users/repositories/IContactTypesRepository';
import ContactType from '@modules/users/infra/typeorm/entities/ContactType';

interface IRequest {
  name: string;
}

@injectable()
class CreateContactTypeService {
  constructor(
    @inject('ContactTypesRepository')
    private contactTypesRepository: IContactTypesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<ContactType> {
    const checkIfContactTypeExists = await this.contactTypesRepository.findByName(
      name,
    );

    if (checkIfContactTypeExists) {
      throw new AppError('This contact type is already created!');
    }

    const contactType = await this.contactTypesRepository.create({
      name,
    });

    return contactType;
  }
}

export default CreateContactTypeService;
