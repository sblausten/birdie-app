import app from '../src/application'
import * as request from 'supertest';

describe('Ping', () => {
  it('returns 200 with correct content', async () => {
    await request(app)
      .get('/ping')
      .expect(200)
      .expect(function(res) {
        expect(res.body.greetings).toContain('Thank you');
      });
  })
});
