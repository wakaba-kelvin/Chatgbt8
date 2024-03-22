import { sendServerError, sendCreated, sendDeleteSuccess, sendNotFound } from '../Helper/helper.js';
import { generateAllPayrolls ,createPayrollService, getAllPayrollsService, deletePayrollService, getPayrollByIdService } from '../Service/payrollService.js'; // Import necessary functions from the payroll controller

// Controller for creating a payroll record
export const createPayrollRecord = async (req, res) => {
    // Extract required fields from request body
    const payrollData = {
        EmployeeID: req.body.EmployeeID,
        GrossPay: req.body.GrossPay,
        NHIFDeduction: req.body.NHIFDeduction,
        NSSFDeduction: req.body.NSSFDeduction,
        HELBDeduction: req.body.HELBDeduction
    };

    console.log("Request Body:", payrollData); // Log the request body

    try {
        // Create payroll record
        const response = await createPayrollService(payrollData.EmployeeID, payrollData.GrossPay, payrollData.NHIFDeduction, payrollData.NSSFDeduction, payrollData.HELBDeduction);
        res.status(201).json({ message: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Controller for getting all payroll records
export const getAllPayrollRecords = async (req, res) => {
    try {
        const payrolls = await generateAllPayrolls();
        res.status(200).json(payrolls);
    } catch (error) {
        console.error("Error fetching all payroll records:", error);
        res.status(500).json("Internal server error");
    }
};
////////////////////////////////////////////////////////////////


// Controller for getting a payroll record by ID
export const getPayrollRecordById = async (req, res) => {
    const payrollId = req.params.id;
    try {
        const payroll = await getPayrollByIdService(payrollId);
        if (!payroll) {
            sendNotFound(res, 'Payroll record not found');
        } else {
            res.status(200).json(payroll);
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Controller for deleting a payroll record by ID
export const deletePayrollRecord = async (req, res) => {
    const payrollId = req.params.id;
    try {
        const response = await deletePayrollService(payrollId);
        if (response instanceof Error) {
            return sendServerError(res, response.message);
        } else {
            return sendDeleteSuccess(res, `Payroll record with id: ${payrollId} was deleted successfully`);
        }
    } catch (error) {
        return sendServerError(res, error.message);
    }
};
