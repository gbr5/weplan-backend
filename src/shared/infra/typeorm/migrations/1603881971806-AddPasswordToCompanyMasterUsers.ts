import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPasswordToCompanyMasterUsers1603881971806
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'company_master_users',
      new TableColumn({
        name: 'password',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('company_master_users', 'password');
  }
}
