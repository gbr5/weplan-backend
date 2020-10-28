import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddEmailToCompanyEmployee1603867815212
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'company_employees',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('company_employees', 'email');
  }
}
