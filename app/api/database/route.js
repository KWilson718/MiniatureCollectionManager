import initDB from "@/lib/db";

export async function GET (req) {
    const db = await initDB();

    return new Promise((resolve, reject) => {
        const url = new URL(req.url);
        const params = url.searchParams;
        const type = params.get("type");
        const brandID = params.get("brandID");
        const gameID = params.get("gameID");
        const factionID = params.get("factionID");

        let query;
        let queryParams = [];

        switch (type) {
            case 'brand':
                query = `SELECT * FROM brands`;
                break;
            query = `SELECT * FROM games`;
                if(brandID){
                    query += ` WHERE brandID = ?`;
                    queryParams.push(brandID);
                }
                break;
            query = `SELECT * FROM factions`;
                if(gameID){
                    query += ` WHERE gameID = ?`;
                    queryParams.push(gameID);
                }
                break;
            query = `SELECT * FROM miniatures`;
                if(factionID){
                    query += ` WHERE factionID = ?`;
                    queryParams.push(factionID);
                }
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
        default:
            console.log('A Type of: ', type, ' was recieved and is being rejected');
            return new Promise((resolve, reject) => {
                reject(
                    new Response(
                        JSON.stringify({
                            error: 'Type Not Specified Correctly, Valid Types are Brand'
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