import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTypeFieldToEventTaskFollowersTable1632807492045
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'event_task_followers',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('event_task_followers', 'type');
  }
}
