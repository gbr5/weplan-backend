import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFormEmailNotifications1616198988766
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'form_email_notifications',
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
            name: 'notification_type',
            type: 'varchar',
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'message',
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
            name: 'UserFormEmailNotifications',
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
    await queryRunner.dropTable('form_email_notifications');
  }
}
