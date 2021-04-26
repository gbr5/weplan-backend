import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddExternalNameFieldToUserForms1619381434583
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_forms',
      new TableColumn({
        name: 'external_name',
        type: 'varchar',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_forms', 'isActive');
  }
}
