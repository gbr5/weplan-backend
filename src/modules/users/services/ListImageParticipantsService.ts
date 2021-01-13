import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IImageParticipantsRepository from '@modules/users/repositories/IImageParticipantsRepository';
import ImageParticipant from '../infra/typeorm/entities/ImageParticipant';

@injectable()
class ListImageParticipantService {
  constructor(
    @inject('ImageParticipantsRepository')
    private userImagesRepository: IImageParticipantsRepository,
  ) {}

  public async execute(image_id: string): Promise<ImageParticipant[]> {
    const userImages = this.userImagesRepository.findByImageId(image_id);

    return userImages;
  }
}

export default ListImageParticipantService;
