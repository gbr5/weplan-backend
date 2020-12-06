import BudgetFile from '@modules/users/infra/typeorm/entities/BudgetFile';
import ICreateBudgetFileDTO from '@modules/users/dtos/ICreateBudgetFileDTO';

export default interface IBudgetFilesRepository {
  create(data: ICreateBudgetFileDTO): Promise<BudgetFile>;
  findByBudgetId(budget_id: string): Promise<BudgetFile[]>;
  findById(id: string): Promise<BudgetFile | undefined>;
  save(data: BudgetFile): Promise<BudgetFile>;
  delete(data: BudgetFile): Promise<void>;
}
