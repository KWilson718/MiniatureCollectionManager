import initDB from "@/lib/db";

export async function GET (req) {
    const db = await initDB();

    return new Promise((resolve, reject) => {
        const url = new URL(req.url);
        const params = url.searchParams;

        // console.log("Recieved following Params", url, params);

        let query = `SELECT * FROM brands`;
        db.all(query, [], (err, rows) => {
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
    console.log('Data Set to: ', data);
    // console.log('Request Set To: ', req);
    

    if (type == 'Brand') {
        return await addBrand(db, data);
    }
    else {
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

        db.run(query, [data.name, description || ''], function (err) {
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