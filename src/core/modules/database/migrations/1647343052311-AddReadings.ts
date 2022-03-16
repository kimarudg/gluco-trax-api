import {MigrationInterface, QueryRunner} from "typeorm";

export class AddReadings1647343052311 implements MigrationInterface {
    name = 'AddReadings1647343052311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "readings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" double precision NOT NULL, "date_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "created_by" uuid NOT NULL, "type_id" uuid NOT NULL, CONSTRAINT "PK_a0f3aa79140b41884f2e53ba52a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "readings" ADD CONSTRAINT "FK_0e3a7a8ef0c7f9ad758f4bc0e94" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "readings" ADD CONSTRAINT "FK_2ca8ad7910b826d053573b70d56" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "readings" ADD CONSTRAINT "FK_cb2096e23d8c1ab266627ddf461" FOREIGN KEY ("type_id") REFERENCES "taxonomy_tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_cb2096e23d8c1ab266627ddf461"`);
        await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_2ca8ad7910b826d053573b70d56"`);
        await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_0e3a7a8ef0c7f9ad758f4bc0e94"`);
        await queryRunner.query(`DROP TABLE "readings"`);
    }

}
