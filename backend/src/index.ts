import app = require("./app");

const PORT = process.env.PORT || 4000;

throw new Error('fallo simulado');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});