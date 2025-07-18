import express, { Request, Response } from "express";
import cors from "cors";
import addressRouter from "./routes/address";
import brandRouter from "./routes/brand";
import cartRouter from "./routes/cart";
import cartItemRouter from "./routes/cart-item";
import categoryRouter from "./routes/category";
import orderRouter from "./routes/order";
import orderItemRouter from "./routes/order-item";
import paymentRouter from "./routes/payment";
import productOptionGroupRouter from "./routes/product-option-group";
import productOptionRouter from "./routes/product-option";
import productVariantRouter from "./routes/product-variant";
import productRouter from "./routes/product";
import reviewRouter from "./routes/review";
import saleRouter from "./routes/sale";
import storeRouter from "./routes/store";
import userRouter from "./routes/user";
import wishlistRouter from "./routes/wishlist";
import { configDotenv } from "dotenv";
import authRouter from "./routes/auth";

const app = express();
configDotenv();

app.use(express.json());
app.use(cors());

app.use('/api/v1/address', addressRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/brand', brandRouter);
app.use('/api/v1/cart-item', cartItemRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/order-item', orderItemRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/product-option-group', productOptionGroupRouter);
app.use('/api/v1/product-option', productOptionRouter);
app.use('/api/v1/product-variant', productVariantRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/sale', saleRouter);
app.use('/api/v1/store', storeRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/wishlist', wishlistRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('Server is healthy');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
