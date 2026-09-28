import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let messages = [
    { id: 0, user: "Pikachu", text: "nodejs isn’t hard, or is it?" },
    { id: 1, user: "Ash", text: "Got to catch 'em all!" }
];

app.get('/', (req, res) => {
    res.send({ status: "success", message: "De server werkt!" });
});

app.get('/api/v1/messages', (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            messages: messages
        }
    });
});

app.get('/api/v1/messages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const message = messages.find(m => m.id === id);

    if (!message) {
        return res.status(404).json({
            status: "fail",
            message: "Bericht niet gevonden"
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            message: message
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});