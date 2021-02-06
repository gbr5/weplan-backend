import UserFile from '@modules/users/infra/typeorm/entities/UserFile';

export default interface ICreatAppointmentFilesDTO {
  files: UserFile[];
  appointment_id: string;
}
