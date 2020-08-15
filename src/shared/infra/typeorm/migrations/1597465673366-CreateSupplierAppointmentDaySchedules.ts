import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSupplierAppointmentDaySchedules1597465673366
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'supplier_appointment_day_schedules',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'start_hour',
            type: 'numeric',
          },
          {
            name: 'end_hour',
            type: 'numeric',
          },
          {
            name: 'duration_minutes',
            type: 'numeric',
          },
          {
            name: 'interval',
            type: 'boolean',
          },
          {
            name: 'supplier_id',
            type: 'uuid',
          },
          {
            name: 'week_day_id',
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
            name: 'SupplierAppointmentDaySchedule',
            columnNames: ['supplier_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'DayScheduleAppointmentSupplier',
            columnNames: ['week_day_id'],
            referencedTableName: 'supplier_week_day_appointments',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('supplier_appointment_day_schedules');
  }
}
