const express = require('express');
const cors = require('cors');
const http = require('http');
const dbConnect = require('../config/dbConnect');
const socket = require('../config/socket'); // socket 로직 불러오기
const weather = require('../config/weather'); // weather API 로직 불러오기

const app = express();
const server = http.createServer(app);
const PORT = 4000;
const router = require('./router');

dbConnect();

app.use(cors());
app.use(express.json());

// 소켓 초기화
socket(server);

// 날씨 API 라우트 설정
app.get('/api/weather', weather);

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'SUCCESS CONNECT SERVER😊',
  });
});

app.use('/api', router.api);

const start = () => {
  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT} 🖥️`);
  });
};

module.exports = async () => ({
  start,
});