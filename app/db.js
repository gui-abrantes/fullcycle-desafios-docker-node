async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:root@db:3306/nodedb");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function createTablePeople() {
    const conn = await connect();
    let qryCreate = `create table if not exists people(
        id int primary key auto_increment,
        name varchar(255)not null)`;
    await conn.query(qryCreate);
}

async function insertPeople(name) {
    const conn = await connect();
    let qryInsert  = `insert into people (name) values ('${name}')`;
    await conn.query(qryInsert);
}

async function selectPeoples(){
    const conn = await connect();
    const [rows] = await conn.query(`SELECT * FROM people;`);
    return rows;
}

module.exports = {createTablePeople, insertPeople, selectPeoples}