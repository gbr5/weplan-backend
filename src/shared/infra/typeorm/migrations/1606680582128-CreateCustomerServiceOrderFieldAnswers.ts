import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCustomerServiceOrderFieldAnswers1606680582128
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer_service_order_field_answers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'company_default_service_order_field_id',
            type: 'uuid',
          },
          {
            name: 'customer_service_order_id',
            type: 'uuid',
          },
          {
            name: 'answer',
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
            name: 'CompanyDefaultServiceOrderFieldAnswer',
            columnNames: ['company_default_service_order_field_id'],
            referencedTableName: 'company_default_service_order_fields',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CustomerServiceOrderFieldAnswer',
            columnNames: ['customer_service_order_id'],
            referencedTableName: 'customer_service_orders',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer_service_order_field_answers');
  }
}
