/* 
 * Larissa Rosenbrant
 */
import mongoose from 'mongoose';
import Jobs from './model/jobs.js';
import express from 'express';
import cors from 'cors';
//const express = require('express');
// const cors = require('cors');
const app = express();
app.use(express.json());
// Aktivera CORS middleware för alla rutter
app.use(cors());
const port = 3000;
app.use(express.urlencoded({extended: true}));
var new_id = 0;

app.get('/api', (req, res) => {
    Jobs.find({}).then(data => res.status(200).json(data))
            .catch(err => res.status(404).json(err.message));
});

// Asynkron funktion
// Letar efter senaste id om det finns
// annars returnerar 0 för att nästa skall bli 1;
async function findLastElement() {
    const docs = await Jobs.find({}, ['id']).sort({'id': -1}).limit(1).exec();
    if (docs !== null && docs.length > 0)
    {
        return docs[0].id;
    } else
        return 0;
}

// Lägger ett nytt arbete i databasen
app.post('/api', (req, res) =>
{
    let company = req.body.company;
    let title = req.body.title;
    let location = req.body.location;
    let description = req.body.description;
    let start = req.body.start;
    let end = req.body.end;

    if (!company || !title || !location || !description || !start || !end)
    {
        return res.status(404).json("Tomma fält får inte förekomma!");
    } else
    {
        (async () => {
            const idres = await findLastElement();
            new_id = idres + 1;
            try {
                // Lägger arbete i databasen
                const work = Jobs.create({
                    id: new_id,
                    company: company,
                    title: title,
                    location: location,
                    description: description,
                    start: start,
                    end: end
                });
                res.status(200).json("Arbetet har sparats i databasen.");
            } catch {
                res.status(404).json("Tekniskt fel i databasen!");
            }
        })();
    }
}
);

// Raderar ett arbete med id;
app.delete('/:id', function (req, res, next) {
    // Insänt id som skall raderas;
    var delid = req.params.id;
    Jobs.findByIdAndRemove(delid, {useFindAndModify: false}, (err, obj) => {
        // FEL
        if (err)
            return res.status(500).send(err);
        else
        {
        return res.status(200).send("Atbetet har raderats i databasen.");
        }
    });
});

app.listen(port);