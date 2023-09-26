import express from 'express';
import ticketCtrl from '../controllers/Ticket';
import { Schemas, ValidateWithJoi } from '../middleware/ValidateSchema';

const router = express.Router();

router.post(
  '/',
  ValidateWithJoi(Schemas.ticket.create),
  ticketCtrl.createTicket
);
router.put(
  '/:id',
  ValidateWithJoi(Schemas.ticket.update),
  ticketCtrl.updateTicket
);
router.get('/', ticketCtrl.getAllTicket);

export = router;
