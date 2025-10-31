CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"order_id" varchar(100) NOT NULL,
	"user_id" uuid NOT NULL,
	"market" varchar(50) NOT NULL,
	"side" varchar(10) NOT NULL,
	"price" numeric(20, 8) NOT NULL,
	"quantity" numeric(20, 8) NOT NULL,
	"filled" numeric(20, 8) DEFAULT '0' NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "orders_orderId_unique" UNIQUE("order_id")
);
--> statement-breakpoint
CREATE TABLE "trades" (
	"id" uuid PRIMARY KEY NOT NULL,
	"trade_id" varchar(100) NOT NULL,
	"market" varchar(50) NOT NULL,
	"price" numeric(20, 8) NOT NULL,
	"quantity" numeric(20, 8) NOT NULL,
	"quote_quantity" numeric(20, 8) NOT NULL,
	"is_buyer_maker" boolean,
	"buyer_id" uuid,
	"seller_id" uuid,
	"buyer_order_id" varchar(100),
	"seller_order_id" varchar(100),
	"timestamp" bigint NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "trades_tradeId_unique" UNIQUE("trade_id")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(20) NOT NULL,
	"asset" varchar(50) NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"status" varchar(20) DEFAULT 'completed' NOT NULL,
	"reference_id" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "balance" RENAME COLUMN "amount" TO "available";--> statement-breakpoint
ALTER TABLE "balance" ADD COLUMN "locked" numeric(20, 8) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;