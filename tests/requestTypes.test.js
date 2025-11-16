require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/server');
const RequestType = require('../src/models/RequestType');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/support-api-test';

beforeAll(async () => {
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

beforeEach(async () => {
  await RequestType.deleteMany({});
  await RequestType.create({
    code: 'TEST_TYPE',
    name: 'Test Request Type',
    description: 'Type de demande pour les tests',
    priority: 'medium',
    category: 'test',
    estimatedResponseTime: 10,
    isActive: true,
  });
});

describe('GET /health', () => {
  it('retourne status 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});

describe('GET /api/request-types', () => {
  it('retourne un tableau', async () => {
    const res = await request(app).get('/api/request-types');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});

describe('POST /api/request-types', () => {
  it('crée un nouveau type', async () => {
    const payload = {
      code: 'NEW_TYPE',
      name: 'Nouveau type',
      description: 'Un nouveau type de demande',
      priority: 'high',
      category: 'test',
      estimatedResponseTime: 5,
      isActive: true,
    };

    const res = await request(app)
      .post('/api/request-types')
      .send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('code', 'NEW_TYPE');
  });
});
