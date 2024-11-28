ALTER TABLE "resync_history" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "resync_history" CASCADE;--> statement-breakpoint
ALTER TABLE "batches" DROP CONSTRAINT "batches_token_address_tokens_address_fk";
--> statement-breakpoint
ALTER TABLE "tokens" ADD COLUMN "batch_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokens" ADD CONSTRAINT "tokens_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "batches" DROP COLUMN IF EXISTS "token_address";