import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

const dbDexie = await createRxDatabase({
    name: 'stagingDatabase',
    storage: getRxStorageDexie(),
    eventReduce: true,
});

export default dbDexie;