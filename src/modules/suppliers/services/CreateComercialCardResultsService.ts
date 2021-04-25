import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardCheckListsRepository from '@modules/checklists/repositories/ICardCheckListsRepository';
import ICheckListTasksRepository from '@modules/checklists/repositories/ICheckListTasksRepository';
import ICheckListTaskNotesRepository from '@modules/notes/repositories/ICheckListTaskNotesRepository';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import IComercialCardResultsRepository from '../repositories/IComercialCardResultsRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICreateComercialCardResultsDTO from '../dtos/ICreateComercialCardResultsDTO';
import ComercialCardResult from '../infra/typeorm/entities/ComercialCardResult';
import ICardNotesRepository from '../repositories/ICardNotesRepository';

@injectable()
class CreateComercialCardResultsService {
  constructor(
    @inject('ComercialCardResultsRepository')
    private comercialCardResultsRepository: IComercialCardResultsRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,

    @inject('CardNotesRepository')
    private cardNotesRepository: ICardNotesRepository,

    @inject('CardCheckListsRepository')
    private cardCheckListsRepository: ICardCheckListsRepository,

    @inject('CheckListTaskNotesRepository')
    private checkListTaskNotesRepository: ICheckListTaskNotesRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,

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
      await this.cardNotesRepository.create({
        card_unique_name: cardExists.unique_name,
        note: `Negócio Encerrado|||\n.\nNegócio ${cardExists.name} perdido\n.\nNota:\n${note}\n. . . . .\n`,
        user_id: cardExists.card_owner,
      });
      const cardCheckList = await this.cardCheckListsRepository.findByCardUniqueName(
        cardExists.unique_name,
      );

      const newNote = await this.notesRepository.create({
        author_id: cardCheckList[0].check_list.user_id,
        isNew: true,
        note:
          'Tarefa Encerrada|||\n.\nA tarefa foi encerrada pois o negócio associado a ela foi encerrado!\n. . . . .\n',
      });
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
          tasks.map(task => {
            return this.checkListTaskNotesRepository.create({
              task_id: task.id,
              note_id: newNote.id,
            });
          }),
        ]);
      }
    }
    if (isSuccessful)
      await this.cardNotesRepository.create({
        card_unique_name: cardExists.unique_name,
        note: `Negócio Encerrado|||\n.\nNegócio ${cardExists.name} fechado!\n.\nParabéns!\n.\nValor do contrato: R$ ${contract_value}\n.\nNota:\n${note}\n. . . . .\n`,
        user_id: cardExists.card_owner,
      });

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
