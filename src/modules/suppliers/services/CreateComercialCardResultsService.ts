import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardCheckListsRepository from '@modules/checklists/repositories/ICardCheckListsRepository';
import ICheckListsRepository from '@modules/checklists/repositories/ICheckListsRepository';
import ICheckListTasksRepository from '@modules/checklists/repositories/ICheckListTasksRepository';
import IComercialCardResultsRepository from '../repositories/IComercialCardResultsRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICreateComercialCardResultsDTO from '../dtos/ICreateComercialCardResultsDTO';
import ComercialCardResult from '../infra/typeorm/entities/ComercialCardResult';

@injectable()
class CreateComercialCardResultsService {
  constructor(
    @inject('ComercialCardResultsRepository')
    private comercialCardResultsRepository: IComercialCardResultsRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,

    @inject('CardCheckListsRepository')
    private cardCheckListsRepository: ICardCheckListsRepository,

    @inject('CheckListsRepository')
    private checkListsRepository: ICheckListsRepository,

    @inject('CheckListTasksRepository')
    private checkListTasksRepository: ICheckListTasksRepository,
  ) {}

  public async execute({
    card_id,
    note,
    contract_value,
    isSuccessful,
  }: ICreateComercialCardResultsDTO): Promise<ComercialCardResult> {
    const cardExists = await this.stageCardsRepository.findById(card_id);
    if (!cardExists) throw new AppError('Card not found.');

    const comercialCardExists = await this.comercialCardResultsRepository.findByCardId(
      card_id,
    );
    if (comercialCardExists)
      throw new AppError('Card already have results, try to edit it.');

    if (!isSuccessful) {
      const cardCheckList = await this.cardCheckListsRepository.findByCardUniqueName(
        cardExists.unique_name,
      );
      if (
        cardCheckList.length > 0 &&
        cardCheckList[0].check_list &&
        cardCheckList[0].check_list.id &&
        cardCheckList[0].check_list.isActive
      ) {
        const checkList = cardCheckList[0].check_list;
        const tasksIds = checkList.tasks
          .filter(task => task.isActive)
          .map(task => task.id);

        const tasks = await this.checkListTasksRepository.findAllById(tasksIds);
        Promise.all([
          tasks.map(task => {
            return this.checkListTasksRepository.save({
              ...task,
              isActive: false,
            });
          }),
        ]);
      }
    }

    cardExists.isActive = false;
    await this.stageCardsRepository.save(cardExists);

    const card = await this.comercialCardResultsRepository.create({
      card_id,
      note,
      contract_value,
      isSuccessful,
    });

    return card;
  }
}

export default CreateComercialCardResultsService;
