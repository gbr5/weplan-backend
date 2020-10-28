import { getRepository, Repository } from 'typeorm';

import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import ICreateUserConfirmationDTO from '@modules/users/dtos/ICreateUserConfirmationDTO';

import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';
import AppError from '@shared/errors/AppError';

class UserConfirmationRepository implements IUserConfirmationRepository {
  private ormRepository: Repository<UserConfirmation>;

  constructor() {
    this.ormRepository = getRepository(UserConfirmation);
  }

  public async findByReceiverId(
    receiver_id: string,
  ): Promise<UserConfirmation[]> {
    const findUserConfirmation = await this.ormRepository.find({
      where: { receiver_id },
    });

    return findUserConfirmation;
  }

  public async findBySenderId(sender_id: string): Promise<UserConfirmation[]> {
    const findUserConfirmation = await this.ormRepository.find({
      where: { sender_id },
    });

    return findUserConfirmation;
  }

  public async findByReceiverIdAndSenderId(
    receiver_id: string,
    sender_id: string,
  ): Promise<UserConfirmation | undefined> {
    const findUserConfirmation = await this.ormRepository.findOne({
      where: { receiver_id },
    });

    return findUserConfirmation;
  }

  public async findById(id: string): Promise<UserConfirmation | undefined> {
    const employee = await this.ormRepository.findOne(id);

    return employee;
  }

  public async create(
    data: ICreateUserConfirmationDTO,
  ): Promise<UserConfirmation> {
    try {
      const userConfirmation = this.ormRepository.create(data);

      await this.ormRepository.save(userConfirmation);

      return userConfirmation;
    } catch (err) {
      throw new AppError('Algo deu errado, UserConfirmationRepository.create');
    }
  }

  public async save(employee: UserConfirmation): Promise<UserConfirmation> {
    try {
      return this.ormRepository.save(employee);
    } catch (err) {
      throw new AppError('Algo deu errado, UserConfirmationRepository.save');
    }
  }

  public async delete(employee: UserConfirmation): Promise<void> {
    try {
      await this.ormRepository.delete(employee.id);
    } catch (err) {
      throw new AppError('Algo deu errado, UserConfirmationRepository.delete');
    }
  }
}

export default UserConfirmationRepository;
