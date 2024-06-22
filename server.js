const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDb } = require("./utils/connectDb");
const userRouter = require("./routes/userRoutes");
const foodItemsRouter = require("./routes/foodItemsRoutes");
const cartItemsRouter = require("./routes/cartRoutes");
const addressRouter = require("./routes/addressRoutes");
const orderRouter = require("./routes/orderHistoryRoute")

dotenv.config();

const app = express();

connectDb(process.env.MONGODB_URL);
const corsOptions = {
  origin: 'https://food-point-frontend-in-react.vercel.app',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/',(req,res)=>res.json({messge:'Welcome To Food Point'}))
app.use("/api/v1/user", userRouter);
app.use("/api/v1/food", foodItemsRouter);
app.use("/api/v1/cart", cartItemsRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/order", orderRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Is Listening On Port ${process.env.PORT}`);
});
