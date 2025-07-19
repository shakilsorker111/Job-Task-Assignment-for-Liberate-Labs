import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { categorizeEvent } from './utils/categorize';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: string;
  archived: boolean;
}

const events: Event[] = [];


app.post('/post-event', (req, res) => {
  const { title, date, time, notes } = req.body;

  if (!title || !date || !time) {
    return res.status(400).json({ message: 'Title, date, and time are required.' });
  }

  const category = categorizeEvent(title, notes);
  const newEvent: Event = {
    id: Date.now().toString(),
    title,
    date,
    time,
    notes,
    category,
    archived: false
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});


app.get('/all-events', (req, res) => {
  const sorted = events.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
  res.status(200).json(sorted);
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const event = events.find(e => e.id === id);
  if (!event) return res.status(404).json({ message: 'Event not found.' });

  event.archived = true;
  res.status(200).json(event);
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ message: 'Event not found.' });

  events.splice(index, 1);
  res.status(204).send();
});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});