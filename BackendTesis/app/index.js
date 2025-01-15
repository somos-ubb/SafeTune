const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = (require("dotenv").config()).parsed
const loginRouter = require('./auth/login');
const callbackRouter = require('./auth/callback');
const refreshRouter = require('./auth/refresh_token');
const checkSongRouter = require('./api/check_song');
const modeloRouter = require('./api/modelo');
const saveSongRouter = require('./api/save_song');
const timeListenRouter = require('./api/time_listen');
const bodyParser = require('body-parser');
const switchStateRouter = require('./api/switch_state');
const realimentacionRouter = require('./api/realimentacion');
const adminRouter = require('./administrator/crud');
//const https = require('https');
//const fs = require('fs');

//const privateKey = fs.readFileSync('app/certificates/key.pem', 'utf8');
//const certificate = fs.readFileSync('app/certificates/cert.pem', 'utf8');
//const credentials = { key: privateKey, cert: certificate };

const corsOptions = {
    origin: dotenv.FRONTEND_HOST,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

// Call the function to create the table
app.use('/auth/login', loginRouter);
app.use('/auth/callback', callbackRouter);
app.use('/auth/refresh_token', refreshRouter);
app.use('/api/modelo', modeloRouter);
app.use('/api/check_song', checkSongRouter);
app.use('/api/save_song', saveSongRouter);
app.use('/api/time_listen', timeListenRouter);
app.use('/api/switch_state', switchStateRouter);
app.use('/api/realimentacion', realimentacionRouter);
app.use('/administrator', adminRouter);

//const httpsServer = https.createServer(credentials, app);

app.listen(5000, () => {
  console.log('HTTP server is running on port 5000');
});
