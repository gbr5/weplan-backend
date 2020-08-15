import SelectedSupplier from '@modules/events/infra/typeorm/entities/SelectedSupplier';
import ICreateSelectedSupplierDTO from '@modules/events/dtos/ICreateSelectedSupplierDTO';
import IFindSelectedSupplierIsHiredDTO from '@modules/events/dtos/IFindSelectedSupplierIsHiredDTO';

export default interface ISelectedSupplierRepository {
  findByIdAndEvent(
    supplier_id: string,
    event_name: string,
  ): Promise<SelectedSupplier | undefined>;
  findByIdAndEventAndIsHired(
    data: IFindSelectedSupplierIsHiredDTO,
  ): Promise<SelectedSupplier[]>;
  create(data: ICreateSelectedSupplierDTO): Promise<SelectedSupplier>;
  save(selectedSupplier: SelectedSupplier): Promise<SelectedSupplier>;
  delete(data: ICreateSelectedSupplierDTO): Promise<void>;
}
