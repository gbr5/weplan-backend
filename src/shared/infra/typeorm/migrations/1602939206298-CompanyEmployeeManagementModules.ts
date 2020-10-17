import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CompanyEmployeeManagementModules1602939206298
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company_employee_management_modules',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'supplier_employee_id',
            type: 'uuid',
          },
          {
            name: 'management_module_id',
            type: 'uuid',
          },
          {
            name: 'access_level',
            type: 'integer',
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
            name: 'EmployeeModule',
            columnNames: ['supplier_employee_id'],
            referencedTableName: 'supplier_employees',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ModuleEmployee',
            columnNames: ['management_module_id'],
            referencedTableName: 'weplan_management_modules',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('company_employee_management_modules');
  }
}
