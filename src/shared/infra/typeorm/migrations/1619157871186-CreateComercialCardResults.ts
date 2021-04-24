import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateComercialCardResults1619157871186
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comercial_card_results',
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
            name: 'note',
            type: 'varchar',
          },
          {
            name: 'contract_value',
            type: 'numeric',
          },
          {
            name: 'isSuccessful',
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
            name: 'ComercialCardResults',
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
    await queryRunner.dropTable('comercial_card_results');
  }
}
