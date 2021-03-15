import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateContactPagePosts1615767431214
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contact_page_posts',
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
            name: 'image_url',
            type: 'varchar',
          },
          {
            name: 'destination_url',
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
            name: 'UserContactPagePosts',
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
    await queryRunner.dropTable('contact_page_posts');
  }
}
