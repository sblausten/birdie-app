import app from '../src/application'
import * as request from 'supertest';
import CareEvent from '../src/models/careEvent';
import Events from '../src/clients/db/events';
import { EventType } from '../src/models/eventType';
import {mocked} from "ts-jest";

describe('Events', () => {
    const date: Date = new Date("2019-04-26T07:08:21.758Z");
    const type = "general_observation";
    jest.mock('../src/clients/db/events', () => {
        return jest.fn().mockImplementation(() => {
            return {
                getEvents: ((_: string) => {
                    console.log("Calling mock");
                    return [new CareEvent("abc", date, EventType[type])]
                })
            };
        });
    });
    const MockedEvents = mocked(Events, true);

    // beforeEach(() => jest.clearAllMocks());
    // afterEach(() => jest.restoreAllMocks());

    it('returns 200 with correct content for user', async () => {
        await request(app)
          .get('/events/recipient/abc123')
          .expect(200)
          .expect((res) => {
            expect(res.body[0]).toContainEqual({
                caregiverId: "abc",
                timestamp: date.toString(),
                eventType: type
            });
          });

        expect(MockedEvents).toHaveBeenCalledTimes(1);
    });
});
