import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransactions1626477901536
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'amount',
            type: 'numeric',
          },
          {
            name: 'due_date',
            type: 'timestamp',
          },
          {
            name: 'isPaid',
            type: 'boolean',
          },
          {
            name: 'payer_id',
            type: 'uuid',
          },
          {
            name: 'payee_id',
            type: 'uuid',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
