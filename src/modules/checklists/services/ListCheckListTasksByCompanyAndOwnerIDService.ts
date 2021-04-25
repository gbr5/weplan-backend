import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import { differenceInDays } from 'date-fns';
import ICheckListTaskNotesRepository from '@modules/notes/repositories/ICheckListTaskNotesRepository';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICheckListsRepository from '../repositories/ICheckListsRepository';
import ICheckListTasksRepository from '../repositories/ICheckListTasksRepository';

interface IRequest {
  company_id: string;
  owner_id: string;
  day?: number;
  month?: number;
  year?: number;
}

@injectable()
class ListCheckListTasksByCompanyAndOwnerIDService {
  constructor(
    @inject('CheckListsRepository')
    private checkListsRepository: ICheckListsRepository,

    @inject('CheckListTasksRepository')
    private checkListTasksRepository: ICheckListTasksRepository,

    @inject('CheckListTaskNotesRepository')
    private checkListTaskNotesRepository: ICheckListTaskNotesRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({
    company_id,
    owner_id,
    day,
    month,
    year,
  }: IRequest): Promise<CheckListTask[]> {
    const companyCheckLists = await this.checkListsRepository.findByUserId(
      company_id,
    );

    const owner_tasks: CheckListTask[] = [];
    companyCheckLists.map(checkList => {
      const tasks = checkList.tasks
        .filter(task => task.isActive)
        .filter(task => task.owner_id === owner_id);
      tasks.map(xtask => {
        owner_tasks.push(xtask);
        return xtask;
      });
      return tasks;
    });
    const now = new Date();

    const newNote = await this.notesRepository.create({
      author_id: company_id,
      isNew: true,
      note: 'Tarefa Concluída|||\n.\nTarefa encerrada!\n. . . . .\n',
    });

    owner_tasks
      .filter(task => task.isActive)
      .map(task => {
        const taskDueDate = new Date(task.due_date);
        if (
          task.status === '3' &&
          taskDueDate !== undefined &&
          differenceInDays(now, taskDueDate) > 0
        ) {
          return Promise.all([
            this.checkListTasksRepository.save({
              ...task,
              isActive: false,
            }),
            this.checkListTaskNotesRepository.create({
              note_id: newNote.id,
              task_id: task.id,
            }),
          ]);
        }
        return '';
      });

    if (day && month && year) {
      const sorted_owner_tasks = owner_tasks.filter(task => {
        const selectedDate = `${year}/${month}/${day}`;
        const taskDueDateFormated = new Date(task.due_date);
        const taskDate = `${taskDueDateFormated.getFullYear()}/${
          taskDueDateFormated.getMonth() + 1
        }/${taskDueDateFormated.getDate()}`;
        return selectedDate === taskDate;
      });
      return sorted_owner_tasks;
    }

    return owner_tasks;
  }
}

export default ListCheckListTasksByCompanyAndOwnerIDService;
