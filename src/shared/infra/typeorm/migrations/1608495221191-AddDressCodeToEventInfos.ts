import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDressCodeToEventInfos1608495221191
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'event_infos',
      new TableColumn({
        name: 'dress_code',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('event_infos', 'dress_code');
  }
}
