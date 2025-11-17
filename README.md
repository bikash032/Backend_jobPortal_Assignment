# api-36

## Package download/setup

- `npm i <pacakgeName> --global`
- It will setup `<packagename>` globally. You can use this package afterward in any project

- `npm i <pacakgeName>`
- It will setup `<packageName>` locally. It means that you can only use this package in the current project.
- It will create `node_modules/` folder in your local project and downloads all the dependencies of that package;
- It will create a `package-lock.json` file that locks all the dependencies for that package.
- It will add `dependency` list if not present or add the package in the list of dependencies in `package.json` file

- `npm i <pacakgeName> --save-dev`
- It will setup `<packageName>` for development purpose only.
- other all the informations as similar to locally setup

## Express

- Server
- MVC Pattern
- Modular Programming
- Express Server side
- Major feeatures of express

## MVC Pattern-
- Model-View-Controller
  - Model 
    * database operation 
  - View 
    * UI / UX (Skip React)
    * Response JSON 
  - Controller
    * Logic developer


## Ecommerce Modules 
- Feature of a project 
- Auth and Authorization 
  - users 
  - 6
- Banner
  - banners
- Brand  
  - brands (name, logo, slug)
- Category 
  - categories (name, slug, image, parentId)
- Product 
  - products (name, slug, price, discount, descirption, category, brand, seller, images, attributes, ....)
- Cart/Order 
  - carts (buyer,order, product, quntity, price, seller, status, delivrycharge, total, ....)
  - orders  (buyer, billId, cart[], subtotal, disocunt, tax, total, orderDate, status,)
- Transaction 
  - transaction (orderid, paymentMode, refId, response, status, date)
- Returns 
  - 4
- Offer 
- Logistic 
- Chat
- Fav and Wishlist 


## Web Perform Operations 4 
- CRUD 
- Create, Read, Update, Delete 
- 5 methods 
- get, post, put, patch, delete
- Create => Post 
- Read => get 
- Update => Put/patch
- Delete => delete

## Client Response Format 
- always in json 
- predefined format 
  `{`
    `data/error: any,`
    `message: string,`
    `status: string,`
    `options: Object | null`
  `}`
  
## Modules 

* Auth and Authorization 
- Registration
  - As a user I should be able to register into my application 
  - A user will have , name(fullname), email, password, role, address, phone, image, gender, etc as a user information

- Activation
- Login 
- Refresh Token
- Forget Password
- Reset Password
- Logged In User's Profile
- Dasboard Access 

## Category 
- CRUD 
- Create 
  - post method, endpoint: /category
- Read 
  - get All , method: get, endpoint: /category
  - get detail, method: get , endpoint: /category/:id
- Update 
  - method: put endpoint: /category/:id
- Delete 
  - method: delete, endpoint: /category/:id


## Flow 
- /index.js => /src/config/express.config.js => /src/config/router.config.js => /src/modules/[module]/[module].router.js

## Production SMTP 
- sendgrid 
  - domain and hosting 
- mailchimp 
  - domain verification 
- gmail 
  - limitation -> per day 100 email 
- fake 
  - mailtrap


### Database 
- Server Data store permanent store 
- 2 types 
  - Relational Database (sql language)
    - relations maintain data 
    - table row and column - structured
    - mysql, postgresql, oracle, mssql, sqlite, 
  - Non-relational Database (NoSQL => Not only SQL)
    - non relational data
    - document (json)
    - mongodb, couchdb, casandra etc

  - Nodejs 
    - SQL   ==> postgres, mysql
    - NoSQL => Mongodb
  
  - Mongodb => mongoose provider 
  - SQL     => sequelize, typeorm, prisma


### Mongodb Access
* using cli
  -  `mongosh` 
* GUI application 
  - `Mongodb compass`
* Project
  - Integration
* Database 

## Config
- username: infotechorson
- password: rGve5EJ46GXpayNh

- username: mern-36
- password: R3coha3TDfxWoBYq

- ClusterURL: mongosh "mongodb+srv://cluster0.nss1a.mongodb.net/" --apiVersion 1 --username <db_username>


### CRUD 
#### Create 
- `db.<collectionName>.insertOne(<jsonObject>)`
  - {acknowledge: true, insertedId: "hexcode"} -> _id column 
- `db.<collectionName>.insertMany(<Json Array Of objects>)`
- for eg. `db.users.insertOne({name: "Sandesh Bhattarai", email: "sandesh@broadwayinfosys.com", role: "admin", address: "Kahtmandu"});`
- for eg. `db.users.insertMany([{name: "Sandesh Bhattarai", email: "sandesh@broadwayinfosys.com", role: "admin", address: "Kahtmandu"},{name: "Sandesh Bhattarai", email: "sandesh@broadwayinfosys.com", role: "admin", address: "Kahtmandu"}]);`
##### Sample Data
```json
[{"name":"Sandesh Bhattarai","email":"sandesh@example.com","phone":"9812345678","address":"Kathmandu","role":"admin","age":30,"status":"active"},{"name":"Sita Sharma","email":"sita@example.com","phone":"9823456789","address":"Pokhara","role":"seller","age":25,"status":"inactive"},{"name":"Ram Thapa","email":"ram@example.com","phone":"9834567890","address":"Lalitpur","role":"customer","age":40,"status":"active"},{"name":"Hari Shrestha","email":"hari@example.com","phone":"9845678901","address":"Bhaktapur","role":"admin","age":35,"status":"active"},{"name":"Gita Rai","email":"gita@example.com","phone":"9856789012","address":"Biratnagar","role":"seller","age":28,"status":"inactive"},{"name":"Shyam Lama","email":"shyam@example.com","phone":"9867890123","address":"Dharan","role":"customer","age":45,"status":"active"},{"name":"Rita Karki","email":"rita@example.com","phone":"9878901234","address":"Butwal","role":"admin","age":32,"status":"inactive"},{"name":"Nabin Gurung","email":"nabin@example.com","phone":"9889012345","address":"Hetauda","role":"seller","age":29,"status":"active"},{"name":"Kiran KC","email":"kiran@example.com","phone":"9890123456","address":"Janakpur","role":"customer","age":38,"status":"inactive"},{"name":"Mina Tamang","email":"mina@example.com","phone":"9801234567","address":"Chitwan","role":"admin","age":27,"status":"active"},{"name":"Bikash Adhikari","email":"bikash@example.com","phone":"9812345679","address":"Nepalgunj","role":"seller","age":33,"status":"inactive"},{"name":"Suman Shrestha","email":"suman@example.com","phone":"9823456780","address":"Dhangadhi","role":"customer","age":41,"status":"active"},{"name":"Anita Thapa","email":"anita@example.com","phone":"9834567891","address":"Birgunj","role":"admin","age":26,"status":"inactive"},{"name":"Ramesh Bhandari","email":"ramesh@example.com","phone":"9845678902","address":"Itahari","role":"seller","age":34,"status":"active"},{"name":"Sunita Rai","email":"sunita@example.com","phone":"9856789013","address":"Bharatpur","role":"customer","age":39,"status":"inactive"},{"name":"Prakash Sharma","email":"prakash@example.com","phone":"9867890124","address":"Tulsipur","role":"admin","age":31,"status":"active"},{"name":"Kusum KC","email":"kusum@example.com","phone":"9878901235","address":"Ghorahi","role":"seller","age":24,"status":"inactive"},{"name":"Raju Lama","email":"raju@example.com","phone":"9889012346","address":"Tikapur","role":"customer","age":37,"status":"active"},{"name":"Sujata Karki","email":"sujata@example.com","phone":"9890123457","address":"Lamahi","role":"admin","age":36,"status":"inactive"},{"name":"Bimal Gurung","email":"bimal@example.com","phone":"9801234568","address":"Kohalpur","role":"seller","age":42,"status":"active"}]
```

### Read 
- `db.<collectionName>.find(filter, projection, config)`
  - returns multiple row at a time
- `db.<collectionName>.findOne(filter, projection, config)`
  - returns a single data ata time 

* Filter 
  - where condition 
  - format  
  ```json 
    {
      key: "value"
    } or 
    {
      $op: <condition>
    }

    e.g 
    {
      "role": "admin"     // all the useres with role => admin and 
    }

    {
      role: "admin",
      address: "kathmandu"      // all the admin users from kathmandu
    }
    * Operators: $or, $and, $lt, $lte, $gt, $gte, $in, $nin, $eq, $ne
    {
      role: "admin",      // all the admin users from kathmandu or bhaktapur
      $or: [{address: "Kathmandu"}, {address: "Bhaktapur"}]
    }

    {
      role: "admin",
      address: {$in: ["Kathmandu", 'Bhaktapur']}
    }
  ```
* projection
  - {key: 1 or 0}
* config 
  - sorting, 
  - limit 

### Update 
- `db.<collectionName>.updateOne(filter, updatebody, config)`
- `db.<collectionName>.updateMany(filter, updatebody, config)`

* update body 
  - {$set: {key: value}}

### delete 
- `db.<collectionName>.deleteOne(filter)`
- `db.<collectionName>.deleteMany(filter)`


### Mongoose Data type 
* String, Number, Date, ObjectId, Array, Object, Decimal, Boolean

### MVC + Repository 
- model inject Base Repo 
- modular repo 

- multi level 
  - Motors, tools & DIY ----- 1, parentId => null
    - Lubricants =====> 2, parentId => 1
  - Home & Lifestyle ------3, parentId => null 
    - Media, music & Books --  4, parentId => 3
      - Books -------------> 5, parentId => 4
      - Magazines ---------> 6, parentId => 4


## Sql Server 
  - postgresql/mysql
## Socket Programming 
  - Client (browser)
  - Chat implement
  - Notification

## Cart 
 - Client -> localstorage/cookie 
 - Server -> Db

 - Bill
  - Customer 
  - Bill summay 
  - Order Detail 
    - product
    - quantity
    - price 
    - total Amount

  - Order Detail (cart)
    - product info, order associate, pricing,
  - orders 
    - customer, bill summary, status 
  - transactions 
    - orderId, paymentAmt, customer, paymentMode, data

  
  - orderDetails 
    - _id, order, customer, productId, quantity, price, discount, deliveryCharge, total, seller, createdAt, updatedAt
  - orders
    - _id, orderCode, customer, subTotal, discount, serviceCharge, total, status, checkoutComplete, updatedBy, createdAt, updatedAt
  - transactions 

  - vouchers 
    - _id, user, name, code, discount(flat, %, conditional), conditionValue
  - appliedVouchers 
    - _id, user,voucher, code, discountValue, appliedAt


### Sql 
- password: ........
- port no: 5432
- username: postgres/username
- host: localhost

- db setup
- table create (migration)
- run table 
- model define
- db query

### SQL ORM Provider
- sequelize
- typeorm 
- prisma

- DB server 

#### CRUD 
### Create 
- ```INSERT INTO <tableName> (columnName,....) VALUES (value,....)```
- ```INSERT INTO <tableName> SET columnName = value, ......```

### Read
- ``` SELECT <fields> FROM <tableName>  [<JOIN Operation> ] [WHERE <condition> ] [GROUP BY <CONDITION>] [ORDER BY <columnName> <Direction>] [HAVING <clause>] [LIMIT <starting>, <LIMITSIZE>]```

### Update 
- ``` UPDATE <tableName> SET <columnName> = <value> [WHERE <condition>]```

### Delete 
- ``` DELETE FROM <tableName> [WHERE <condition>]```


### SQL DB server 
- Db creation 
#### integration
  - Table create 
  - Migrations Schema 
  - Model creation 
  
  - Server connection
  - Model Definition