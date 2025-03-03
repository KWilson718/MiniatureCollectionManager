import initDB from "@/lib/db";
import { resolve } from "styled-jsx/css";

export async function GET (req) {
    const db = await initDB();

    return new Promise((resolve, reject) => {
        const url = new URL(req.url);
        const params = url.searchParams;
        const type = params.get("type");
        const brandID = params.get("brandID");
        const gameID = params.get("gameID");
        const factionID = params.get("factionID");
        const miniatureID = params.get("miniatureID");
        const quantities = params.get("quantities");

        let query;
        let queryParams = [];

        switch (type) {
            case 'brand':
                query = `SELECT * FROM brands`;
                break;
            case 'game':
                query = `SELECT * FROM games`;
                if(brandID){
                    query += ` WHERE brandID = ?`;
                    queryParams.push(brandID);
                }
                break;
            case 'faction':
                query = `SELECT * FROM factions`;
                if(gameID){
                    query += ` WHERE gameID = ?`;
                    queryParams.push(gameID);
                }
                break;
            case 'miniature':
                query = `SELECT * FROM miniatures`;
                if(factionID){
                    query += ` WHERE factionID = ?`;
                    queryParams.push(factionID);
                }
                else if(miniatureID) {
                    query += ` WHERE id = ?`;
                    queryParams.push(miniatureID);
                }
                break;
            case 'factionName':
                query = `SELECT factionName FROM factions WHERE id = ?`;
                queryParams.push(factionID);
                break;
            default:
                reject(
                    new Response (
                        JSON.stringify({
                            error: "Invalid or missing 'type' parameter. Valid types are: brand, game, faction, miniature."
                        }),
                        {status: 400}
                    )
                )
        }

        if (!query) {
            return reject(
                new Response(
                    JSON.stringify({ error: "Query is not defined." }),
                    { status: 500 }
                )
            );
        }


        db.all(query, queryParams, (err, rows) => {
            if (err) {
                reject(
                    new Response(
                        JSON.stringify({error: err.message}), 
                        {status: 500}
                    )
                );
            }
            else {
                resolve(
                    new Response(
                        JSON.stringify(rows), 
                        {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                        }
                    )
                );
            }
        });

        db.close((err) => {
            if (err) {
                console.error('Error Closing Database: ', err.message);
            }
        });
    })
}

export async function POST(req) {
    const db = await initDB();
    const { type, data } = await req.json();

    console.log('Type Set to: ', type);
    

    switch (type) {
        case 'Brand':
            return await addBrand(db, data);
        case 'Game':
            return await addGame(db, data);
        case 'Faction':
            return await addFaction(db, data);
        case 'Miniature':
            return await addMiniature(db, data);
        default:
            console.log('A Type of: ', type, ' was recieved and is being rejected');
            return new Promise((resolve, reject) => {
                reject(
                    new Response(
                        JSON.stringify({
                            error: 'Type Not Specified Correctly, Valid Types are Brand, Game, Faction, Miniature'
                        }),
                        {
                            status: 500,
                        }
                    )
                )
            });
    }
    
}

async function addBrand(db, data){
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO brands (brandName, brandDescription) VALUES (?, ?)`;
        const description = data.description ? data.description : null;

        db.run(query, [data.name, description], function (err) {
            if (err) {
                reject(
                    new Response(JSON.stringify({ error: err.message }), {
                    status: 500,
                    })
                );
            }
            else {
                resolve (
                    new Response (
                        JSON.stringify({
                            id: this.lastID,
                        }),
                        {
                            status: 201,
                            headers: { 'Content-Type': 'application/json' },
                        }
                    )
                )
            }
        })
        
        db.close((err) => {
            if (err) {
                console.error('Error Closing Database: ', err);
            }
        })
    })
}

async function addGame (db, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO games (brandID, gameName, gameDescription) VALUES (?, ?, ?)`;
        const description = data.description ? data.description : null;

        db.run(query, [data.parentID, data.name, description], function (err) {
            if (err) {
                reject(
                    new Response(JSON.stringify({ error: err.message }), {
                    status: 500,
                    })
                );
            }
            else {
                resolve (
                    new Response (
                        JSON.stringify({
                            id: this.lastID,
                        }),
                        {
                            status: 201,
                            headers: { 'Content-Type': 'application/json' },
                        }
                    )
                )
            }
        })
        
        db.close((err) => {
            if (err) {
                console.error('Error Closing Database: ', err);
            }
        })
    })
}

async function addFaction (db, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO factions (gameID, factionName, factionDescription) VALUES (?, ?, ?)`;
        const description = data.description ? data.description : null;

        db.run(query, [data.parentID, data.name, description], function (err) {
            if (err) {
                reject(
                    new Response(JSON.stringify({ error: err.message }), {
                    status: 500,
                    })
                );
            }
            else {
                resolve (
                    new Response (
                        JSON.stringify({
                            id: this.lastID,
                        }),
                        {
                            status: 201,
                            headers: { 'Content-Type': 'application/json' },
                        }
                    )
                )
            }
        })
        
        db.close((err) => {
            if (err) {
                console.error('Error Closing Database: ', err);
            }
        })
    })
}

async function addMiniature (db, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO miniatures (factionID, miniatureName, miniatureDescription, qtyUnassembled, qtyBuilt, qtyPrimed, qtyPartiallyPainted, qtyBattleReady, qtyParadeReady) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const description = data.description ? data.description : null;

        db.run(query, [data.parentID, data.name, description, data.quantities[0], data.quantities[1], data.quantities[2], data.quantities[3], data.quantities[4], data.quantities[5], ], function (err) {
            if (err) {
                reject(
                    new Response(JSON.stringify({ error: err.message }), {
                    status: 500,
                    })
                );
            }
            else {
                resolve (
                    new Response (
                        JSON.stringify({
                            id: this.lastID,
                        }),
                        {
                            status: 201,
                            headers: { 'Content-Type': 'application/json' },
                        }
                    )
                )
            }
        })
        
        db.close((err) => {
            if (err) {
                console.error('Error Closing Database: ', err);
            }
        })
    })
}

export async function PUT(req){
    const db = await initDB();
    const { type, data } = await req.json();

    console.log('Type Set to: ', type);

    switch(type){
        case 'Miniature':
            return await updateMiniature(db, data);
        case 'Faction':
            return await updateFaction(db, data);
        case 'Game':
            return await updateGame(db, data);
        case 'Brand':
            return await updateBrand(db, data);
        default:
            console.log('A Type of: ', type, ' was recieved and is being rejected');
            return new Promise((resolve, reject) => {
                reject(
                    new Response(
                        JSON.stringify({
                            error: 'Type Not Specified Correctly, Valid Types are Brand, Game, Faction, Miniature'
                        }),
                        {
                            status: 500,
                        }
                    )
                )
            });
    }
}

async function updateMiniature(db, data) {
    return new Promise((resolve, reject) => {
        // Construct the SQL query to update a miniature by its id
        const query = `UPDATE miniatures 
                       SET 
                           miniatureName = ?, 
                           miniatureDescription = ?, 
                           qtyUnassembled = ?, 
                           qtyBuilt = ?, 
                           qtyPrimed = ?, 
                           qtyPartiallyPainted = ?, 
                           qtyBattleReady = ?, 
                           qtyParadeReady = ? 
                       WHERE id = ?`;

        // Ensure all required fields are provided
        const description = data.description ? data.description : null;

        // Prepare the parameters for the query
        const params = [
            data.name, 
            description, 
            data.quantities[0], 
            data.quantities[1], 
            data.quantities[2], 
            data.quantities[3], 
            data.quantities[4], 
            data.quantities[5], 
            data.id  // the id of the miniature to update
        ];

        // Execute the query
        db.run(query, params, function (err) {
            if (err) {
                reject(
                    new Response(JSON.stringify({ error: err.message }), {
                        status: 500,
                    })
                );
            } else {
                // Check if any row was updated
                if (this.changes === 0) {
                    reject(
                        new Response(
                            JSON.stringify({
                                error: 'Miniature not found or no changes made.',
                            }),
                            { status: 404 }
                        )
                    );
                } else {
                    resolve(
                        new Response(
                            JSON.stringify({
                                id: data.id, // Return the ID of the updated miniature
                            }),
                            {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' },
                            }
                        )
                    );
                }
            }
        });

        // Close the database connection
        db.close((err) => {
            if (err) {
                console.error('Error Closing Database: ', err);
            }
        });
    });
}

async function updateFaction(db, data) {
    return new Promise((resolve, reject) => {
        // Construct the SQL query to update a faction by its id
        const query = `UPDATE factions
                       SET 
                           factionName = ?, 
                           factionDescription = ?
                       WHERE id = ?`;

        // Ensure all required fields are provided
        const description = data.description ? data.description : null;

        // Prepare the parameters for the query
        const params = [
            data.name, 
            description, 
            data.id  // the id of the faction to update
        ];

        // Execute the query
        db.run(query, params, function (err) {
            if (err) {
                reject(
                    new Response(JSON.stringify({ error: err.message }), {
                        status: 500,
                    })
                );
            } else {
                // Check if any row was updated
                if (this.changes === 0) {
                    reject(
                        new Response(
                            JSON.stringify({
                                error: 'Faction not found or no changes made.',
                            }),
                            { status: 404 }
                        )
                    );
                } else {
                    resolve(
                        new Response(
                            JSON.stringify({
                                id: data.id, // Return the ID of the updated faction
                            }),
                            {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' },
                            }
                        )
                    );
                }
            }
        });

        // Close the database connection
        db.close((err) => {
            if (err) {
                console.error('Error Closing Database: ', err);
            }
        });
    });
}

async function updateGame(db, data) {
    return new Promise((resolve, reject) => {
        // Construct the SQL query to update a faction by its id
        const query = `UPDATE games
                       SET 
                           gameName = ?, 
                           gameDescription = ?
                       WHERE id = ?`;

        // Ensure all required fields are provided
        const description = data.description ? data.description : null;

        // Prepare the parameters for the query
        const params = [
            data.name, 
            description, 
            data.id  // the id of the faction to update
        ];

        // Execute the query
        db.run(query, params, function (err) {
            if (err) {
                reject(
                    new Response(JSON.stringify({ error: err.message }), {
                        status: 500,
                    })
                );
            } else {
                // Check if any row was updated
                if (this.changes === 0) {
                    reject(
                        new Response(
                            JSON.stringify({
                                error: 'Game not found or no changes made.',
                            }),
                            { status: 404 }
                        )
                    );
                } else {
                    resolve(
                        new Response(
                            JSON.stringify({
                                id: data.id, // Return the ID of the updated faction
                            }),
                            {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' },
                            }
                        )
                    );
                }
            }
        });

        // Close the database connection
        db.close((err) => {
            if (err) {
                console.error('Error Closing Database: ', err);
            }
        });
    });
}

async function updateBrand(db, data) {
    return new Promise((resolve, reject) => {
        // Construct the SQL query to update a faction by its id
        const query = `UPDATE brands
                       SET 
                           brandName = ?, 
                           brandDescription = ?
                       WHERE id = ?`;

        // Ensure all required fields are provided
        const description = data.description ? data.description : null;

        // Prepare the parameters for the query
        const params = [
            data.name, 
            description, 
            data.id  // the id of the faction to update
        ];

        // Execute the query
        db.run(query, params, function (err) {
            if (err) {
                reject(
                    new Response(JSON.stringify({ error: err.message }), {
                        status: 500,
                    })
                );
            } else {
                // Check if any row was updated
                if (this.changes === 0) {
                    reject(
                        new Response(
                            JSON.stringify({
                                error: 'Brand not found or no changes made.',
                            }),
                            { status: 404 }
                        )
                    );
                } else {
                    resolve(
                        new Response(
                            JSON.stringify({
                                id: data.id, // Return the ID of the updated faction
                            }),
                            {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' },
                            }
                        )
                    );
                }
            }
        });

        // Close the database connection
        db.close((err) => {
            if (err) {
                console.error('Error Closing Database: ', err);
            }
        });
    });
}

export async function DELETE(req){
    const db = await initDB();
    const { type, id } = await req.json();

    console.log('Type Set to: ', type);

    switch(type){
        case 'Miniature':
            return await deleteMiniature(db, id);
        case 'Faction':
            return await deleteFaction(db, id);
        case 'Game':
            return await deleteGame(db, id);
        case 'Brand':
            return await deleteBrand(db, id);
        default:
            console.log('A Type of: ', type, ' was recieved and is being rejected');
            return new Promise((resolve, reject) => {
                reject(
                    new Response(
                        JSON.stringify({
                            error: 'Type Not Specified Correctly, Valid Types are Brand, Game, Faction, Miniature'
                        }),
                        {
                            status: 500,
                        }
                    )
                )
            });
    }
}

async function deleteMiniature(db, id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM miniatures WHERE id = ?';
        const params = [id];

        db.run(query, params, function (err) {
            if (err) {
                console.error("Inside Delete Miniature Error:", err);
                reject(
                    new Response(
                        JSON.stringify({ 
                            error: err.message,
                            debugError: err
                        }), {
                        status: 500,
                    })
                );
            } else if (this.changes === 0) {
                resolve(
                    new Response(
                        JSON.stringify({
                            success: false,
                            message: 'Unable to Find Miniature',
                            deletedId: id
                        }),
                        { status: 404 }
                    )
                );
            } else {
                resolve(
                    new Response(
                        JSON.stringify({
                            success: true,
                            message: 'Miniature deleted successfully',
                            deletedId: id
                        }),
                        { status: 200 }
                    )
                );
            }
        });

        db.close((err) => {
            if (err) {
                console.error('Error Closing Database: ', err);
            }
        });
    });
}

async function deleteMiniaturesGivenFactionID(db, id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM miniatures WHERE factionID = ?';
        const params = [id];

        db.run(query, params, function (err) {
            if (err) {
                console.error("Error deleting miniatures:", err);
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}

async function deleteFaction(db, id) {
    try {
        const deleteMiniaturesSuccess = await deleteMiniaturesGivenFactionID(db, id);
        if (!deleteMiniaturesSuccess) {
            return new Promise((resolve, reject) => {
                reject(
                    new Response(JSON.stringify({ 
                        error: "Failed To Delete Miniature Children",
                        debugError: null
                    }), {
                        status: 500,
                    })
                );
            });
        }

        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM factions WHERE id = ?';
            const params = [id];

            db.run(query, params, function (err) {
                if (err) {
                    reject(
                        new Response(
                            JSON.stringify({ 
                                error: err.message,
                                debugError: err
                            }), {
                            status: 500,
                        })
                    );
                } else if (this.changes === 0) {
                    resolve(
                        new Response(
                            JSON.stringify({
                                success: false,
                                message: 'Unable to Find Faction',
                                deletedId: id
                            }),
                            { status: 404 }
                        )
                    );
                } else {
                    resolve(
                        new Response(
                            JSON.stringify({
                                success: true,
                                message: 'Faction deleted successfully',
                                deletedId: id
                            }),
                            { status: 200 }
                        )
                    );
                }
            });
        });
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(
                new Response(
                    JSON.stringify({ 
                        error: error.message,
                        debugError: error
                    }), {
                    status: 500,
                })
            );
        });
    }
}

async function deleteFactionsGivenGameID(db, gameId) {
    return new Promise((resolve, reject) => {
        const selectQuery = 'SELECT id FROM factions WHERE gameID = ?';
        db.all(selectQuery, [gameId], async (err, rows) => {
            if (err) {
                console.error("Error retrieving factions:", err);
                return reject(
                    new Response(
                        JSON.stringify({ error: err.message, debugError: err }),
                        { status: 500 }
                    )
                );
            }

            try {
                // Delete miniatures for each faction
                for (const row of rows) {
                    await deleteMiniaturesGivenFactionID(db, row.id);
                }

                // Delete factions
                const deleteQuery = 'DELETE FROM factions WHERE gameID = ?';
                db.run(deleteQuery, [gameId], function (err) {
                    if (err) {
                        console.error("Error deleting factions:", err);
                        return reject(
                            new Response(
                                JSON.stringify({ error: err.message, debugError: err }),
                                { status: 500 }
                            )
                        );
                    }
                    resolve(true);
                });
            } catch (error) {
                console.error("Error deleting factions and their miniatures:", error);
                reject(
                    new Response(
                        JSON.stringify({ error: error.message, debugError: error }),
                        { status: 500 }
                    )
                );
            }
        });
    });
}

async function deleteGame(db, id) {
    try {
        const clearFactions = await deleteFactionsGivenGameID(db, id);
        console.log("Clear Factions Given Game ID returned:", clearFactions);
        if (!clearFactions){
            console.log("Clear Factions False");
            return new Promise((resolve, reject) => {
                reject(
                    new Response(
                        JSON.stringify({ error: clearFactions }),
                        { status: 500 }
                    )
                );
            });
        }

        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM games WHERE id = ?';
            const params = [id];

            db.run(query, params, function (err) {
                if (err) {
                    reject(
                        new Response(
                            JSON.stringify({ 
                                error: err.message,
                                debugError: err
                            }), {
                            status: 500,
                        })
                    );
                } else if (this.changes === 0) {
                    resolve(
                        new Response(
                            JSON.stringify({
                                success: false,
                                message: 'Unable to Find Game',
                                deletedId: id
                            }),
                            { status: 404 }
                        )
                    );
                } else {
                    resolve(
                        new Response(
                            JSON.stringify({
                                success: true,
                                message: 'Game deleted successfully',
                                deletedId: id
                            }),
                            { status: 200 }
                        )
                    );
                }
            });
        });
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(
                new Response(
                    JSON.stringify({ 
                        error: error.message,
                        debugError: error
                    }), {
                    status: 500,
                })
            );
        });
    }
}

async function deleteGamesGivenBrandID(db, brandId) {
    return new Promise((resolve, reject) => {
        const selectQuery = 'SELECT id FROM games WHERE brandID = ?';
        db.all(selectQuery, [brandId], async (err, rows) => {
            if (err) {
                console.error("Error retrieving games:", err);
                return reject(
                    new Response(
                        JSON.stringify({ error: err.message, debugError: err }),
                        { status: 500 }
                    )
                );
            }

            try {
                // Delete miniatures for each faction
                for (const row of rows) {
                    await deleteFactionsGivenGameID(db, row.id);
                }

                // Delete factions
                const deleteQuery = 'DELETE FROM games WHERE brandID = ?';
                db.run(deleteQuery, [brandId], function (err) {
                    if (err) {
                        console.error("Error deleting games:", err);
                        return reject(
                            new Response(
                                JSON.stringify({ error: err.message, debugError: err }),
                                { status: 500 }
                            )
                        );
                    }
                    resolve(true);
                });
            } catch (error) {
                console.error("Error deleting games and their descendents:", error);
                reject(
                    new Response(
                        JSON.stringify({ error: error.message, debugError: error }),
                        { status: 500 }
                    )
                );
            }
        });
    });
}

async function deleteBrand(db, id) {
    try {
        const clearFactions = await deleteGamesGivenBrandID(db, id);
        console.log("Clear Games Given Brand ID returned:", clearFactions);
        if (!clearFactions){
            console.log("Clear Brands False");
            return new Promise((resolve, reject) => {
                reject(
                    new Response(
                        JSON.stringify({ error: clearFactions }),
                        { status: 500 }
                    )
                );
            });
        }

        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM brands WHERE id = ?';
            const params = [id];

            db.run(query, params, function (err) {
                if (err) {
                    reject(
                        new Response(
                            JSON.stringify({ 
                                error: err.message,
                                debugError: err
                            }), {
                            status: 500,
                        })
                    );
                } else if (this.changes === 0) {
                    resolve(
                        new Response(
                            JSON.stringify({
                                success: false,
                                message: 'Unable to Find Brand',
                                deletedId: id
                            }),
                            { status: 404 }
                        )
                    );
                } else {
                    resolve(
                        new Response(
                            JSON.stringify({
                                success: true,
                                message: 'Brand deleted successfully',
                                deletedId: id
                            }),
                            { status: 200 }
                        )
                    );
                }
            });
        });
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(
                new Response(
                    JSON.stringify({ 
                        error: error.message,
                        debugError: error
                    }), {
                    status: 500,
                })
            );
        });
    }
}