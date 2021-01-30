import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddGuestsBooleanFieldToAppointmentsTable1611990410141
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'guest',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'guest');
  }
}
