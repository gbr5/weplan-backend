export default interface ICreateWeplanContractOrderProductDTO {
  id?: string;
  contract_order_id: string;
  weplan_product_id: string;
  price: number;
  quantity: number;
}
