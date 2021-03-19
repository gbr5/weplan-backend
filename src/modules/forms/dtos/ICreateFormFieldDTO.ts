export default interface ICreateFormFieldDTO {
  name: string;
  position: number;
  form_id: string;
  isRequired: boolean;
  title: string;
  placeholder: string;
  type: string;
}
