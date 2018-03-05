var checksum = require('../../model/checksum');
var config = require('../../config/config');
var request = require('request');

module.exports = function (app) {

 app.get('/testtxn', function(req,res){
   console.log("in restaurant");
console.log("--------testtxnjs----");
res.render('testtxn.ejs',{'config' : config});
  });


  app.post('/testtxn',function(req, res) {
        console.log("POST Order start");
        var paramlist = req.body;
        var paramarray = new Array();
        console.log(paramlist);
        for (name in paramlist)
        {
          if (name == 'PAYTM_MERCHANT_KEY') {
               var PAYTM_MERCHANT_KEY = paramlist[name] ; 
            }else
            {
            paramarray[name] = paramlist[name] ;
            }
        }
        console.log(paramarray);
        paramarray['CALLBACK_URL'] = 'https://paytmapptesting.herokuapp.com/response';  // in case if you want to send callback
        paramarray['AUTH_MODE'] = '3D';
		console.log(PAYTM_MERCHANT_KEY);
        checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result) 
        {
              console.log(result);
           res.render('pgredirect.ejs',{ 'restdata' : result });
        });

        console.log("POST Order end");

 });
    app.post('/getChecksum',function(req, res) {
        console.log("POST Order start");
        var paramlist = req.body;
        var paramarray = new Array();
        console.log(paramlist);
        for (name in paramlist)
        {
            if (name == 'PAYTM_MERCHANT_KEY') {
                var PAYTM_MERCHANT_KEY = paramlist[name] ;
            }else
            {
                paramarray[name] = paramlist[name] ;
            }
        }
        console.log(paramarray);
        //paramarray['CALLBACK_URL'] = 'https://paytmapptesting.herokuapp.com/response';  // in case if you want to send callback
        //paramarray['CALLBACK_URL'] = 'http://localhost:5000/response';  // in case if you want to send callback
        console.log(PAYTM_MERCHANT_KEY);
        checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result)
        {
            var checkSum = {};
            checkSum.CUST_ID =  result.CUST_ID;
            checkSum.INDUSTRY_TYPE_ID =  result.INDUSTRY_TYPE_ID;
            checkSum.CHANNEL_ID =  result.CHANNEL_ID;
            checkSum.TXN_AMOUNT =  result.TXN_AMOUNT;
            checkSum.MID =  result.MID;
            checkSum.WEBSITE =  result.WEBSITE;
            checkSum.CALLBACK_URL =  result.CALLBACK_URL;
            checkSum.CHECKSUMHASH =  result.CHECKSUMHASH;
            checkSum.ORDER_ID = result.ORDER_ID;
            checkSum.CALLBACK_URL = result.CALLBACK_URL;
            console.log(result);
            res.json(checkSum);
        });

        console.log("POST Order end");

    });
	app.get('/sendOTP',function(req, res) {
		var authKey = req.query.authkey;
		var mobile = req.query.mobile;
		
        request.get({ url: "https://api.msg91.com/api/sendotp.php?authkey="+authKey+"&mobile="+mobile},      function(error, response, body) { 
              if (!error && response.statusCode == 200) { 
                  res.json(body); 
                 } 
             }); 

    });
	app.get('/verifyOTP',function(req, res) {
		var authKey = req.query.authkey;
		var mobile = req.query.mobile;
		var otp = req.query.otp;
        request.get({ url: "https://api.msg91.com/api/verifyRequestOTP.php?authkey="+authKey+"&mobile="+mobile+"&otp="+otp},      function(error, response, body) {
              if (!error && response.statusCode == 200) { 
                  res.json(body); 
                 } 
             }); 

    });
//vidisha
};