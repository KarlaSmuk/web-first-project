import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTicket1729088616007 implements MigrationInterface {
    name = 'AddedTicket1729088616007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

}
