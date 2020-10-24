import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddLogoFieldToCompanyInfo1603519321327
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'company_info',
      new TableColumn({
        name: 'logo',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('company_info', 'logo');
  }
}
