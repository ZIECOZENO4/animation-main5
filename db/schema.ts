import { pgTable, text, varchar, timestamp, boolean, integer, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';


// Users table
export const usersTable = pgTable('users', {
    address: varchar('address', { length: 42 }).primaryKey(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Batches table - Modified to be independent of tokens
export const batchesTable = pgTable('batches', {
    id: integer('id').primaryKey(),
    description: text('description'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Tokens table - Modified to belong to a batch
export const tokensTable = pgTable('tokens', {
    address: varchar('address', { length: 42 }).primaryKey(),
    batchId: integer('batch_id')
        .notNull()
        .references(() => batchesTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Token Comments table
export const tokenCommentsTable = pgTable('token_comments', {
    id: varchar('id', { length: 25 }).primaryKey(),
    content: text('content').notNull(),
    userAddress: varchar('user_address', { length: 42 })
        .notNull()
        .references(() => usersTable.address, { onDelete: 'cascade' }),
    tokenAddress: varchar('token_address', { length: 42 })
        .notNull()
        .references(() => tokensTable.address, { onDelete: 'cascade' }),
    imageUrl: varchar('image_url', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Batch Comments table
export const batchCommentsTable = pgTable('batch_comments', {
    id: varchar('id', { length: 25 }).primaryKey(),
    content: text('content').notNull(),
    userAddress: varchar('user_address', { length: 42 })
        .notNull()
        .references(() => usersTable.address, { onDelete: 'cascade' }),
    batchId: integer('batch_id')
        .notNull()
        .references(() => batchesTable.id, { onDelete: 'cascade' }),
    imageUrl: varchar('image_url', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Token Replies table
export const tokenRepliesTable = pgTable('token_replies', {
    id: varchar('id', { length: 25 }).primaryKey(),
    content: text('content').notNull(),
    userAddress: varchar('user_address', { length: 42 })
        .notNull()
        .references(() => usersTable.address, { onDelete: 'cascade' }),
    commentId: varchar('comment_id', { length: 25 })
        .notNull()
        .references(() => tokenCommentsTable.id, { onDelete: 'cascade' }),
    imageUrl: varchar('image_url', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Batch Replies table
export const batchRepliesTable = pgTable('batch_replies', {
    id: varchar('id', { length: 25 }).primaryKey(),
    content: text('content').notNull(),
    userAddress: varchar('user_address', { length: 42 })
        .notNull()
        .references(() => usersTable.address, { onDelete: 'cascade' }),
    commentId: varchar('comment_id', { length: 25 })
        .notNull()
        .references(() => batchCommentsTable.id, { onDelete: 'cascade' }),
    imageUrl: varchar('image_url', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Token Likes table
export const tokenLikesTable = pgTable('token_likes', {
    id: varchar('id', { length: 25 }).primaryKey(),
    userAddress: varchar('user_address', { length: 42 })
        .notNull()
        .references(() => usersTable.address, { onDelete: 'cascade' }),
    tokenAddress: varchar('token_address', { length: 42 })
        .notNull()
        .references(() => tokensTable.address, { onDelete: 'cascade' }),
    commentId: varchar('comment_id', { length: 25 })
        .references(() => tokenCommentsTable.id, { onDelete: 'cascade' }),
    replyId: varchar('reply_id', { length: 25 })
        .references(() => tokenRepliesTable.id, { onDelete: 'cascade' }),
    isLike: boolean('is_like').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Batch Likes table
export const batchLikesTable = pgTable('batch_likes', {
    id: varchar('id', { length: 25 }).primaryKey(),
    userAddress: varchar('user_address', { length: 42 })
        .notNull()
        .references(() => usersTable.address, { onDelete: 'cascade' }),
    batchId: integer('batch_id')
        .notNull()
        .references(() => batchesTable.id, { onDelete: 'cascade' }),
    commentId: varchar('comment_id', { length: 25 })
        .references(() => batchCommentsTable.id, { onDelete: 'cascade' }),
    replyId: varchar('reply_id', { length: 25 })
        .references(() => batchRepliesTable.id, { onDelete: 'cascade' }),
    isLike: boolean('is_like').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Follows table
export const followsTable = pgTable('follows', {
    id: varchar('id', { length: 25 }).primaryKey(),
    followerAddress: varchar('follower_address', { length: 42 })
        .notNull()
        .references(() => usersTable.address, { onDelete: 'cascade' }),
    followedAddress: varchar('followed_address', { length: 42 })
        .notNull()
        .references(() => usersTable.address, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Website Comments table
export const websiteCommentsTable = pgTable('website_comments', {
    id: varchar('id', { length: 25 }).primaryKey(),
    content: text('content').notNull(),
    nickname: varchar('user_nickname', { length: 42 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
    tokenComments: many(tokenCommentsTable),
    batchComments: many(batchCommentsTable),
    tokenReplies: many(tokenRepliesTable),
    batchReplies: many(batchRepliesTable),
    tokenLikes: many(tokenLikesTable),
    batchLikes: many(batchLikesTable),
    followers: many(followsTable, { relationName: 'followers' }),
    following: many(followsTable, { relationName: 'following' }),
}));

export const batchesRelations = relations(batchesTable, ({ many }) => ({
    tokens: many(tokensTable),
    comments: many(batchCommentsTable),
    likes: many(batchLikesTable),
}));

export const tokensRelations = relations(tokensTable, ({ one, many }) => ({
    batch: one(batchesTable, {
        fields: [tokensTable.batchId],
        references: [batchesTable.id],
    }),
    comments: many(tokenCommentsTable),
    likes: many(tokenLikesTable),
}));

export const tokenCommentsRelations = relations(tokenCommentsTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [tokenCommentsTable.userAddress],
        references: [usersTable.address],
    }),
    token: one(tokensTable, {
        fields: [tokenCommentsTable.tokenAddress],
        references: [tokensTable.address],
    }),
    replies: many(tokenRepliesTable),
    likes: many(tokenLikesTable),
}));

export const batchCommentsRelations = relations(batchCommentsTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [batchCommentsTable.userAddress],
        references: [usersTable.address],
    }),
    batch: one(batchesTable, {
        fields: [batchCommentsTable.batchId],
        references: [batchesTable.id],
    }),
    replies: many(batchRepliesTable),
    likes: many(batchLikesTable),
}));

export const tokenRepliesRelations = relations(tokenRepliesTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [tokenRepliesTable.userAddress],
        references: [usersTable.address],
    }),
    comment: one(tokenCommentsTable, {
        fields: [tokenRepliesTable.commentId],
        references: [tokenCommentsTable.id],
    }),
    likes: many(tokenLikesTable),
}));

export const batchRepliesRelations = relations(batchRepliesTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [batchRepliesTable.userAddress],
        references: [usersTable.address],
    }),
    comment: one(batchCommentsTable, {
        fields: [batchRepliesTable.commentId],
        references: [batchCommentsTable.id],
    }),
    likes: many(batchLikesTable),
}));

// db/schema.ts

export const encryptionKeys = pgTable('encryption_keys', {
    id: uuid('id').defaultRandom().primaryKey(),
    batchId: text('batch_id').notNull().unique(),
    publicKey: text('public_key').notNull(),
    privateKey: text('private_key').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Types
export type EncryptionKey = typeof encryptionKeys.$inferSelect;
export type NewEncryptionKey = typeof encryptionKeys.$inferInsert;
// Types
export type User = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
export type Token = typeof tokensTable.$inferSelect;
export type InsertToken = typeof tokensTable.$inferInsert;
export type Batch = typeof batchesTable.$inferSelect;
export type InsertBatch = typeof batchesTable.$inferInsert;
export type TokenComment = typeof tokenCommentsTable.$inferSelect;
export type InsertTokenComment = typeof tokenCommentsTable.$inferInsert;
export type BatchComment = typeof batchCommentsTable.$inferSelect;
export type InsertBatchComment = typeof batchCommentsTable.$inferInsert;
export type TokenReply = typeof tokenRepliesTable.$inferSelect;
export type InsertTokenReply = typeof tokenRepliesTable.$inferInsert;
export type BatchReply = typeof batchRepliesTable.$inferSelect;
export type InsertBatchReply = typeof batchRepliesTable.$inferInsert;
export type TokenLike = typeof tokenLikesTable.$inferSelect;
export type InsertTokenLike = typeof tokenLikesTable.$inferInsert;
export type BatchLike = typeof batchLikesTable.$inferSelect;
export type InsertBatchLike = typeof batchLikesTable.$inferInsert;
export type Follow = typeof followsTable.$inferSelect;
export type InsertFollow = typeof followsTable.$inferInsert;
export type WebsiteComment = typeof websiteCommentsTable.$inferSelect;
export type InsertWebsiteComment = typeof websiteCommentsTable.$inferInsert;