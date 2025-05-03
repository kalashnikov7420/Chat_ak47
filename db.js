let mysql = require("mysql2")
require("dotenv").config()

let db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

let asyncDB = db.promise()

async function getUsers(){
    try{
        let[rows, fields] = await asyncDB.query("select * from user")
        return rows
    }catch(err){
        throw err.message
    }
}
async function addUser(login, password){
    try{
        let[rows, fields] = await asyncDB.query("insert into user(login, password) values(?, ?)", [login, password]);
        return rows
    }catch(err){
        throw err.message
    }
}
async function checkExists(login){
    try{
        let[rows, fields] = await asyncDB.query("SELECT * from user WHERE login = ?", [login])
        return rows.length > 0;
    }catch(err){
        throw err.message
    }
}

async function getMessages() {
    try {
        let [rows, fields] = await asyncDB.query("select m.id, m.content, m.author_id, u.login from Message as m JOIN user AS u ON m.author_id = u.id");
        return rows;
    } catch (err) {
        throw err.message;
    }
}


async function addMessage(content, userId) {
    try {
        let [rows, fields] = await asyncDB.query("insert into Message(content, author_id) values(?, ?)", [content, userId]);
        return rows;
    } catch (err) {
        throw err.message;
    }
}


module.exports = {
    getUsers,
    getMessages,
    addMessage,
    addUser,
    checkExists
};