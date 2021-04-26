import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddValueFieldToStageCardTable1619403573377
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'stage_cards',
      new TableColumn({
        name: 'value',
        type: 'numeric',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('stage_cards', 'isActive');
  }
}
