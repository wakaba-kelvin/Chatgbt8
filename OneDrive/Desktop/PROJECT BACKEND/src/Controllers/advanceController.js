// advanceController.js
import { sendServerError, sendCreated, sendDeleteSuccess, sendNotFound } from '../Helper/helper.js';
import { createAdvanceService, getAllAdvancesService, deleteAdvanceService, getAdvanceByIdService } from '../Service/advanceService.js';

export const createAdvanceRecord = async (req, res) => {
    const { EmployeeID, Amount } = req.body;

    try {
        const response = await createAdvanceService(EmployeeID, Amount);
        res.status(201).json({ message: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllAdvanceRecords = async (req, res) => {
    try {
        const advances = await getAllAdvancesService();
        res.status(200).json(advances);
    } catch (error) {
        console.error("Error fetching all advance records:", error);
        res.status(500).json("Internal server error");
    }
};

export const getAdvanceRecordById = async (req, res) => {
    const advanceId = req.params.id;
    try {
        const advance = await getAdvanceByIdService(advanceId);
        if (!advance) {
            sendNotFound(res, 'Advance record not found');
        } else {
            res.status(200).json(advance);
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

export const deleteAdvanceRecord = async (req, res) => {
    const advanceId = req.params.id;
    try {
        const response = await deleteAdvanceService(advanceId);
        if (response instanceof Error) {
            return sendServerError(res, response.message);
        } else {
            return sendDeleteSuccess(res, `Advance record with id: ${advanceId} was deleted successfully`);
        }
    } catch (error) {
        return sendServerError(res, error.message);
    }
};
