// Import necessary packages and modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware.js')
const cors = require('cors');
const app = express();

var corOptions = {
  origin: 'https://localhost:3000'
}

//middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//
const db = require('./models/index.js')
db.sequelize.sync();

db.sequelize.sync({force: false })
.then(() => {

=======
  console.log('it is working');
}); 

// Import controllers
const billController = require('./controller/billController.js');
// const agentController = require('./controllers/agentController');
const paymentController = require('./controller/PaymentController.js');
// const serviceController = require('./controllers/serviceController');
const userController = require('./controller/UserController.js');
// const agentHistoryController = require('./controllers/agentHistoryController');
// const serviceHistoryController = require('./controllers/serviceHistoryController');
// const userHistoryController = require('./controllers/userHistoryController');

// Import routes
const billsRouter = require('./routes/billRoute.js');
const serviceProvidersRouter = require('./routes/serviceProviderRoute.js');
const paymentRouter = require('./routes/paymentRoute.js');

// Mount routes
app.use('/bill', billsRouter);
app.use('/serviceprovider', serviceProvidersRouter);
app.use('/payment', paymentRouter);

//testing api
app.get('/',(req,res)=>{
  res.json({message: 'hello from api'})
})

//Port
const PORT = process.env.PORT || 8000

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// up routes

// app.use('/agents', agentController);
// app.use('/bills', billController);
// app.use('/payments', paymentController);
// app.use('/services', serviceController);
// app.use('/users', userController);
// app.use('/agentHistory', agentHistoryController);
// app.use('/serviceHistory', serviceHistoryController);
// app.use('/userHistory', userHistoryController);

// start server
// app.listen(PORT, () => {

//   console.log(Server started on port ${PORT});

//   connection.connect(function(err){
//     if (err) throw err;
//     console.log('database connected');

//   })
// });
