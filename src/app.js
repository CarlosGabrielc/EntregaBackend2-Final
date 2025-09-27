// app.js
import express from 'express';
import mongoose from 'mongoose';
import cartRouter from './routes/carts.router.js';
import productRouter from './routes/products.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils/utils.js';
import path from 'path';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from "./routes/sessions.router.js";
import userRouter from "./routes/users.js";





const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));


// Rutas API
app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter); 
app.use('/', viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", userRouter);
app.use("/api/users", userRouter);
// Conexión a MongoDB
const MONGO_URL = 'mongodb://127.0.0.1:27017/tuDB'; 

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('🟢 Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('🔴 Error al conectar a MongoDB:', err);
  });
