import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBudgetFilesRepository from '@modules/users/repositories/IBudgetFilesRepository';
import BudgetFile from '@modules/users/infra/typeorm/entities/BudgetFile';
import ICardBudgetsRepository from '@modules/suppliers/repositories/ICardBudgetsRepository';
import ICreateBudgetFileDTO from '../dtos/ICreateBudgetFileDTO';
import IUserFilesRepository from '../repositories/IUserFilesRepository';

@injectable()
class CreateBudgetFileService {
  constructor(
    @inject('BudgetFilesRepository')
    private budgetFilesRepository: IBudgetFilesRepository,

    @inject('CardBudgetsRepository')
    private cardbudgetsRepository: ICardBudgetsRepository,

    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,
  ) {}

  public async execute({
    budget_id,
    file_id,
  }: ICreateBudgetFileDTO): Promise<BudgetFile> {
    const budgetExists = await this.cardbudgetsRepository.findById(budget_id);

    if (!budgetExists) {
      throw new AppError('Budget not found!');
    }

    const fileExists = await this.userFilesRepository.findById(file_id);

    if (!fileExists) {
      throw new AppError('File not found!');
    }

    const file = await this.budgetFilesRepository.create({
      budget_id,
      file_id,
    });

    return file;
  }
}

export default CreateBudgetFileService;
