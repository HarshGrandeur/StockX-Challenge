const express = require('express')
const app = express()
const port = 3000


var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let orders = []

let products = [
{'id':1,'name':'Chocolate','cost':1.0,'currency':'USD' },
{'id':2,'name':'Strawberry','cost':2.0,'currency':'USD' },
{'id':3,'name':'Vanilla','cost':0.5,'currency':'USD' } 
]

// for serving to both new and old clients, a new id has been created and old id has been renamed as old_id

let products_new = [
{'id': 'hdhac73','old_id':1,'name':'Chocolate','cost':1.0,'currency':'USD' },
{'id' : 'hdba86' , 'old_id':2,'name':'Strawberry','cost':2.0,'currency':'USD' },
{'id' : 'abhac50' , 'old_id':3,'name':'Vanilla','cost':0.5,'currency':'USD' } 
]

// identifying client based on thier ip address
let clients = [
   { 'id' : 1, 'name' : 'client1' , 'ip' : '10.30.10.3' , 'type' : 'old'},
   {'id' : 2 , 'name' : 'client2'  , 'ip' : '130.64.29.78' , 'type' : 'new'},
   {'id' : 3, 'name' : 'client3'  , 'ip' : '67.89.25.3' , 'type' : 'old'}

]

// products end point
app.get('/products', (req, res) => {

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip)
  // identify the client based on the incoming request ip
  ip = '67.89.25.3'
  client = clients.find(client => client.ip == ip)
  console.log('Client Type : ', client.type)

  let products_arr = JSON.parse(JSON.stringify(products_new));


  if(client.type == 'old'){
  for(var i = 0; i < products_arr.length; i++) {
              
        products_arr[i]['id'] = products_arr[i]['old_id']
	    delete products_arr[i]['old_id'];
	
   }
   }else{

    	for(var i = 0; i < products_arr.length; i++) {
              
               
		delete products_arr[i]['old_id'];

		}
    }
    
      
      var my_json = JSON.stringify(products_arr);
      console.log('Products  sent to client : ', products_arr)
      console.log('Products original : ', products_new)
      res.send(my_json);
})


// order end point
app.post('/order', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
    console.log(req.body);
   uid = orders.length+1
   name = req.body.name
   
   product = products.find( product => product.name === name)


   let currentOrder = {'id':uid,'name':name,'cost':product.cost,'currency':product.currency}
   orders.push(currentOrder)
   console.log(orders);
   res.end(JSON.stringify(currentOrder));
})



// code for spawning multiple child process
const cluster = require('cluster');


if (cluster.isMaster) {
    // logger.info('Master %s is running',process.pid);
    console.log('Master %s is running',process.pid)

    // Fork workers.
    for (let workerId = 0; workerId < 4; workerId+=1) {
        cluster.fork();
    }

    cluster.on('exit',(worker,code,signal)=>{
        // logger.info('worker %s died with code %s and signal %s',worker.process.pid,code,signal);
        console.log('worker %s died with code %s and signal %s',worker.process.pid,code,signal)
        cluster.fork();
    });
}
else {

    /*
     * Workers can share any TCP connection
     * In this case it is an HTTPS server
     */

    //http.createServer(app).listen(port);
    app.listen(port, () => {
	   console.log(`Example app listening at http://localhost:${port}`)
	})

    // logger.info('Worker %s started listening for https requests',process.pid);
}





