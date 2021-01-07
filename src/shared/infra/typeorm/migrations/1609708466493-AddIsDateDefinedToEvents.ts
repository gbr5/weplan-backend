import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIsDateDefinedToEvents1609708466493
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'isDateDefined',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('events', 'isDateDefined');
  }
}
