import { Router, Request, Response } from "express";
import { registerAttendanceUsecase } from "../../../usecases/class.usecase";

const router = Router();

router.post("/:id/attendance", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { studentId } = req.query;
  const { date, status } = req.body;

  const attendance = await registerAttendanceUsecase({
    classId: id,
    studentId: String(studentId),
    date,
    status,
  });

  return res.status(201).json(attendance);
});

export default router;
