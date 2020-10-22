import User from '@modules/users/infra/typeorm/entities/User';

interface IModulesDTO {
  management_module_id: string;
  access_level: number;
}

interface IEmployeeConfirmationDTO {
  request_message: string;
  isConfirmed: boolean;
  salary: number;
}

export default interface ICreateCompanyEmployeeDTO {
  employee: User;
  company: User;
  position: string;
  modules: IModulesDTO[];
  confirmation: IEmployeeConfirmationDTO;
}
