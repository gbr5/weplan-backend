import ICreateNoteDTO from './ICreateNoteDTO';

export default interface ICreateCheckListTaskNoteDTO {
  task_id: string;
  note: ICreateNoteDTO;
}
