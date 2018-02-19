var checksum = require('../../model/checksum');
var config = require('../../config/config');

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
        console.log(PAYTM_MERCHANT_KEY);
        checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result)
        {
            console.log(result);
            console.log('pratik')
            var checkSum = {};
            checkSum.checkSumData =  result.CHECKSUMHASH;
            res.json(checkSum);
        });

        console.log("POST Order end");

    });
//vidisha
};