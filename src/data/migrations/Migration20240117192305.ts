import {Migration} from '@mikro-orm/migrations';

export class Migration20240117192305 extends Migration {

    async up(): Promise<void> {
        this.addSql('create table "user_entity" ("id" varchar(255) not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "name" varchar(255) not null, constraint "user_entity_pkey" primary key ("id"));');
        this.addSql('create table "product_entity" ("id" varchar(255) not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" float not null, constraint "product_entity_pkey" primary key ("id"));');

        this.addSql('create table "cart_entity" ("id" varchar(255) not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "user_id" varchar(255) null, "is_deleted" boolean not null, constraint "cart_entity_pkey" primary key ("id"));');
        this.addSql('create table "cart_item_entity" ("id" varchar(255) not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "cart_id" varchar(255) not null, "product_id" varchar(255) not null, "count" int not null, constraint "cart_item_entity_pkey" primary key ("id"));');
        this.addSql('alter table "cart_entity" add constraint "cart_entity_user_id_foreign" foreign key ("user_id") references "user_entity" ("id") on update cascade on delete set null;');
        this.addSql('alter table "cart_item_entity" add constraint "cart_item_entity_product_id_unique" unique ("product_id");');
        this.addSql('alter table "cart_item_entity" add constraint "cart_item_entity_cart_id_foreign" foreign key ("cart_id") references "cart_entity" ("id") on update cascade;');
        this.addSql('alter table "cart_item_entity" add constraint "cart_item_entity_product_id_foreign" foreign key ("product_id") references "product_entity" ("id") on update cascade;');

        this.addSql('create table "order_entity" ("id" varchar(255) not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "user_id" varchar(255) null, "cart_id" varchar(255) null, "items_id" varchar(255) not null, "payment" varchar(255) not null, "delivery" varchar(255) not null, "comments" varchar(255) not null, "status" varchar(255) not null, "total" int not null, constraint "order_entity_pkey" primary key ("id"));');
        this.addSql('alter table "order_entity" add constraint "order_entity_user_id_foreign" foreign key ("user_id") references "user_entity" ("id") on update cascade on delete set null;');
        this.addSql('alter table "order_entity" add constraint "order_entity_cart_id_foreign" foreign key ("cart_id") references "cart_entity" ("id") on update cascade on delete set null;');
        this.addSql('alter table "order_entity" add constraint "order_entity_items_id_foreign" foreign key ("items_id") references "cart_item_entity" ("id") on update cascade;');

        this.addSql('create table "payment_entity" ("id" varchar(255) not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "type" varchar(255) not null, "address" varchar(255) not null, "creditCard" varchar(255) not null);');
        this.addSql('create table "delivery_entity" ("id" varchar(255) not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "type" varchar(255) not null, constraint "address_entity_pkey" primary key ("id"));');
        this.addSql('create table "address_entity" ("id" varchar(255) not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "street" varchar(255) not null, "house" varchar(255) not null, "apartment" varchar(255) not null, constraint "delivery_entity_pkey" primary key ("id"));');
      //...
    }

    async down(): Promise<void> {
        this.addSql('alter table "cart_item_entity" drop constraint "cart_item_entity_product_id_foreign";');

        this.addSql('alter table "cart_entity" drop constraint "cart_entity_user_id_foreign";');

        this.addSql('alter table "order_entity" drop constraint "order_entity_user_id_foreign";');

        this.addSql('alter table "cart_item_entity" drop constraint "cart_item_entity_cart_id_foreign";');

        this.addSql('alter table "order_entity" drop constraint "order_entity_cart_id_foreign";');

        this.addSql('alter table "order_entity" drop constraint "order_entity_items_id_foreign";');

        this.addSql('drop table if exists "product_entity" cascade;');

        this.addSql('drop table if exists "user_entity" cascade;');

        this.addSql('drop table if exists "cart_entity" cascade;');

        this.addSql('drop table if exists "cart_item_entity" cascade;');

        this.addSql('drop table if exists "order_entity" cascade;');

        this.addSql('drop table if exists "payment_entity" cascade;');

        this.addSql('drop table if exists "delivery_entity" cascade;');

        this.addSql('drop table if exists "address_entity" cascade;');
    }
}