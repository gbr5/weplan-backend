import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStageCards1597283890625
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stage_cards',
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
            name: 'stage_id',
            type: 'uuid',
          },
          {
            name: 'card_owner',
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
            name: 'StageCard',
            columnNames: ['stage_id'],
            referencedTableName: 'funnel_stages',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CardOwner',
            columnNames: ['card_owner'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stage_cards');
  }
}
