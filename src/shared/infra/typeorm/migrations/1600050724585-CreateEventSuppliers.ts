import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEventSuppliers1600050724585
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_suppliers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'event_id',
            type: 'uuid',
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
            name: 'weplanUser',
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
            name: 'EventSupplier',
            columnNames: ['event_id'],
            referencedTableName: 'events',
            referencedColumnNames: ['id'],
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
    await queryRunner.dropTable('event_suppliers');
  }
}
