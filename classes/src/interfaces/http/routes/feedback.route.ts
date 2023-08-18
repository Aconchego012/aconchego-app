import { Request, Response, Router } from "express";
import { createFeedbackUsecase } from "../../../usecases/feedback.usecase";

const router = Router();

router.post("/feedback", async (req: Request, res: Response) => {
  const newFeedback = await createFeedbackUsecase(req.body);
  return res.status(201).json(newFeedback);
});
