import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactTypesRepository from '@modules/users/repositories/IContactTypesRepository';

interface IRequest {
  contact_type: string;
}
@injectable()
class DeleteContactTypeService {
  constructor(
    @inject('ContactTypesRepository')
    private contactTypesRepository: IContactTypesRepository,
  ) {}

  public async execute({ contact_type }: IRequest): Promise<void> {
    const contactType = await this.contactTypesRepository.findByName(
      contact_type,
    );

    if (!contactType) {
      throw new AppError('Contact type not found.');
    }

    await this.contactTypesRepository.delete(contactType);
  }
}

export default DeleteContactTypeService;
