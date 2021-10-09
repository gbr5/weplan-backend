import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddMemberNumberOfGuestsFieldToEventsTable1633744556617
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'members_number_of_guests',
        type: 'numeric',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('events', 'members_number_of_guests');
  }
}
