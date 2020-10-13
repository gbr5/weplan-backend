import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import Guest from '../infra/typeorm/entities/Guest';
import IGuestsRepository from '../repositories/IGuestsRepository';

interface IRequest {
  first_name: string;
  last_name: string;
  confirmed: boolean;
}

@injectable()
class ImportGuestsService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(
    guestListFileName: string,
    event_id: string,
    host_id: string,
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
        confirmed: values[2] === 'true',
      };
      return guest;
    });

    const guests: Guest[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const tguest of rawGuestInfo) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const createdGuest = await this.guestsRepository.create({
          first_name: tguest.first_name,
          last_name: tguest.last_name,
          confirmed: tguest.confirmed,
          description: `Importado do arquivo ${extractedFileName}`,
          event_id,
          host_id,
          weplanUser: false,
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

export default ImportGuestsService;
