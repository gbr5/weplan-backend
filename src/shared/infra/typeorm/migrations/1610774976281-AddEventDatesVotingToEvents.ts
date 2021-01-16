import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddEventDatesVotingToEvents1610774976281
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'eventDatesVoting',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('events', 'eventDatesVoting');
  }
}
