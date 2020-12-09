import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserEventTransactionAgreementNotes1607526975942
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_event_transaction_agreement_notes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'event_note_id',
            type: 'uuid',
          },
          {
            name: 'transaction_agreement_id',
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
            name: 'TransactionAgreementEventNote',
            columnNames: ['event_note_id'],
            referencedTableName: 'event_notes',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'EventNoteTransactionAgreement',
            columnNames: ['transaction_agreement_id'],
            referencedTableName: 'transaction_agreements',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_event_transaction_agreement_notes');
  }
}
