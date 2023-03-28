require('dotenv').config(); 
const pg = require("pg");

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost:5432/theLastOfUs');
client.password = process.env.RENDER_PASSWORD; 

async function createNewCharacter(charObj) {
    try {
        const { rows } = await client.query(`
            INSERT INTO characters(name, status, age)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [charObj.name, charObj.status, charObj.age])

        if (rows.length) {
            return rows[0]
        } else {
            return undefined
        }
    } catch (error) {
        console.log(error); 
    }
}

async function fetchAllCharacters() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM characters; 
        `)
        return rows; 
    } catch (error) {
        console.log(error); 
    }
}


module.exports = {
    client,
    fetchAllCharacters,
    createNewCharacter
}