const app = require('../src/app');
const knex = require('knex');
const helpers = require('./testhelpers');
const expect = require('chai').expect;

describe(`Test endpoints`, () => {
  before(`Create knex instance to test DB`, () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
    console.log(helpers.items);
  });
  after(`Disconnect from the db`, () => db.destroy());

  before(`Clean up`, () => helpers.cleanUpTables(db));

  afterEach(`Clean up`, () => helpers.cleanUpTables(db));

  describe(`GET /api/items`, () => {
    context(`Requesting all items with nothing in db`, () => {
      return supertest(app).get('/api/items').expect(201, []);
    });
  });
  context(`Given there are items in the db`, () =>
    beforeEach('Insert Items', () => helpers.seedItems(db, helpers.items))
  );
  it('response with 200 and all of the items', () => {
    return supertest(app)
      .get(`/api/items`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
      });
  });
  let data = {
    sku: 'sku5',
    name: 'name5',
    description: 'description5',
    price: 5,
    cost: 5,
    inventory: 5,
  };
  it(`adds an item`, () => {
    return supertest(app)
      .post(`/api/items`)
      .send(data)
      .set('Accept', 'application/json')
      .type('json')
      .expect(201);
  });
});
