import express from "express";
import cors from "cors";
import helmet from "helmet";

import userRouter from "./routers/accountRouter.js";
import customerRouter from "./routers/customerRouter.js";
import carRouter from "./routers/carRouter.js";
import carTypeRouter from "./routers/car_typeRouter.js";
import car_imagesRouter from "./routers/car_imagesRouter.js";
import car_embedding_vdRouter from "./routers/car_embedding_vdRouter.js";
import bookingRouter from "./routers/bookingRouter.js";


import rateLimit from "./middleware/ratelimit.js";

const app = express();

app.use(express.json());

// CORS FIX
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      origin === "http://localhost:5173" ||
      origin === "http://localhost:5174"
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  }
}));

app.use(helmet({
  contentSecurityPolicy: true,
}));

// RATE LIMIT FIX
// app.use(rateLimit);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/accounts", userRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/cars", carRouter);
app.use("/api/v1/car_types", carTypeRouter);
app.use("/api/v1/car_images", car_imagesRouter);
app.use("/api/v1/car_embeddings", car_embedding_vdRouter);
app.use("/api/v1/bookings", bookingRouter);

export default app