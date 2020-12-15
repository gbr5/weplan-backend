import UserTransaction from '@modules/transactions/infra/typeorm/entities/UserTransaction';
import ICreateUserTransactionDTO from '@modules/transactions/dtos/ICreateUserTransactionDTO';

export default interface IUserTransactionsRepository {
  create(data: ICreateUserTransactionDTO): Promise<UserTransaction>;
  findById(id: string): Promise<UserTransaction | undefined>;
  findByUser(user_id: string): Promise<UserTransaction[]>;
  save(UserTransaction: UserTransaction): Promise<UserTransaction>;
  delete(UserTransaction: UserTransaction): Promise<void>;
}
