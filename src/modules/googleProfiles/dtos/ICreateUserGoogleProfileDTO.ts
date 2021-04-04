import ICreateGoogleProfileDTO from './ICreateGoogleProfileDTO';

export default interface ICreateUserGoogleProfileDTO {
  user_id: string;
  profileObj: ICreateGoogleProfileDTO;
}
