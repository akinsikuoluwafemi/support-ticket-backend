import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Ticket from '../models/Ticket';

const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { client, issue, status, deadline } = req.body;
    const ticket = new Ticket({
      client,
      issue,
      status,
      deadline,
    });
    const data = await ticket.save();

    res.status(201).json({
      message: 'Ticket saved successfully',
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message,
      success: false,
    });
  }
};

const getAllTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allTicket = await Ticket.find({}).sort({ deadline: -1 });
    if (allTicket) {
      res.status(200).json({ data: allTicket, success: true });
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message, success: false });
  }
};

const updateTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let ticketId = req.params.id;
    const { client, issue, status, deadline } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found', success: false });
    }
    const updatedTicket = {
      client,
      issue,
      status,
      deadline,
    };
    const data = await Ticket.findByIdAndUpdate(ticket?._id, updatedTicket, {
      new: true,
    });

    res.status(200).json({
      message: 'Ticket updated successfully',
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message, success: false });
  }
};

export default {
  createTicket,
  getAllTicket,
  updateTicket,
};
