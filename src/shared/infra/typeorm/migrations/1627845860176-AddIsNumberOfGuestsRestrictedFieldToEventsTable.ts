import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsNumberOfGuestsRestrictedFieldToEventsTable1627845860176
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'isNumberOfGuestsRestricted',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('events', 'isNumberOfGuestsRestricted');
  }
}
