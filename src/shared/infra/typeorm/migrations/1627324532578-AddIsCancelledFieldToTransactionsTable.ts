import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIsCancelledFieldToTransactionsTable1627324532578
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'isCancelled',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'isCancelled');
  }
}
