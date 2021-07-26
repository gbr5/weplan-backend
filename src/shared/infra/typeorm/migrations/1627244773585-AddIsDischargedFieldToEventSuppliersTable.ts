import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIsDischargedFieldToEventSuppliersTable1627244773585
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'event_suppliers',
      new TableColumn({
        name: 'isDischarged',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('event_suppliers', 'isDischarged');
  }
}
