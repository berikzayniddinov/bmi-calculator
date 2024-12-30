const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/calculate-bmi', (req, res) => {
    const { weight, height } = req.body;
    if (!weight || !height || weight <= 0 || height <= 0) {
        return res.send('<h3>Invalid input. Please make sure weight and height are positive numbers.</h3>');
    }
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters ** 2);
    let category;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obese';
    res.send(`
    <h3>Your BMI: ${bmi.toFixed(2)}</h3>
    <p>Category: <strong>${category}</strong></p>
    <a href="/">Go back</a>
  `);
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
