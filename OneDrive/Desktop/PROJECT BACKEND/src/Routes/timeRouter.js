import {Router} from 'express'
import { getTimeByEmployeeID ,updateTime, getTime, createTime} from '../Controllers/timeController.js'

const timeRouter = Router();

timeRouter.post('/updateTime', updateTime);
timeRouter.get('/getTime', getTime);
timeRouter.post('/createTime', createTime);
timeRouter.get('/getTimeByEmployeeID/:employeeID', getTimeByEmployeeID);

export default timeRouter;