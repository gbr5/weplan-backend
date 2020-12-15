import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEventMemberPaymentTransactions1607926075889
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_member_payment_transactions',
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
            name: 'EventMemberPaymentMainTransactions',
            columnNames: ['main_transaction_id'],
            referencedTableName: 'main_transactions',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'MainTransactionsEventMemberPayments',
            columnNames: ['payment_id'],
            referencedTableName: 'event_member_payments',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event_member_payment_transactions');
  }
}
