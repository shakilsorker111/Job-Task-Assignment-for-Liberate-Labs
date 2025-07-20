"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const categorize_1 = require("./utils/categorize");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const events = [];
app.post('/post-event', (req, res) => {
    const { title, date, time, notes } = req.body;
    if (!title || !date || !time) {
        return res.status(400).json({ message: 'Title, date, and time are required.' });
    }
    const category = (0, categorize_1.categorizeEvent)(title, notes);
    const newEvent = {
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
    if (!event)
        return res.status(404).json({ message: 'Event not found.' });
    event.archived = true;
    res.status(200).json(event);
});
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = events.findIndex(e => e.id === id);
    if (index === -1)
        return res.status(404).json({ message: 'Event not found.' });
    events.splice(index, 1);
    res.status(204).send();
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
