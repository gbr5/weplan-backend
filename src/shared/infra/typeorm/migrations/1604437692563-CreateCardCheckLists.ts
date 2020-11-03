import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCardCheckLists1604437692563
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'card_check_lists',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'card_id',
            type: 'uuid',
          },
          {
            name: 'check_list_id',
            type: 'uuid',
          },
          {
            name: 'card_unique_name',
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
            name: 'CheckListCard',
            columnNames: ['check_list_id'],
            referencedTableName: 'check_lists',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CardCheckList',
            columnNames: ['card_id'],
            referencedTableName: 'stage_cards',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('card_check_lists');
  }
}
