import {Router} from 'express';
import {createPayrollRecord, getAllPayrollRecords, deletePayrollRecord, getPayrollRecordById} from '../Controllers/payrollController.js'

const payrollRouter = Router();

payrollRouter.post('/payroll', createPayrollRecord);
payrollRouter.get('/payroll' , getAllPayrollRecords);
payrollRouter.get('/payroll/:id' , getPayrollRecordById);
payrollRouter.delete('/payroll/:id', deletePayrollRecord);

export default payrollRouter;