import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1597530808947
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'appointment_type',
            type: 'varchar',
          },
          {
            name: 'weplanGuest',
            type: 'boolean',
          },
          {
            name: 'host_id',
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
            name: 'AppointmentType',
            columnNames: ['appointment_type'],
            referencedTableName: 'appointment_types',
            referencedColumnNames: ['name'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'AppointmentHost',
            columnNames: ['host_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
