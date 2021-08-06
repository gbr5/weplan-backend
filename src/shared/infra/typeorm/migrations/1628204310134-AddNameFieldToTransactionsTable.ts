import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNameFieldToTransactionsTable1628204310134
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'name',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'name');
  }
}
