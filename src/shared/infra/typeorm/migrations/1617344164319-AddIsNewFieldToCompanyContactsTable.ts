import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIsNewFieldToCompanyContactsTable1617344164319
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'company_contacts',
      new TableColumn({
        name: 'isNew',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('company_contacts', 'isNew');
  }
}
