CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_subscriptions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"plan_id" integer NOT NULL,
	"sign_date" DATE NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"ship_date" varchar(255) NOT NULL,
	"ship_info_id" integer NOT NULL,
	CONSTRAINT "user_subscriptions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "products" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subscription_products" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"subscription_id" integer NOT NULL,
	CONSTRAINT "subscription_products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"token" varchar(36) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ship_infos" (
	"id" serial NOT NULL,
	"ZIP_code" varchar(8) NOT NULL,
	"address" varchar(255) NOT NULL,
	"state_id" integer NOT NULL,
	"city" varchar(255) NOT NULL,
	CONSTRAINT "ship_infos_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "states" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "states_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_fk1" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_fk2" FOREIGN KEY ("ship_info_id") REFERENCES "ship_infos"("id");


ALTER TABLE "subscription_products" ADD CONSTRAINT "subscription_products_fk0" FOREIGN KEY ("product_id") REFERENCES "products"("id");
ALTER TABLE "subscription_products" ADD CONSTRAINT "subscription_products_fk1" FOREIGN KEY ("subscription_id") REFERENCES "user_subscriptions"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "ship_infos" ADD CONSTRAINT "ship_infos_fk0" FOREIGN KEY ("state_id") REFERENCES "states"("id");









