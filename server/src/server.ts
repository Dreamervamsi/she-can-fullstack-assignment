import { app } from './app.js';
import './config/db.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});