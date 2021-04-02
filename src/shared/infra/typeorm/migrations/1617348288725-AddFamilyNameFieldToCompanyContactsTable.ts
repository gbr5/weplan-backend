import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFamilyNameFieldToCompanyContactsTable1617348288725
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'company_contacts',
      new TableColumn({
        name: 'family_name',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('company_contacts', 'family_name');
  }
}
