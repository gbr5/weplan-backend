import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEventSupplierTransactionAgreement1626456055337
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_supplier_transaction_agreements',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'supplier_id',
            type: 'uuid',
          },
          {
            name: 'amount',
            type: 'numeric',
          },
          {
            name: 'number_of_installments',
            type: 'numeric',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'SupplierEventTransactionAgreement',
            columnNames: ['supplier_id'],
            referencedTableName: 'event_suppliers',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event_supplier_transaction_agreements');
  }
}
