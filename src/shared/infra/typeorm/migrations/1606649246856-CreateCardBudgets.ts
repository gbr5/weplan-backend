import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCardBudgets1606649246856
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'card_budgets',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'customer_id',
            type: 'uuid',
          },
          {
            name: 'sales_person_id',
            type: 'uuid',
          },
          {
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: 'card_unique_name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'numeric',
          },
          {
            name: 'validity_date',
            type: 'timestamp',
          },
          {
            name: 'number_of_installments',
            type: 'numeric',
          },
          {
            name: 'isValid',
            type: 'boolean',
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
            name: 'CustomerBudget',
            columnNames: ['customer_id'],
            referencedTableName: 'company_contacts',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'SalesPersonBudget',
            columnNames: ['sales_person_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CompanyBudget',
            columnNames: ['company_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('card_budgets');
  }
}
