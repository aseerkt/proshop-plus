import {MigrationInterface, QueryRunner} from "typeorm";

export class newTablesAndStuff1616638545622 implements MigrationInterface {
    name = 'newTablesAndStuff1616638545622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "qty" integer NOT NULL, "productId" uuid NOT NULL, "cartId" uuid NOT NULL, CONSTRAINT "PK_ca0e2ea15ff8ff70b2d6f89e469" PRIMARY KEY ("id", "productId", "cartId"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "qty"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_ca0e2ea15ff8ff70b2d6f89e469"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_bbb8a97d87e78e6df44f058967d" PRIMARY KEY ("id", "cartId")`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_bbb8a97d87e78e6df44f058967d"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "qty" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "productId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_510806935290dce5e0d18fbb23c" PRIMARY KEY ("id", "productId")`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "cartId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_510806935290dce5e0d18fbb23c"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_ca0e2ea15ff8ff70b2d6f89e469" PRIMARY KEY ("id", "productId", "cartId")`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_72679d98b31c737937b8932ebe6" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_edd714311619a5ad09525045838" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_edd714311619a5ad09525045838"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_72679d98b31c737937b8932ebe6"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_ca0e2ea15ff8ff70b2d6f89e469"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_510806935290dce5e0d18fbb23c" PRIMARY KEY ("id", "productId")`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_510806935290dce5e0d18fbb23c"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "qty"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "cartId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_bbb8a97d87e78e6df44f058967d" PRIMARY KEY ("id", "cartId")`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "productId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_bbb8a97d87e78e6df44f058967d"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_ca0e2ea15ff8ff70b2d6f89e469" PRIMARY KEY ("id", "productId", "cartId")`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "qty" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
    }

}
