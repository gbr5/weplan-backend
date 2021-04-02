export default interface ICreateCompanyContactDTO {
  company_id: string;
  name: string;
  family_name: string;
  description: string;
  company_contact_type: string;
  weplanUser: boolean;
  isCompany: boolean;
  isNew: boolean;
}
