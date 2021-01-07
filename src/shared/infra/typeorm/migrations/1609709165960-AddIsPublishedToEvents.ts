import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIsPublishedToEvents1609709165960
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'isPublished',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('events', 'isPublished');
  }
}
