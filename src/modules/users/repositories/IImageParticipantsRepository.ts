import ImageParticipant from '@modules/users/infra/typeorm/entities/ImageParticipant';
import ICreateImageParticipantDTO from '../dtos/ICreateImageParticipantDTO';

export default interface IImageParticipantsRepository {
  create(data: ICreateImageParticipantDTO): Promise<ImageParticipant>;
  findByUserId(user_id: string): Promise<ImageParticipant[]>;
  findByImageId(image_id: string): Promise<ImageParticipant[]>;
  findById(id: string): Promise<ImageParticipant | undefined>;
  save(data: ImageParticipant): Promise<ImageParticipant>;
  delete(data: ImageParticipant): Promise<void>;
}
