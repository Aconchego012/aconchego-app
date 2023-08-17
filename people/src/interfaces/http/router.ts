import { Router, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { createPersonSchema, updatePersonSchema } from "./schemas";
import {
  createPersonUseCase,
  deletePersonUsecase,
  getPersonUseCase,
  updatePersonUseCase,
} from "../../usecases/person.usecase";

const router = Router();

router.post(
  "/",
  checkSchema(createPersonSchema, ["body"]),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({
        errors: result.array().map((error: any) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    const person = req.body;
    const createdPerson = await createPersonUseCase(person);

    res.json(createdPerson);
  }
);

router.get(
  "/:id",
  checkSchema(
    {
      id: {
        notEmpty: true,
      },
    },
    ["params"]
  ),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({
        errors: result.array().map((error: any) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    const { id } = req.params;
    const person = await getPersonUseCase(id);

    res.json(person);
  }
);

router.put(
  "/:id",
  checkSchema(
    {
      id: {
        notEmpty: true,
      },
    },
    ["params"]
  ),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({
        errors: result.array().map((error: any) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    const { id } = req.params;
    const person = req.body;
    const updatedPerson = await updatePersonUseCase(id, person);

    res.json(updatedPerson);
  }
);

router.delete(
  "/:id",
  checkSchema({ id: { notEmpty: true } }, ["params"]),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({
        errors: result.array().map((error: any) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }
    const { id } = req.params;
    await deletePersonUsecase(id);

    res.status(200);
  }
);

export default router;
