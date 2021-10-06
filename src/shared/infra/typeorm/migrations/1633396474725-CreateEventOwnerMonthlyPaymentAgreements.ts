import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEventOwnerMonthlyPaymentAgreements1633396474725
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_owner_monthly_payment_agreements',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'event_owner_agreement_id',
            type: 'uuid',
          },
          {
            name: 'monthly_payment_agreement_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'EventOwnerMonthlyPaymentAgreement',
            columnNames: ['event_owner_agreement_id'],
            referencedTableName: 'event_owner_transaction_agreements',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'EventMonthlyPaymentAgreementOwner',
            columnNames: ['monthly_payment_agreement_id'],
            referencedTableName: 'event_monthly_payment_agreements',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event_owner_monthly_payment_agreements');
  }
}
