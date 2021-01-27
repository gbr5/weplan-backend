import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IImageParticipantsRepository from '@modules/users/repositories/IImageParticipantsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ImageParticipant from '@modules/users/infra/typeorm/entities/ImageParticipant';

@injectable()
class ListUserAsImageParticipantsService {
  constructor(
    @inject('ImageParticipantsRepository')
    private imageParticipantsRepository: IImageParticipantsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<ImageParticipant[]> {
    const imageParticipants = await this.imageParticipantsRepository.findByUserId(
      user_id,
    );
    const updatedImageParticipants = imageParticipants.map(participant => {
      const image_url = participant.userImage.getAvatarUrl();
      const { getAvatarUrl } = participant.userImage;
      return {
        ...participant,
        userImage: {
          ...participant.userImage,
          image_url: image_url || '',
          getAvatarUrl,
        },
      };
    });

    return updatedImageParticipants;
  }
}

export default ListUserAsImageParticipantsService;
