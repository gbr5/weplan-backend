import { getRepository, Repository } from 'typeorm';

import IBudgetFilesRepository from '@modules/users/repositories/IBudgetFilesRepository';
import ICreateBudgetFileDTO from '@modules/users/dtos/ICreateBudgetFileDTO';

import BudgetFile from '@modules/users/infra/typeorm/entities/BudgetFile';
import AppError from '@shared/errors/AppError';

class BudgetFilesRepository implements IBudgetFilesRepository {
  private ormRepository: Repository<BudgetFile>;

  constructor() {
    this.ormRepository = getRepository(BudgetFile);
  }

  public async findByBudgetId(budget_id: string): Promise<BudgetFile[]> {
    const findBudgetFile = await this.ormRepository.find({
      where: { budget_id },
    });

    return findBudgetFile;
  }

  public async findById(id: string): Promise<BudgetFile | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(data: ICreateBudgetFileDTO): Promise<BudgetFile> {
    const budgetFile = this.ormRepository.create(data);

    await this.ormRepository.save(budgetFile);

    return budgetFile;
  }

  public async save(data: BudgetFile): Promise<BudgetFile> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, BudgetFilesRepository.save');
    }
  }

  public async delete(data: BudgetFile): Promise<void> {
    try {
      await this.ormRepository.delete(data.id);
    } catch (err) {
      throw new AppError('Algo deu errado, BudgetFilesRepository.delete');
    }
  }
}

export default BudgetFilesRepository;
