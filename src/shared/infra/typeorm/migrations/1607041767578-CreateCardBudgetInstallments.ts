import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCardBudgetInstallments1607041767578
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'card_budget_installments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'card_budget_id',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'numeric',
          },
          {
            name: 'due_date',
            type: 'timestamp',
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
            name: 'CardBudgetInstallments',
            columnNames: ['card_budget_id'],
            referencedTableName: 'card_budgets',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('card_budget_installments');
  }
}
