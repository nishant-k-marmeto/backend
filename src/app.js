const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const { dbConnect } = require('./config/db');
const { validateSignUpData } = require('./utils/validation');
const authRoutes = require('./controller/auth');
const protectedRoute = require('./controller/protectedRoute');

app.use(express.json());

dbConnect()
    .then(() => {
        console.log('Database connected successfully !!');
    }).catch((err) => {
        console.log('Error connecting to database', err);
    });

app.post('/register', (req, res) => {
   // const { error } = validateSignUpData(req.body);
   res.send("jsdhfskhfdksj")
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    res.status(201).json({ message: 'User registered successfully' });
});

app.use("/auth", authRoutes);
app.use('/protected', protectedRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
