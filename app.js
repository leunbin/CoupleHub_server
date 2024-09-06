require('dotenv').config(); // dotenv 설정
const express = require('express');
const axios = require('axios'); // axios 불러오기
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    console.log(data);
    socketIO.emit('messageResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'SUCCESS CONNECT SERVER',
  });
});

// 기상청 API 프록시 설정
app.get('/api/weather', async (req, res) => {
  const { date, time, nx, ny } = req.query;
  const apikey = process.env.WEATHER_API_KEY;
  const weatherAPIUrl = process.env.WEATHER_CALLBACK_URL;

  const requestUrl = `${weatherAPIUrl}?serviceKey=${apikey}&numOfRows=7&pageNo=1&dataType=JSON&base_date=${date}&base_time=${time}&nx=${nx}&ny=${ny}`;
  
  try {
    const response = await axios.get(requestUrl);
    return res.json(response.data.response.body.items.item);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
