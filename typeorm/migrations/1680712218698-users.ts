import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class users1680712218698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                unsigned: true,
            }, {
                name: 'name',
                type: 'varchar',
                length: '60',
            }, {
                name: 'age',
                type: 'int',
                isNullable: true
            }, {
                name: 'email',
                type: 'varchar',
                isUnique: true,
            }, {
                name: 'password',
                type: 'varchar',
            }, {
                name: 'role',
                type: 'int',
                default: '1'
            }, {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP'
            }, {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP'
            }]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
