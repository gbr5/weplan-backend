import User from '@modules/users/infra/typeorm/entities/User';

interface IProductsWPDTO {
  weplan_product_id: string;
  price: number;
  quantity: number;
}

export default interface ICreateWeplanContractOrderWithProductsDTO {
  customer: User;
  products: IProductsWPDTO[];
}
