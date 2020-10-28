import User from '@modules/users/infra/typeorm/entities/User';

interface IModulesDTO {
  management_module: string;
  access_level: number;
}

export default interface ICreateCompanyEmployeeDTO {
  employee: User;
  company: User;
  access_key: string;
  isActive: boolean;
  password: string;
  position: string;
  modules: IModulesDTO[];
}
