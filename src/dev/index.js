import express from 'express';
import jabt from 'jabt';

const app = express();

app.use(jabt);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost${PORT !== 80 ? `:${PORT}` : ''}`));
