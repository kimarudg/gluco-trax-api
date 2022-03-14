import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTaxonomy1647242277201 implements MigrationInterface {
    name = 'AddTaxonomy1647242277201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "taxonomies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "parent_id" uuid, CONSTRAINT "PK_f8c39bce97175559a2223be37f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "taxonomy_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "taxonomy_id" uuid, "parent_id" uuid, CONSTRAINT "PK_ae68225051459ba2bb87ad553b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "taxonomies" ADD CONSTRAINT "FK_e30234c1c76dd2507385edfb1c1" FOREIGN KEY ("parent_id") REFERENCES "taxonomies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "taxonomy_tags" ADD CONSTRAINT "FK_568865abe08669ef8b89c9d66d4" FOREIGN KEY ("taxonomy_id") REFERENCES "taxonomies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "taxonomy_tags" ADD CONSTRAINT "FK_9c71c7652e4f59ed3b879254ead" FOREIGN KEY ("parent_id") REFERENCES "taxonomy_tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taxonomy_tags" DROP CONSTRAINT "FK_9c71c7652e4f59ed3b879254ead"`);
        await queryRunner.query(`ALTER TABLE "taxonomy_tags" DROP CONSTRAINT "FK_568865abe08669ef8b89c9d66d4"`);
        await queryRunner.query(`ALTER TABLE "taxonomies" DROP CONSTRAINT "FK_e30234c1c76dd2507385edfb1c1"`);
        await queryRunner.query(`DROP TABLE "taxonomy_tags"`);
        await queryRunner.query(`DROP TABLE "taxonomies"`);
    }

}
