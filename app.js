const express = require('express');
const hbs = require('express-handlebars');   // handlebars 템플릿 엔진
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');



const app = express();

//** handlebars 핵심 설정 시작 **//
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultLayout: 'main',    // 기본 레이아웃 파일 index.hbs 지정, 요청에 따라 레이아웃을 변경할수 있다.
    layoutsDir: __dirname + '/views/layouts/',  // 헨들바템플릿의 레이아웃 파일의 위치
    partialsDir: __dirname + '/views/partials/' // 파티셜이란: 레이아웃을 채울 header.hbs, left.hbs, footer.hbs 파일의 위치
} ) );

app.set( 'view engine', 'hbs' ); // handlebars파일의 확장자를 hbs로 사용.

//** handlebars 핵심 설정 끝 **//

app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//     },
// }));
app.use(flash());

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/login', function (req, res) {
    res.render('login',{layout:false});
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
