import { promises as fs } from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'bookings.json');

export async function getBookings() {
  try {
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addBooking(booking) {
  const bookings = await getBookings();
  const newBooking = { id: Date.now().toString(), ...booking };
  bookings.push(newBooking);
  await fs.writeFile(file, JSON.stringify(bookings, null, 2));
  return newBooking;
}
