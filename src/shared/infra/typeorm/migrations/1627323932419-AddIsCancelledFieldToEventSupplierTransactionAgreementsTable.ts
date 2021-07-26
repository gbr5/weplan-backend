import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIsCancelledFieldToEventSupplierTransactionAgreementsTable1627323932419
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'event_supplier_transaction_agreements',
      new TableColumn({
        name: 'isCancelled',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'event_supplier_transaction_agreements',
      'isCancelled',
    );
  }
}
