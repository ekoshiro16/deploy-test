const { client } = require("./index");

async function dropTables() {
    try {
        await client.query(`
            DROP TABLE IF EXISTS characters; 
        `)
    } catch (error) {
        console.log(error); 
    }
}

async function createTables() {
    try {
        await client.query(`
            CREATE TABLE characters(
                id SERIAL PRIMARY KEY, 
                name VARCHAR(255) NOT NULL,
                status VARCHAR(255) DEFAULT 'unknown',
                age INT
            );
        `)
    } catch (error) {
        console.log(error)
    }
}

async function rebuildDB() {
    try {
        client.connect(); 
        await dropTables()

        await createTables();
        client.end();  
    } catch (error) {
        console.log(error); 
    }
}

rebuildDB(); 