export default interface ICreateFormFieldDTO {
  name: string;
  form_id: string;
  position: number;
  isRequired: boolean;
  title: string;
  placeholder: string;
  type: string;
}
