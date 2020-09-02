import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEventInfos1599021857904
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_infos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'event_id',
            type: 'uuid',
          },
          {
            name: 'number_of_guests',
            type: 'numeric',
          },
          {
            name: 'duration',
            type: 'numeric',
          },
          {
            name: 'budget',
            type: 'numeric',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'local_state',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'address',
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
            name: 'EventName',
            columnNames: ['event_id'],
            referencedTableName: 'events',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event_infos');
  }
}
