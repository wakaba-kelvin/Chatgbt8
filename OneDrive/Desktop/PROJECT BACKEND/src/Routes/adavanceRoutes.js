// advanceRoutes.js
import { Router } from 'express';
import { createAdvanceRecord, getAllAdvanceRecords, deleteAdvanceRecord, getAdvanceRecordById } from '../Controllers/advanceController.js';

const advanceRouter = Router();

advanceRouter.post('/createAdvance', createAdvanceRecord);
advanceRouter.get('/getAllAdvances', getAllAdvanceRecords);
advanceRouter.get('/getAdvanceById/:id', getAdvanceRecordById);
advanceRouter.delete('/deleteAdvance/:id', deleteAdvanceRecord);

export default advanceRouter;
