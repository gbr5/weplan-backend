import { injectable, inject } from 'tsyringe';

import FormStyles from '@modules/forms/infra/typeorm/entities/FormStyles';
import IFormStylesRepository from '@modules/forms/repositories/IFormStylesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  background_color: string;
  text_color: string;
  button_color: string;
  button_text_color: string;
}

@injectable()
class UpdateFormStylesService {
  constructor(
    @inject('FormStylesRepository')
    private formStylesRepository: IFormStylesRepository,
  ) {}

  public async execute({
    id,
    background_color,
    text_color,
    button_color,
    button_text_color,
  }: IRequest): Promise<FormStyles> {
    const fomrStyles = await this.formStylesRepository.findById(id);

    if (!fomrStyles) {
      throw new AppError('Form field not found.');
    }

    fomrStyles.background_color = background_color;
    fomrStyles.text_color = text_color;
    fomrStyles.button_color = button_color;
    fomrStyles.button_text_color = button_text_color;

    const updatedForm = await this.formStylesRepository.save(fomrStyles);

    return updatedForm;
  }
}

export default UpdateFormStylesService;
