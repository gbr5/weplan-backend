import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import IContactTypeRepository from '@modules/users/repositories/IContactTypesRepository';
import Guest from '../infra/typeorm/entities/Guest';
import IGuestsRepository from '../repositories/IGuestsRepository';
import IGuestContactInfosRepository from '../repositories/IGuestContactInfosRepository';

interface IRequest {
  first_name: string;
  last_name: string;
  whatsapp: string;
  email: string;
  weplanUser: boolean;
  address: string;
  description: string;
}

@injectable()
class ImportGuestsWithWhatsappAndEmailService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('GuestContactInfosRepository')
    private guestContactInfosRepository: IGuestContactInfosRepository,

    @inject('ContactTypesRepository')
    private contactTypesRepository: IContactTypeRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(
    guestListFileName: string,
    event_id: string,
    host_id: string,
    number_of_guests_available: number,
  ): Promise<Guest[]> {
    const fileName = await this.storageProvider.saveFile(guestListFileName);

    if (!fileName) {
      throw new AppError('Erro ao carregar o arquivo.');
    }
    const extractedFileName = fileName.split('-')[2];

    const file = fs.readFileSync(guestListFileName, 'utf-8');

    const fileLinesWithTitle = file.split('\n');

    const fileLines = fileLinesWithTitle.splice(1, fileLinesWithTitle.length);

    const fileLinesFiltered = fileLines.filter(line => line !== '');

    const rawGuestInfo = fileLinesFiltered.map(line => {
      const values = line.split(',');
      const guest: IRequest = {
        first_name: values[0],
        last_name: values[1],
        whatsapp: values[2] || 'n/a',
        email: values[3] || 'n/a',
        weplanUser: values[4] === 'true',
        address: values[5] || 'n/a',
        description: values[6] || 'n/a',
      };

      return guest;
    });

    if (rawGuestInfo.length > number_of_guests_available) {
      throw new AppError('Limite de convidados excedido.');
    }

    const guests: Guest[] = [];
    const contactTypes = await this.contactTypesRepository.findAll();

    // eslint-disable-next-line no-restricted-syntax
    for (const tguest of rawGuestInfo) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const createdGuest = await this.guestsRepository.create({
          first_name: tguest.first_name,
          last_name: tguest.last_name,
          confirmed: false,
          description:
            (tguest.description !== 'n/a' && tguest.description) ||
            `Importado do arquivo ${extractedFileName}`,
          event_id,
          host_id,
          weplanUser: tguest.weplanUser || false,
        });
        // eslint-disable-next-line no-await-in-loop
        await this.guestContactInfosRepository.create({
          contact_info: tguest.whatsapp,
          contact_type_id:
            contactTypes.find(e => e.name === 'Whatsapp')?.id || '',
          guest_id: createdGuest.id,
        });
        // eslint-disable-next-line no-await-in-loop
        await this.guestContactInfosRepository.create({
          contact_info: tguest.email,
          contact_type_id: contactTypes.find(e => e.name === 'Email')?.id || '',
          guest_id: createdGuest.id,
        });
        // eslint-disable-next-line no-await-in-loop
        await this.guestContactInfosRepository.create({
          contact_info: tguest.address,
          contact_type_id:
            contactTypes.find(e => e.name === 'Address')?.id || '',
          guest_id: createdGuest.id,
        });
        guests.push(createdGuest);
      } catch (err) {
        throw new AppError(err);
      }
    }
    await fs.promises.unlink(fileName);

    await this.storageProvider.deleteFile(fileName);

    return guests;
  }
}

export default ImportGuestsWithWhatsappAndEmailService;
