/* 
 * Larissa Rosenbrant
 * Arbeten
 */
import mongoose from './mongoose.js';
const { Schema, model } = mongoose;

var jobSchema = mongoose.Schema({
    id: Number,
    company: String,
    title: String,
    location: String,
    description: String,
    start: Date,
    end: Date
});

// Skapa en model 
// myjobs - collection i databasen;
const Jobs = mongoose.model('myjobs', jobSchema);
// Exporterar modulen
export default Jobs; 