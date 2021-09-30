import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITaskNotesRepository from '@modules/tasks/repositories/ITaskNotesRepository';

@injectable()
class DeleteTaskNoteService {
  constructor(
    @inject('TaskNotesRepository')
    private taskNotesRepository: ITaskNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const taskNote = await this.taskNotesRepository.findById(id);

    if (!taskNote) {
      throw new AppError('Task note not found.');
    }

    await this.taskNotesRepository.delete(id);
  }
}

export default DeleteTaskNoteService;
