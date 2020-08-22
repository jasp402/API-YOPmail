const { Router } = require('express');
const echo = require('./echo.route');
const YOPmail = require('easy-yopmail');

const r = Router();

r.use('/echo', echo);

r.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API - YOPmail. v1 path live 🔥',
    data: null
  });
});

r.get('/getmail', function (req, res) {
    const petition = YOPmail.create();
    petition.then(response => {
        res.json({
            success: true,
            message: '📮 mail generate automatically with [API - YOPmail]',
            data: response
        });
    })
});

r.get('/getinbox/:mail', function (req, res) {
    let email = undefined;
    let query = '';
    if((req.params.mail).indexOf('@')>-1){
        email = req.params.mail.split('@')[0]
    }
    else{
        email = req.params.mail
    }

    if(Object.keys(req.query).length > 0){
        let queryKey = Object.keys(req.query)[0];
        query = req.query[queryKey];
    }

    const petition = YOPmail.inbox(email, query);
    petition.then(response => {
        res.end(JSON.stringify(response, null, ' '));
    });
});

r.get('/readmail/:mail/:id', function (req, res) {
    let url = 'http://m.yopmail.com/en/m.php?';
    if(req.params.mail && req.params.id){
        url += `b=${req.params.mail}&id=${req.params.id}`
    }else{
        res.end('error! require mail and id');
    }
    console.log(url);
    const petition = YOPmail.readMail(url);
    petition.then(response => {
        res.end(response);
    })
});


module.exports = r;
