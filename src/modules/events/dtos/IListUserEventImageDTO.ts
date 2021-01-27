import Event from '@modules/events/infra/typeorm/entities/Event';
import UserImage from '@modules/users/infra/typeorm/entities/UserImage';

export default interface IListUserEventImageDTO {
  id: string;
  image_id: string;
  event_id: string;
  event: Event;
  image: UserImage;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}
