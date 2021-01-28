import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IInspirationImagesRepository from '@modules/users/repositories/IInspirationImagesRepository';
import InspirationImage from '../infra/typeorm/entities/InspirationImage';

@injectable()
class ListInspirationImageService {
  constructor(
    @inject('InspirationImagesRepository')
    private inspirationImagesRepository: IInspirationImagesRepository,
  ) {}

  public async execute(user_id: string): Promise<InspirationImage[]> {
    const inspirationImages = this.inspirationImagesRepository.findByUserId(
      user_id,
    );

    return inspirationImages;
  }
}

export default ListInspirationImageService;
