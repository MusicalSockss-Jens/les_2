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
    const user = req.query.user;

    let resultMessages = messages;

    if (user) {
        resultMessages = messages.filter(
            msg => msg.user.toLowerCase() === String(user).toLowerCase()
        );
    }

    res.status(200).json({
        status: "success",
        data: {
            messages: resultMessages
        }
    });
});

app.get('/api/v1/messages/:id', (req, res) => {
    const id = Number(req.params.id);
    const message = messages.find(msg => msg.id === id);

    if (!message) {
        return res.status(404).json({
            status: "fail",
            message: "Bericht niet gevonden"
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            message
        }
    });
});

app.post('/api/v1/messages', (req, res) => {
    const payload = req.body?.message;

    if (
        !payload ||
        typeof payload.user !== 'string' ||
        typeof payload.text !== 'string'
    ) {
        return res.status(400).json({
            status: "fail",
            message: "Ongeldige body. Gebruik { message: { user, text } }"
        });
    }

    const nextId = messages.length > 0
        ? Math.max(...messages.map(msg => msg.id)) + 1
        : 0;

    const newMessage = {
        id: nextId,
        user: payload.user,
        text: payload.text
    };

    messages.push(newMessage);

    res.status(201).json({
        status: "success",
        message: "Bericht succesvol toegevoegd",
        data: {
            message: newMessage
        }
    });
});

app.put('/api/v1/messages/:id', (req, res) => {
    const id = Number(req.params.id);
    const message = messages.find(msg => msg.id === id);

    if (!message) {
        return res.status(404).json({
            status: "fail",
            message: "Bericht niet gevonden om te updaten"
        });
    }

    const payload = req.body?.message;

    if (!payload) {
        return res.status(400).json({
            status: "fail",
            message: "Geen geldig bericht gegeven"
        });
    }

    if (payload.user !== undefined) message.user = payload.user;
    if (payload.text !== undefined) message.text = payload.text;

    res.status(200).json({
        status: "success",
        message: "Bericht succesvol geüpdatet",
        data: {
            message
        }
    });
});

app.delete('/api/v1/messages/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = messages.findIndex(msg => msg.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Bericht niet gevonden om te verwijderen"
        });
    }

    messages.splice(index, 1);

    res.status(200).json({
        status: "success",
        message: "Bericht succesvol verwijderd"
    });
});

app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});