import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import ICreateStageCardDTO from '@modules/suppliers/dtos/ICreateStageCardDTO';

export default interface IStageCardsRepository {
  create(data: ICreateStageCardDTO): Promise<StageCard>;
  findById(id: string): Promise<StageCard | undefined>;
  findByUniqueName(unique_name: string): Promise<StageCard | undefined>;
  findByStageId(stage_id: string): Promise<StageCard[]>;
  findNotActiveByStageId(stage_id: string): Promise<StageCard[]>;
  save(stageCard: StageCard): Promise<StageCard>;
  delete(stageCard: StageCard): Promise<void>;
}
