import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIsDeletedToUsers1610948903261
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'isDeleted',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isDeleted');
  }
}
