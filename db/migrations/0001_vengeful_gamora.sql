ALTER TABLE "batch_comments" DROP CONSTRAINT "batch_comments_user_address_users_address_fk";
--> statement-breakpoint
ALTER TABLE "batch_comments" DROP CONSTRAINT "batch_comments_batch_id_batches_id_fk";
--> statement-breakpoint
ALTER TABLE "batch_likes" DROP CONSTRAINT "batch_likes_user_address_users_address_fk";
--> statement-breakpoint
ALTER TABLE "batch_likes" DROP CONSTRAINT "batch_likes_batch_id_batches_id_fk";
--> statement-breakpoint
ALTER TABLE "batch_likes" DROP CONSTRAINT "batch_likes_comment_id_batch_comments_id_fk";
--> statement-breakpoint
ALTER TABLE "batch_likes" DROP CONSTRAINT "batch_likes_reply_id_batch_replies_id_fk";
--> statement-breakpoint
ALTER TABLE "batch_replies" DROP CONSTRAINT "batch_replies_user_address_users_address_fk";
--> statement-breakpoint
ALTER TABLE "batch_replies" DROP CONSTRAINT "batch_replies_comment_id_batch_comments_id_fk";
--> statement-breakpoint
ALTER TABLE "batches" DROP CONSTRAINT "batches_token_address_tokens_address_fk";
--> statement-breakpoint
ALTER TABLE "follows" DROP CONSTRAINT "follows_follower_address_users_address_fk";
--> statement-breakpoint
ALTER TABLE "follows" DROP CONSTRAINT "follows_followed_address_users_address_fk";
--> statement-breakpoint
ALTER TABLE "token_comments" DROP CONSTRAINT "token_comments_user_address_users_address_fk";
--> statement-breakpoint
ALTER TABLE "token_comments" DROP CONSTRAINT "token_comments_token_address_tokens_address_fk";
--> statement-breakpoint
ALTER TABLE "token_likes" DROP CONSTRAINT "token_likes_user_address_users_address_fk";
--> statement-breakpoint
ALTER TABLE "token_likes" DROP CONSTRAINT "token_likes_token_address_tokens_address_fk";
--> statement-breakpoint
ALTER TABLE "token_likes" DROP CONSTRAINT "token_likes_comment_id_token_comments_id_fk";
--> statement-breakpoint
ALTER TABLE "token_likes" DROP CONSTRAINT "token_likes_reply_id_token_replies_id_fk";
--> statement-breakpoint
ALTER TABLE "token_replies" DROP CONSTRAINT "token_replies_user_address_users_address_fk";
--> statement-breakpoint
ALTER TABLE "token_replies" DROP CONSTRAINT "token_replies_comment_id_token_comments_id_fk";
--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "symbol" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "batch_comments" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "batch_likes" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "batch_replies" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "batches" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "follows" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "token_comments" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "token_likes" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "token_replies" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "tokens" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "tokens" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "website_comments" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_comments" ADD CONSTRAINT "batch_comments_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_comments" ADD CONSTRAINT "batch_comments_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_likes" ADD CONSTRAINT "batch_likes_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_likes" ADD CONSTRAINT "batch_likes_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_likes" ADD CONSTRAINT "batch_likes_comment_id_batch_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."batch_comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_likes" ADD CONSTRAINT "batch_likes_reply_id_batch_replies_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."batch_replies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_replies" ADD CONSTRAINT "batch_replies_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batch_replies" ADD CONSTRAINT "batch_replies_comment_id_batch_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."batch_comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batches" ADD CONSTRAINT "batches_token_address_tokens_address_fk" FOREIGN KEY ("token_address") REFERENCES "public"."tokens"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_address_users_address_fk" FOREIGN KEY ("follower_address") REFERENCES "public"."users"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follows" ADD CONSTRAINT "follows_followed_address_users_address_fk" FOREIGN KEY ("followed_address") REFERENCES "public"."users"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_comments" ADD CONSTRAINT "token_comments_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_comments" ADD CONSTRAINT "token_comments_token_address_tokens_address_fk" FOREIGN KEY ("token_address") REFERENCES "public"."tokens"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_likes" ADD CONSTRAINT "token_likes_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_likes" ADD CONSTRAINT "token_likes_token_address_tokens_address_fk" FOREIGN KEY ("token_address") REFERENCES "public"."tokens"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_likes" ADD CONSTRAINT "token_likes_comment_id_token_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."token_comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_likes" ADD CONSTRAINT "token_likes_reply_id_token_replies_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."token_replies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_replies" ADD CONSTRAINT "token_replies_user_address_users_address_fk" FOREIGN KEY ("user_address") REFERENCES "public"."users"("address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_replies" ADD CONSTRAINT "token_replies_comment_id_token_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."token_comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
