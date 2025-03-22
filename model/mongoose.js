/* 
 *Larissa Rosenbrant
 *Databasfil Mongoose;
 */
const url1 = 'mongodb://localhost:27017/mycv';
import mongoose from 'mongoose';

mongoose.connect(url1)
        .then(() => {
            console.log("Ansluten till MongoDB-databasen framgångsrikt!");
        })
        .catch((err) => {
            console.log("Fel vid anslutning till MongoDB:" + err.message);
        });

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Connected to db");
});
// Exporterar modulen
export default mongoose;