CREATE TABLE IF NOT EXISTS "batch_comments" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_address" varchar(42) NOT NULL,
	"batch_id" integer NOT NULL,
	"image_url" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "batch_likes" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"user_address" varchar(42) NOT NULL,
	"batch_id" integer NOT NULL,
	"comment_id" varchar(25),
	"reply_id" varchar(25),
	"is_like" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "batch_replies" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_address" varchar(42) NOT NULL,
	"comment_id" varchar(25) NOT NULL,
	"image_url" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "batches" (
	"id" integer PRIMARY KEY NOT NULL,
	"token_address" varchar(42) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "follows" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"follower_address" varchar(42) NOT NULL,
	"followed_address" varchar(42) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token_comments" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_address" varchar(42) NOT NULL,
	"token_address" varchar(42) NOT NULL,
	"image_url" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token_likes" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"user_address" varchar(42) NOT NULL,
	"token_address" varchar(42) NOT NULL,
	"comment_id" varchar(25),
	"reply_id" varchar(25),
	"is_like" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token_replies" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_address" varchar(42) NOT NULL,
	"comment_id" varchar(25) NOT NULL,
	"image_url" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens" (
	"address" varchar(42) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"symbol" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"address" varchar(42) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "website_comments" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_nickname" varchar(42) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_comments" ADD CONSTRAINT "batch_comments_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_comments" ADD CONSTRAINT "batch_comments_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_likes" ADD CONSTRAINT "batch_likes_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_likes" ADD CONSTRAINT "batch_likes_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_likes" ADD CONSTRAINT "batch_likes_comment_id_batch_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."batch_comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_likes" ADD CONSTRAINT "batch_likes_reply_id_batch_replies_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."batch_replies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_replies" ADD CONSTRAINT "batch_replies_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_replies" ADD CONSTRAINT "batch_replies_comment_id_batch_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."batch_comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batches" ADD CONSTRAINT "batches_token_address_tokens_address_fk" FOREIGN KEY ("token_address") REFERENCES "public"."tokens"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_address_users_address_fk" FOREIGN KEY ("follower_address") REFERENCES "public"."users"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follows" ADD CONSTRAINT "follows_followed_address_users_address_fk" FOREIGN KEY ("followed_address") REFERENCES "public"."users"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_comments" ADD CONSTRAINT "token_comments_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_comments" ADD CONSTRAINT "token_comments_token_address_tokens_address_fk" FOREIGN KEY ("token_address") REFERENCES "public"."tokens"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_likes" ADD CONSTRAINT "token_likes_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_likes" ADD CONSTRAINT "token_likes_token_address_tokens_address_fk" FOREIGN KEY ("token_address") REFERENCES "public"."tokens"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_likes" ADD CONSTRAINT "token_likes_comment_id_token_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."token_comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_likes" ADD CONSTRAINT "token_likes_reply_id_token_replies_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."token_replies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_replies" ADD CONSTRAINT "token_replies_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_replies" ADD CONSTRAINT "token_replies_comment_id_token_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."token_comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_batch_like_idx" ON "batch_likes" USING btree ("user_address","batch_id","comment_id","reply_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_follow_idx" ON "follows" USING btree ("follower_address","followed_address");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_token_like_idx" ON "token_likes" USING btree ("user_address","token_address","comment_id","reply_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "token_address_idx" ON "tokens" USING btree ("address");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "address_idx" ON "users" USING btree ("address");