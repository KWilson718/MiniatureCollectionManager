import { createRxDatabase, RxDatabase, RxCollection, RxDocument } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

// Define the shape of a Task document

// Defines the Category Interface
interface Category {
    id: string;
    name: string;
    metadata: object;
    subcategories: object;
}

// Defines the Group Interface
interface Group {
    id: string;
    name: string;
    metadata: object;
    subcategories: object;
}

// Defines the Categories Schema:
const categorySchema = {
    title: 'category-schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    description: 'describes a category object',
    properties: {
        id:{
            type: 'string',
            maxLength: 20,
        },
        name: {
            type: 'string'
        },
        metadata:{
            type: 'object',
            properties: {
                createdAt: {
                    type: 'string',
                    format: 'date-time'
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time'
                }
            }
        },
        subCategories: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string',
                        maxlength: 20
                    },
                    metadata: {
                        type: 'object',
                        properties: {
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    },
                    groups: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    },
    required: ['id', 'name', 'metadata'],
} as const;

// Defines the Group Data Structure
const groupSchema = {
    title: 'category-schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    description: 'describes a group object',
    properties:{
        id:{
            type: 'string',
            maxLength: 20,
        },
        name: {
            type: 'string'
        },
        metadata:{
            type: 'object',
            properties: {
                createdAt: {
                    type: 'string',
                    format: 'date-time'
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time'
                }
            }
        },
        items: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string',
                        maxlength: 20
                    },
                    description: {
                        type: 'string'
                    },
                    metadata: {
                        type: 'object',
                        properties: {
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    },
                    qtyNOS: {
                        type: 'number'
                    },
                    qtyBuilt: {
                        type: 'number'
                    },
                    qtyPartial: {
                        type: 'number'
                    },
                    qtyFinished: {
                        type: 'number'
                    },
                }
            }
        }
    },
    required: ['id', 'name', 'metadata'],
} as const;

type MiniatureDatabase = RxDatabase<{
    categories: RxCollection<Category>;
    groups: RxCollection<Group>;
}>;

let mcmDatabase: MiniatureDatabase | undefined;

export async function initializeDatabase(): Promise<void> {
    mcmDatabase = await createRxDatabase<MiniatureDatabase>({
        name: 'stagingDatabase',
        storage: getRxStorageDexie(),
        eventReduce: true,
    });

    await createCollections()
}

async function createCollections(): Promise<void> {
    if(!mcmDatabase) throw new Error("Database is not initialized, or loaded incorrectly");

    await mcmDatabase.addCollections({
        categories: {
            schema: categorySchema,
        },
        groups: {
            schema: groupSchema,
        }
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


// Getters

export async function getCategories(): Promise<RxDocument<Category>[]> {
    if(!mcmDatabase) throw new Error("Database is not initialized, or loaded incorrectly");

    return await mcmDatabase.categories.find().exec();
}

export async function getGroups(): Promise<RxDocument<Group>[]> {
    if(!mcmDatabase) throw new Error("Database is not initialized, or loaded incorrectly");
    
    return await mcmDatabase.groups.find().exec();
}

// Initialize the database when this module is imported
initializeDatabase();

// Export the functions for external use
export default {
  initializeDatabase,
  insertCategory,
  insertGroup,
  getCategories,
  getGroups,
};
