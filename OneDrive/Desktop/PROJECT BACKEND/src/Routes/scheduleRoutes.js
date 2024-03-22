import { Router } from 'express';
import { createSchedule, getScheduleByID, updateSchedule, deleteSchedule } from '../Controllers/scheduleController.js';

const scheduleRouter = Router();

scheduleRouter.post('/schedule', createSchedule);
scheduleRouter.get('/schedule/:scheduleID', getScheduleByID);
scheduleRouter.put('/schedule/:scheduleID', updateSchedule);
scheduleRouter.delete('/schedule/:scheduleID', deleteSchedule);

export default scheduleRouter;
