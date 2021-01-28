import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInspirationImagesRepository from '@modules/users/repositories/IInspirationImagesRepository';

import InspirationImage from '@modules/users/infra/typeorm/entities/InspirationImage';

interface IRequest {
  id: string;
  description: string;
}
@injectable()
class UpdateInspirationImageService {
  constructor(
    @inject('InspirationImagesRepository')
    private inspirationImagesRepository: IInspirationImagesRepository,
  ) {}

  public async execute({
    id,
    description,
  }: IRequest): Promise<InspirationImage> {
    const inspirationImage = await this.inspirationImagesRepository.findById(
      id,
    );

    if (!inspirationImage) {
      throw new AppError('Image not found.');
    }

    inspirationImage.description = description;

    const updatedInspirationImage = await this.inspirationImagesRepository.save(
      inspirationImage,
    );

    return updatedInspirationImage;
  }
}

export default UpdateInspirationImageService;
