// import User from '@modules/users/infra/typeorm/entities/User';

// interface IModulesDTO {
//   management_module: string;
//   access_level: number;
// }

export default interface ICreateCompanyEmployeeDTO {
  position: string;
  access_key: string;
  email: string;
  password: string;
  isActive: boolean;
  employee_id: string;
  company_id: string;
  // modules: IModulesDTO[];
}
