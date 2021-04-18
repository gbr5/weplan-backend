import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICheckListTaskNotesRepository from '../repositories/ICheckListTaskNotesRepository';

@injectable()
class DeleteCheckListTaskNoteService {
  constructor(
    @inject('CheckListTaskNotesRepository')
    private checkListTaskNotesRepository: ICheckListTaskNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkListTaskNote = await this.checkListTaskNotesRepository.findById(
      id,
    );

    if (!checkListTaskNote) {
      throw new AppError('No task note found.');
    }

    await this.checkListTaskNotesRepository.delete(checkListTaskNote);
  }
}

export default DeleteCheckListTaskNoteService;
