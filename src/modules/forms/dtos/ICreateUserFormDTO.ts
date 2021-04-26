export default interface ICreateUserFormDTO {
  user_id: string;
  slug: string;
  name: string;
  external_name: string;
  title: string;
  message: string;
  isActive: boolean;
}
