import WeplanContractOrderProduct from '@modules/weplan/infra/typeorm/entities/WeplanContractOrderProduct';
import ICreateWeplanContractOrderProductDTO from '@modules/weplan/dtos/ICreateWeplanContractOrderProductDTO';

export default interface IWeplanContractOrderProductRepository {
  create(
    data: ICreateWeplanContractOrderProductDTO,
  ): Promise<WeplanContractOrderProduct>;
  findById(id: string): Promise<WeplanContractOrderProduct | undefined>;
  findByContractOrderId(
    contract_order_id: string,
  ): Promise<WeplanContractOrderProduct[]>;
  findAll(): Promise<WeplanContractOrderProduct[]>;
  save(
    weplanContractOrder: WeplanContractOrderProduct,
  ): Promise<WeplanContractOrderProduct>;
  delete(id: string): Promise<void>;
}
