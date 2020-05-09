
const dbConnection = require("../MongoDB/mongoConnection");
const data = require('../data/');
const posts = data.post;
const users = data.users;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    
    const createdPost = await posts.createdPost("buy used car", "Bob", "automobile", "How to buy a used car in USA?");
  	console.log(typeof(createdPost));
    console.log('Done seeding database');

    await db.serverConfig.close();
}

main();