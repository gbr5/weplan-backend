import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateGuestContactInfos1608015032656
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'guest_contact_infos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'contact_info',
            type: 'varchar',
          },
          {
            name: 'contact_type_id',
            type: 'uuid',
          },
          {
            name: 'guest_id',
            type: 'uuid',
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
            name: 'ContactGuest',
            columnNames: ['contact_type_id'],
            referencedTableName: 'contact_types',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'GuestContact',
            columnNames: ['guest_id'],
            referencedTableName: 'guests',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('guest_contact_infos');
  }
}
