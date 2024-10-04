import { createRxDatabase, RxDatabase, RxCollection, RxDocument, isRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBCleanupPlugin } from 'rxdb/plugins/cleanup';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'; // Import the leader election plugin
import { update } from 'rxdb/plugins/update';

// Add plugins
addRxPlugin(RxDBCleanupPlugin);
addRxPlugin(RxDBLeaderElectionPlugin); // Add the leader election plugin

// Define interfaces for Category and Group
export interface Category {
    id: string;
    name: string;
    description: string;
    metadata: object;
    subcategories: object;
}

export interface Group {
    id: string;
    name: string;
    description: string;
    metadata: object;
    subcategories: object;
}

// Category and Group schemas
const categorySchema = {
    title: 'category-schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: { type: 'string', maxLength: 20 },
        name: { type: 'string' },
        description: {type: 'string'},
        metadata: { type: 'object' },
        subCategories: { type: 'array', items: { type: 'object' } }
    },
    required: ['id', 'name', 'metadata'],
} as const;

const groupSchema = {
    title: 'group-schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: { type: 'string', maxLength: 20 },
        name: { type: 'string' },
        description: {type: 'string'},
        metadata: { type: 'object' },
        items: { type: 'array', items: { type: 'object' } }
    },
    required: ['id', 'name', 'metadata'],
} as const;

// Define RxDatabase type
type MiniatureDatabase = RxDatabase<{
    categories: RxCollection<Category>;
    groups: RxCollection<Group>;
}>;

let mcmDatabase: MiniatureDatabase | undefined;

// Initialize database

export async function initializeDatabase(): Promise<void> {
    mcmDatabase = await createRxDatabase<MiniatureDatabase>({
        name: 'stagingDatabase',
        storage: getRxStorageDexie(),
        eventReduce: true,
    });

    await createCollections();
}

// Database Creation Helper Function

async function createCollections(): Promise<void> {
    if (!mcmDatabase) throw new Error("Database is not initialized");

    await mcmDatabase.addCollections({
        categories: { schema: categorySchema },
        groups: { schema: groupSchema },
    });
}


// Inserts

export async function insertCategory(category: Category): Promise<RxDocument<Category>> {
    if(!mcmDatabase) throw new Error("Database is not initialized, or loaded incorrectly");

    return await mcmDatabase.categories.insert(category);
}

export async function insertGroup(group: Group): Promise<RxDocument<Group>> {
    if(!mcmDatabase) throw new Error("Database is not initialized, or loaded incorrectly");

    return await mcmDatabase.groups.insert(group);
}

// Mutator

export async function patchDocument(document: RxDocument<any>, changes: object): Promise<RxDocument>{
    if(!mcmDatabase) throw new Error("Database is not initialized, or loaded incorrectly");

    try{
        return await document.patch(
            changes
        );
    }
    catch(error){
        throw new Error(JSON.stringify(error));
    }
}

export async function updateCategory(documentID: string, changes: object){
    if(!mcmDatabase) throw new Error("Database is not initialized, or loaded incorrectly");

    try{
        let oldCat = await getCategory(documentID);
        let result = await patchDocument(oldCat, changes);

        return result;
    }
    catch(error){
        throw new Error(JSON.stringify(error));
    }
}

// Getters

export async function getCategories(): Promise<RxDocument<Category>[]> {
    if (!mcmDatabase) throw new Error("Database is not initialized");

    const categories = await mcmDatabase.categories.find().exec();
    return categories as RxDocument<Category>[]; // Ensure proper typing
}

export async function getCategory(id: string): Promise<RxDocument<Category>> {
    if (!mcmDatabase) throw new Error("Database is not initialized");

    const category = await mcmDatabase.categories.findOne({
        selector: {
            id: id,
        }
    }).exec();
    return category as unknown as RxDocument<Category>;
}

export async function getGroups(): Promise<RxDocument<Group>[]> {
    if (!mcmDatabase) throw new Error("Database is not initialized");

    const groups = await mcmDatabase.groups.find().exec();
    return groups as RxDocument<Group>[]; // Ensure proper typing
}

// Delete'er

export async function deleteDocument(document: RxDocument<any>): Promise<boolean>{
    try{
        document.remove();
        return cleanupDB();
    }
    catch(error){
        throw new Error(JSON.stringify(error));
    }
}


// Call Cleanup
export async function cleanupDB(): Promise<boolean>{
    if(!mcmDatabase) throw new Error("Database is not initialized, or loaded incorrectly");

    try{
        await mcmDatabase.categories.cleanup(0);
        await mcmDatabase.groups.cleanup(0);
        return true;
    }
    catch(error){
        throw new Error(JSON.stringify(error));
    }
}

// Check Initialization
export async function checkInitialization(): Promise<boolean> {
    if (!isRxDatabase(mcmDatabase)) {
        try {
            await initializeDatabase();
            return true;
        } catch {
            return false;
        }
    } else {
        return true;
    }
}

// Initialize the database when this module is imported
await initializeDatabase();

// Export the functions for external use
export default {
    initializeDatabase,
    insertCategory,
    insertGroup,
    patchDocument,
    getCategories,
    getCategory,
    getGroups,
    deleteDocument,
    checkInitialization,
    cleanupDB,
    updateCategory,
};