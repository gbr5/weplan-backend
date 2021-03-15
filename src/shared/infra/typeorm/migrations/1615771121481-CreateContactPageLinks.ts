import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateContactPageLinks1615771121481
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contact_page_links',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'contact_page_id',
            type: 'uuid',
          },
          {
            name: 'label',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'text_color',
            type: 'varchar',
          },
          {
            name: 'background_color',
            type: 'varchar',
          },
          {
            name: 'position',
            type: 'numeric',
          },
          {
            name: 'isActive',
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
            name: 'UserContactPageLinks',
            columnNames: ['contact_page_id'],
            referencedTableName: 'user_contact_pages',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contact_page_links');
  }
}
