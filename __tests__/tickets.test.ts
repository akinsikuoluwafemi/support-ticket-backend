import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/server';
import Ticket, { ITicket, Status } from '../src/models/Ticket';

interface Ticket extends ITicket {
  _id: string;
}
describe('Ticket API', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Creating the mongoDB memory server
    mongoServer = await MongoMemoryServer.create();
    // Connecting to the mongoDB memory server using mongoose
    await mongoose.connect(mongoServer.getUri(), { dbName: 'notificationsDB' });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Ticket.deleteMany({});

    const ticket: ITicket = {
      client: 'TEST',
      issue: 'This is a new issue',
      status: Status.OPEN,
      deadline: new Date(),
    };
    await Ticket.create(ticket);
  });

  afterEach(async () => {
    await Ticket.deleteMany({});
  });

  it('should create a new ticket', async () => {
    const newTicket = {
      client: 'SMT',
      issue: 'Brainstorm with stakeholders',
      deadline: new Date().toISOString(),
    };
    const response = await request(app).post('/tickets').send(newTicket);

    expect(response.status).toBe(201);
    expect(response.body.data.client).toBe(newTicket.client);
    expect(response.body.data.issue).toBe(newTicket.issue);
    expect(response.body.data.deadline).toBe(newTicket.deadline);
  });

  it('should edit an existing ticket', async () => {
    const ticket: Ticket | null = await Ticket.findOne({});

    const updatedTicket = {
      client: ticket?.client,
      issue: ticket?.issue,
      status: 'closed',
      deadline: ticket?.deadline,
    };

    const response = await request(app)
      .put(`/tickets/${ticket?._id}`)
      .send(updatedTicket);

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe(updatedTicket.status);
  });

  it('should return all tickets', async () => {
    const response = await request(app).get('/tickets');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1); //number of expected tickets
  });
});
