// Write your tests here
const supertest = require("supertest")
const db = require("../data/dbConfig")
const server = require("./server")
const testUser = { username: "alygator", password: "password"}
const testUserInvalid = { username: "test" }

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

test('sanity', () => {
  expect(false).toBe(false)
})

describe("unauthorized joke endpoint tests", () => {
  it('should return 401', async () => {
    const res = await supertest(server).get('/api/jokes');
    expect(res.statusCode).toBe(401);
  });
  it('should return json', async() => {
    const res = await supertest(server).get('/api/jokes');
    expect(res.type).toBe('application/json')
});
})

describe("register endpoints", () => {
  
  it('should register a user', async () => {
    await db('users').truncate()
    const res = await supertest(server).post("/api/auth/register").send(testUser)
    expect(res.statusCode).toBe(201)
  })

  it('should return a status code 400 with invalid request body', async () => {
    await db('users').truncate()
    const res = await supertest(server).post("/api/auth/register").send(testUserInvalid)
    expect(res.statusCode).toBe(400)
  })
})

describe("login endpoints", async () => {
  it('should work with valid user', async () => {
      const post = await supertest(server).post("/api/auth/register").send(testUser)
      const res = await supertest(server)
      .post('/api/auth/login')
      .send(testUser);
      expect(res.status).toBe(201)
  })
  it('return 401 with invalid user', async () => {
      const res = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'no user', password: '1234' })
      expect(res.status).toBe(401)
  })
});
