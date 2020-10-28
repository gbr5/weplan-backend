import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddEmailToCompanyMasterUsers1603881853198
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'company_master_users',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('company_master_users', 'email');
  }
}
