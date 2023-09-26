import mongoose, { Document, Schema } from 'mongoose';

export enum Status {
  OPEN = 'open',
  CLOSED = 'closed',
}

export interface ITicket {
  client: string;
  issue: string;
  status?: Status;
  deadline: Date | string;
}

export interface ITicketModel extends ITicket, Document {}

const TicketSchema: Schema = new Schema(
  {
    client: {
      type: String,
      required: true,
      set: (value: string) => value.toUpperCase(),
    },
    issue: { type: String, required: true },
    status: { type: String, required: true, default: Status.OPEN },
    deadline: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ITicketModel>('Ticket', TicketSchema);
