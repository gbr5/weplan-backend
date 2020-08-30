import SelectedSupplier from '@modules/events/infra/typeorm/entities/SelectedSupplier';
import ICreateSelectedSupplierDTO from '@modules/events/dtos/ICreateSelectedSupplierDTO';

export default interface ISelectedSupplierRepository {
  findByIdAndEvent(
    supplier_id: string,
    event_id: string,
  ): Promise<SelectedSupplier | undefined>;
  findByEventAndIsHired(event_id: string): Promise<SelectedSupplier[]>;
  findByEvent(event_id: string): Promise<SelectedSupplier[]>;
  create(data: ICreateSelectedSupplierDTO): Promise<SelectedSupplier>;
  save(selectedSupplier: SelectedSupplier): Promise<SelectedSupplier>;
  delete(data: ICreateSelectedSupplierDTO): Promise<void>;
}
