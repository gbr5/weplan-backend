import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCompanyEmployeeConfirmation1603348236180
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company_employee_confirmation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'company_employee_id',
            type: 'uuid',
          },
          {
            name: 'request_message',
            type: 'varchar',
          },
          {
            name: 'isConfirmed',
            type: 'boolean',
          },
          {
            name: 'salary',
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
            name: 'EmployeeConfirmation',
            columnNames: ['company_employee_id'],
            referencedTableName: 'supplier_employees',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('company_employee_confirmation');
  }
}
