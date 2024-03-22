import {Router} from 'express';
import { updateEmployee , createEmployee, getAllEmployees, employeeLogin, fireEmployee, getEmployeeById} from '../Controllers/employeeController.js'

const employeeRouter = Router();

employeeRouter.post('/employee/register', createEmployee);
employeeRouter.get('/employee' , getAllEmployees);
employeeRouter.get('/employee/:id' , getEmployeeById);
employeeRouter.post('/employee/login', employeeLogin);
employeeRouter.delete('/employee/:id', fireEmployee);
employeeRouter.put('/employee/:id', updateEmployee);

export default employeeRouter;