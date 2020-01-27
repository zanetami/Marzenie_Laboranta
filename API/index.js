const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const userController = require('./functions/userController')
const issueController = require('./functions/issueController')
const deviceController = require('./functions/deviceController')
const statisticsController = require('./functions/statisticsController')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if (req.method === `OPTIONS`) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    return res.status(200).json({});
  }

  next();
})

app.get('/', (request, response) => {
  response.json({ info: 'API works.' })
})

//#region users

app.get('/users/getallusers', userController.getAllUsers)
app.get('/users/getuserbyid/:id', userController.getUserById)
app.get('/users/loginuser/:login/:password', userController.loginUser)
app.post('/users/registeruser', userController.registerUser)
app.put('/users/updateuser/:id', userController.updateUser)
app.delete('/users/deleteUser/:id', userController.deleteUser)

//#endregion
//#region issues

app.post('/issues/getallissuesbyuser', issueController.getAllIssuesByUser)
app.post('/issues/addissue/:initiator_id', issueController.addIssue)
app.post('/issues/getissuebydate', issueController.getIssueByDate)
app.get('/issues/setissuesolver/:id_i/:solver_id', issueController.setIssueSolver)
app.post('/issues/updateissue', issueController.updateIssue)
app.delete('/issues/deleteissue/:id', issueController.deleteIssue)

//#endregion

//#region device

app.get('/devices/getalldevices', deviceController.getAllDevices)
app.get('/devices/getallconnecteddevices/:id', deviceController.getAllConnectedDevices)
app.post('/devices/adddevice', deviceController.addDevice)

//#endregion

app.get('/statistics', statisticsController.getStatistics)
app.get('/statistics/user/:id', statisticsController.getStatisticsUser)
app.get('/statistics/service/:id', statisticsController.getStatisticsService)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})