import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCompanyFunnelCardInfos1605370510750
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company_funnel_card_infos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'funnel_card_field_id',
            type: 'uuid',
          },
          {
            name: 'card_unique_name',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'response',
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
            name: 'CompanyFunnelCardInfoField',
            columnNames: ['funnel_card_field_id'],
            referencedTableName: 'company_funnel_card_info_fields',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CardInfo',
            columnNames: ['card_unique_name'],
            referencedTableName: 'stage_cards',
            referencedColumnNames: ['unique_name'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ResponseAuthor',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('company_funnel_card_infos');
  }
}
