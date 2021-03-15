import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFormFields1615785046244
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'form_fields',
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
            name: 'form_id',
            type: 'uuid',
          },
          {
            name: 'position',
            type: 'numeric',
          },
          {
            name: 'isRequired',
            type: 'boolean',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'placeholder',
            type: 'varchar',
          },
          {
            name: 'type',
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
            name: 'UserFormFields',
            columnNames: ['form_id'],
            referencedTableName: 'user_forms',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('form_fields');
  }
}
