import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDateVotingTypeToEvents1610782923651
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'date_voting_type',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('events', 'date_voting_type');
  }
}
