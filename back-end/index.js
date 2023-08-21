// Import necessary packages and modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
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
  console.log('yes resync db.');
});

// Import controllers
const billController = require('./controller/billController.js');
const agentController = require('./controller/agentController.js');
const paymentController = require('./controller/PaymentController.js');
const serviceController = require('./controller/serviceProviderController.js');
const userController = require('./controller/UserController.js');
// const agentHistoryController = require('./controllers/agentHistoryController');
// const serviceHistoryController = require('./controllers/serviceHistoryController');
// const userHistoryController = require('./controllers/userHistoryController');
const AdminLoginController = require('./controller/AdminLoginController.js');
const adminLogin  = require('./controller/AdminLoginController.js');

// Import routes
const billsRouter = require('./routes/billRoute.js');
const usersRouter = require('./routes/userRoute.js');
const paymentRouter = require('./routes/paymentRoute.js');
const adminRoutes = require('./routes/AdminRoutes.js');
const agentRoutes = require('./routes/agentRoute.js');
const serviceProvidersRoutes = require('./routes/serviceProviderRoute.js')

// Mount routes
app.use('/bills', billsRouter);
app.use('/Users', usersRouter);
app.use('/payment', paymentRouter);
app.use('/api/admin', adminRoutes);
app.use('/agents', agentRoutes);
app.use('/serviceProviders', serviceProvidersRoutes);
app.use ('/Images',express.static('./Images'))

//testing api
app.get('/',(req,res)=>{
  res.json({message: 'Welcome to E-Payment'})
})

//Port
const PORT = process.env.PORT || 3000

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// // set up routes
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
//   console.log(`Server started on port ${PORT}`);
//   connection.connect(function(err){
//     if (err) throw err;
//     console.log('database connected');

//   })
// });
