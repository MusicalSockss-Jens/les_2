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

app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});