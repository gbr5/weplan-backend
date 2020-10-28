export default interface ICreateUserConfirmationDTO {
  sender_id: string;
  receiver_id: string;
  title: string;
  message: string;
  isConfirmed: boolean;
}
