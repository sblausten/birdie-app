import * as mysql from "mysql";
import CareEvent from "../../models/careEvent";
import ApplicationConfig from "../../config/applicationConfig";

export default class Events {

    public async getEvents(careRecipientId: string) {

        const connection = mysql.createConnection({
            host: ApplicationConfig.DB_CONFIG_TEST.host,
            user: ApplicationConfig.DB_CONFIG_TEST.user,
            password: ApplicationConfig.DB_CONFIG_TEST.password,
            database: ApplicationConfig.DB_CONFIG_TEST.database
        });

        // TODO Use pool
        connection.connect();
        console.log("Searching for " + careRecipientId);

        connection.query('SELECT payload FROM events WHERE care_recipient_id=' + careRecipientId + ' limit 30', (error, results, _) => {
            if (error) throw error;
            // console.log('Query results: ', results);
            // console.log('Query fields : ', fields);
            connection.end();
            const res = results
                .map((event: any) =>
                    JSON.parse(event.payload))
                .map((payload: any) => {
                    const event = new CareEvent(
                            payload.caregiverId,
                            payload.timestamp,
                        payload.eventType
                        );
                    return event;
                });
            return res;
        });
    }
}

