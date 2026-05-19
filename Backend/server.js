import app from "./src/app.js";
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
dotenv.config();

const PORT = process.env.PORT ;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
}); 