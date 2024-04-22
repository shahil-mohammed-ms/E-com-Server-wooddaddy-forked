import express from 'express'
import cors from "cors";
import router from "./routes/index.js";
import morgan, { token } from "morgan";

const app = express();
app.use(cors());
app.use(express.json());
token("custom-date", (req, res) => {
  return new Date().toUTCString();
});
app.use(
  morgan(
    ":custom-date :method :url :status :res[content-length] - :response-time ms"
  )
);
console.log(morgan);
app.use(router);

export default app;
