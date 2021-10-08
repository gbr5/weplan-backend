import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNumberOfGuestsFieldToEventsTable1633736465206
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'number_of_guests',
        type: 'numeric',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('events', 'number_of_guests');
  }
}
