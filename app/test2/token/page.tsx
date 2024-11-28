import { db } from '@/db';
import { batchesTable, InsertBatch } from '@/db/schema';
import { eq } from 'drizzle-orm';
import FirstSection from './tokensList';

async function getOrCreateBatch(batchId: number): Promise<void> {
    try {
        // Check if the batch exists
        const existingBatch = await db
            .select()
            .from(batchesTable)
            .where(eq(batchesTable.id, batchId))
            .execute();

        if (existingBatch.length > 0) {
            return;
        }

        // If batch doesn't exist, create it
        const newBatch: InsertBatch = {
            id: batchId,
            description: `Batch #${batchId}`,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await db.insert(batchesTable).values(newBatch).execute();
    } catch (error) {
        console.error(`Error while managing batch: ${error}`);
        throw error;
    }
}

export default async function BatchPage({
    params
}: {
    params: { batchId: string | undefined }
}) {
    if (!params.batchId) {
        return <div>Batch ID is required</div>;
    }

    const batchId = parseInt(params.batchId);
    if (isNaN(batchId)) {
        return <div>Invalid batch ID</div>;
    }

    try {
        await getOrCreateBatch(batchId);

        return (
            <div className="md:container mx-auto md:px-4 md:py-8">
                {/* <ResponsiveLayout batchId={batchId} /> */}
                <div>
               
                    <FirstSection batchId={batchId.toString()} />
                </div>
            </div>
        );
    } catch (error) {
        if (error instanceof Error) {
            return <div>{error.message}</div>;
        }
        return <div>An error occurred while processing the batch</div>;
    }
}