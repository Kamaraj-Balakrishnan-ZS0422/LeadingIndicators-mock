const express = require('express'); 
const cookieParser = require('cookie-parser'); 
const session = require('express-session');
const app = express(); 

app.use(cookieParser());

app.use(session({
    secret: 'gHCS9>_WRVb!u^$kp[~x4z',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 15 * 60 * 1000, // 15 minutes
      httpOnly: true, // Prevents JavaScript access to cookies
      sameSite: 'lax', // Prevents CSRF by limiting cross-origin requests
      secure: false, // Only true in production (use HTTPS in production)
      path: '/',
    },
  }));

app.get('/', (req, res) => { 
res.cookie('name', 'GeeksForGeeks').send(); 
console.log(req.cookies); 

}); 


app.listen(3002, (err) => { 
	if(err){ console.log(err) } 
	else { console.log('Success!!') } 
}); 
