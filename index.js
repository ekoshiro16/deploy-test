require('dotenv').config(); 
const express = require("express")
const morgan = require("morgan")
const app = express();
const { 
    client,
    fetchAllCharacters,
    createNewCharacter
} = require("./db/index")

app.use(morgan('dev')); 
app.use(express.json());

app.get("/api/characters", async (req, res) => {
    try {
        const allData = await fetchAllCharacters(); 

        res.send(allData).status(200);
    } catch (error) {
        console.log(error); 
    }
})

app.post("/api/characters", async (req, res) => {
    try {
        const newCharacter = await createNewCharacter(req.body);

        if (newCharacter) {
            res.send(newCharacter)
        } else {
            res.send({error: "Failed to create character"})
        }
    } catch (error) {
        console.log(error); 
    }
})

app.get("/secret", (req, res) => {
    try {
        res.send(process.env.JWT_SECRET)
    } catch (error) {
        console.group(error); 
    }
})

client.connect(); 

app.listen(3000, () => {
    console.log("Server is running")
})