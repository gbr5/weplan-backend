import User from '@modules/users/infra/typeorm/entities/User';

interface IModulesDTO {
  management_module_id: string;
  access_level: number;
}

export default interface ICreateCompanyEmployeeDTO {
  employee: User;
  company: User;
  position: string;
  modules: IModulesDTO[];
}
