CREATE TABLE IF NOT EXISTS "resync_history" (
	"id" text PRIMARY KEY NOT NULL,
	"last_resync_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "unique_batch_like_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "unique_follow_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "unique_token_like_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "token_address_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "address_idx";