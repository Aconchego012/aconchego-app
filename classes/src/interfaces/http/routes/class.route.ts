import { Request, Response, Router } from "express";
import {
  createClassUsecase,
  updateClassUsecase,
  listClassUsecase,
  deleteClassUsecase,
  registerStudentToClass,
} from "../../../usecases/class.usecase";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const newClass = await createClassUsecase(req.body);
  return res.status(201).json(newClass);
});

router.get("/", async (_req: Request, res: Response) => {
  const classes = await listClassUsecase();
  return res.json(classes);
});

router.put("/:id", async (req: Request, res: Response) => {
  const updatedClass = await updateClassUsecase(req.params.id, req.body);
  return res.json(updatedClass);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const deletedClass = await deleteClassUsecase(req.params.id);
  return res.json(deletedClass);
});

router.post("/:id/student", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { studentId } = req.body;

  await registerStudentToClass(studentId, id);

  return res.status(201);
});
