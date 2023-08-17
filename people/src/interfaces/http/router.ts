import { Router, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { createPersonSchema } from "./schemas";
import { createPersonUseCase } from "../../usecases/person.usecase";

const router = Router();

router.post(
  "/",
  checkSchema(createPersonSchema),
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

router.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

export default router;
