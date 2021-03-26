import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import IUserContactPagesRepository from '../repositories/IUserContactPagesRepository';

interface IRequest {
  contact_page_id: string;
  image_url: string;
}
@injectable()
class UpdateContactPageMainImageService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    contact_page_id,
    image_url,
  }: IRequest): Promise<UserContactPage> {
    const userContactPage = await this.userContactPagesRepository.findById(
      contact_page_id,
    );

    if (!userContactPage) {
      throw new AppError(
        'Only authenticated userContactPages can change image_url.',
        401,
      );
    }

    if (userContactPage.image_url) {
      await this.storageProvider.deleteFile(userContactPage.image_url);
    }

    const fileName = await this.storageProvider.saveFile(image_url);

    userContactPage.image_url = fileName;

    await this.userContactPagesRepository.save(userContactPage);

    return userContactPage;
  }
}

export default UpdateContactPageMainImageService;
