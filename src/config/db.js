const db = require('mongoose');

const dbConnect  = async()=>{
    await db.connect('mongodb://localhost:27017/nishant-feed');
}
module.exports = { dbConnect };