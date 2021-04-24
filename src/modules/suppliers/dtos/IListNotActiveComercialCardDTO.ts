import ComercialCardResult from '../infra/typeorm/entities/ComercialCardResult';
import StageCard from '../infra/typeorm/entities/StageCard';

export default interface IListNotActiveComercialCardDTO {
  card: StageCard;
  results: ComercialCardResult;
}
