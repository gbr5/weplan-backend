import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';
import ICreateUserConfirmationDTO from '@modules/users/dtos/ICreateUserConfirmationDTO';

export default interface IUserConfirmationRepository {
  create(data: ICreateUserConfirmationDTO): Promise<UserConfirmation>;
  findByReceiverId(receiver_id: string): Promise<UserConfirmation[]>;
  findBySenderId(sender_id: string): Promise<UserConfirmation[]>;
  findByReceiverIdAndSenderId(
    sender_id: string,
    receiver_id: string,
  ): Promise<UserConfirmation | undefined>;
  findById(id: string): Promise<UserConfirmation | undefined>;
  save(supplier: UserConfirmation): Promise<UserConfirmation>;
  delete(employee: UserConfirmation): Promise<void>;
}
