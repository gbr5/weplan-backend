import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFormEmailNotificationRecipients1616205867853
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'form_email_notification_recipients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email_notification_id',
            type: 'uuid',
          },
          {
            name: 'sending_type',
            type: 'varchar',
          },
          {
            name: 'email',
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
            name: 'UserFormEmailNotificationRecipientss',
            columnNames: ['email_notification_id'],
            referencedTableName: 'form_email_notifications',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('form_email_notification_recipients');
  }
}
