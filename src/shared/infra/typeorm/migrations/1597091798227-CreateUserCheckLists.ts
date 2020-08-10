import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserCheckLists1597091798227
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_check_lists',
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
            name: 'priority_level',
            type: 'numeric',
          },
          {
            name: 'checked',
            type: 'boolean',
          },
          {
            name: 'event_name',
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
            name: 'UserEventCheckList',
            columnNames: ['event_name'],
            referencedTableName: 'events',
            referencedColumnNames: ['trimmed_name'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_check_lists');
  }
}
