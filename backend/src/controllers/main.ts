import * as express from "express";
import Events from "../clients/db/events";

export const main = express.Router();

main
    .get('/hello', (_, res) => {
        res.status(200).json({
            message: 'Thank you for spending some time on this test. All the best 🙌'
        });
    })
    .get('/events/recipient/:careRecipientId', (req, res) => {
        new Events().getEvents(req.params.careRecipientId).then((events => {
            console.log("events returned are: ", events);
            res.status(200)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(events))
        }))
    });
