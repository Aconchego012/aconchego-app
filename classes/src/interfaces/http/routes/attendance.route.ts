import { Router, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { createPersonSchema } from "../schemas";

const router = Router();

router.put(
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
  }
);

export default router;
