import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSelectedSuppliers1597075099768
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'selected_suppliers',
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
            name: 'event_name',
            type: 'varchar',
          },
          {
            name: 'supplier_sub_category',
            type: 'varchar',
          },
          {
            name: 'isHired',
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
            name: 'UserSupplier',
            columnNames: ['supplier_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'EventName',
            columnNames: ['event_name'],
            referencedTableName: 'events',
            referencedColumnNames: ['trimmed_name'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'EventSupplierCategory',
            columnNames: ['supplier_sub_category'],
            referencedTableName: 'supplier_sub_categories',
            referencedColumnNames: ['sub_category'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('selected_suppliers');
  }
}
