import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFormStyles1616212387724
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'form_styles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'form_id',
            type: 'uuid',
          },
          {
            name: 'background_color',
            type: 'varchar',
          },
          {
            name: 'text_color',
            type: 'varchar',
          },
          {
            name: 'button_color',
            type: 'varchar',
          },
          {
            name: 'button_text_color',
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
            name: 'UserFormStyles',
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
    await queryRunner.dropTable('form_styles');
  }
}
