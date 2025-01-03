import initDB from "@/lib/db";

export async function GET (req) {
    const db = initDB();

    return new Promise((resolve, reject) => {
        const url = new URL(req.url);
        const params = url.searchParams;

        console.log("Recieved following Params", url, params);

        let query = `SELECT * FROM factions`;
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
    const db = db.initDB();
    const { type, data } = await req.json();

    console.log('Type Set to: ', type);
    console.log('Data Set to: ', data);
    console.log('Request Set To: ', req);
    
    return new Promise((resolve, reject) => {
        resolve(
            new Response(
                JSON.stringify({
                    data,
                }),
                {
                    status: 201,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        )
    });
}


// Example Post logic
// return new Promise((resolve, reject) => {
//     const query = `INSERT INTO  (name, description) VALUES (?, ?)`;
//     db.run(query, [name, description], function (err) {
//       if (err) {
//         reject(
//           new Response(JSON.stringify({ error: err.message }), {
//             status: 500,
//           })
//         );
//       } else {
//         resolve(
//           new Response(
//             JSON.stringify({
//               id: this.lastID,
//               name,
//               description,
//             }),
//             {
//               status: 201,
//               headers: { 'Content-Type': 'application/json' },
//             }
//           )
//         );
//       }
//     });

//     db.close((err) => {
//       if (err) {
//         console.error('Error closing database:', err.message);
//       }
//     });
// });