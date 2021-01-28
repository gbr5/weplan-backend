import InspirationImage from '@modules/users/infra/typeorm/entities/InspirationImage';
import ICreateInspirationImageDTO from '@modules/users/dtos/ICreateInspirationImageDTO';

export default interface IInspirationImagesRepository {
  create(data: ICreateInspirationImageDTO): Promise<InspirationImage>;
  findByUserId(user_id: string): Promise<InspirationImage[]>;
  findById(id: string): Promise<InspirationImage | undefined>;
  save(data: InspirationImage): Promise<InspirationImage>;
  delete(data: InspirationImage): Promise<void>;
}
