# StockX-Challenge

## 1. Exercise 1  : 
   Implemented the functions for unit tests. There are 2 function implementations : findMany and findOne. FindMany returns all shoes matching the search critera while findOne returns the first shoe matching the criteria.
   
## 2. Exercise 2 : 

   I have implemented this as an Express JS application whose code is present in myapp/app.js.

###   Question 1 : 
   I have implemented the end point for returning all ice-cream  products. The data type I have chosen for cost is 64 bit floating point numbers (JS default datatype) as it can easily handle prices with decimals.
###   Question 2 : 
   
   Http Method : POST
   
   Endpoint : http://localhost:3000/order
   
   Request Header :
   [{"key":"Content-Type","value":"application/x-www-form-urlencoded","description":""}]
   
   Request Body :
   [{"key":"name","value":"Vanilla","description":""}]
   
   Response Body :
   
   {"id":1,"name":"Vanilla","cost":0.5,"currency":"USD"}
   
   I have created a POST request and I am sending the ice cream name as a parameter.This can be replaced with id or any other parameter based on business. After this I am creating an order list and adding each order to it. This can be persisted later on to a database.
   
###  Question 3 :
   
   As part of this question,  we need to updated the prodcuts end point so as to sever to new clients which use uuid as id. This change must also be backward compatible to serve clients expecting int ids. To do this, I have added a new id : which is uuid and updated old id as 'old_id'. I also have a list of clients and their behaviour. When an incoming request comes, I am checking whether the client expects a new id or an old one based on its IP address. The client checking can later be changed to other ways based on the business needs. After this I am sending the required id.
    
###  Question 4 :
    
   This essentially deals with scaling. For now, I have created mltiple workers by spawning child processes. When the appliction needs more scaling we can assign these child process to multiple nodes to handle the traffic. We can add a caching and a load balancer layer for optimization. Caching will help in serving the requests very fast and we can use something like Redis for fast request serving. 
