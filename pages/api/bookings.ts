import { NextApiRequest, NextApiResponse } from 'next';
import { addBooking, getBookings } from '../../models/Booking';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const bookings = await getBookings();
    res.status(200).json(bookings);
  } else if (req.method === 'POST') {
    const { name, email, message, datetime } = req.body;

    if (!name || !email || !datetime) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const booking = await addBooking({ name, email, message, datetime });
    res.status(200).json(booking);
  } else {
    res.status(405).end();
  }
}
