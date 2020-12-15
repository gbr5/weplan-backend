import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEventOwnerPaymentTransactions1607927467684
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_owner_payment_transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'main_transaction_id',
            type: 'uuid',
          },
          {
            name: 'payment_id',
            type: 'uuid',
          },
          {
            name: 'transaction_type',
            type: 'varchar',
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
            name: 'EventOwnerPaymentMainTransactions',
            columnNames: ['main_transaction_id'],
            referencedTableName: 'main_transactions',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'MainTransactionsEventOwnerPayments',
            columnNames: ['payment_id'],
            referencedTableName: 'event_owner_payments',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event_owner_payment_transactions');
  }
}
