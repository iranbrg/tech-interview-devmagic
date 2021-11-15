import { Router } from "express";
import { container } from "tsyringe";
import AuthController from "../../controllers/AuthController";
import validate from "../../middlewares/validate";
import { authSchema } from "../../utils/validationSchemas";

const router = Router();

router.post("/", validate(authSchema, "body"), async (req, res) => {
    const userController = container.resolve(AuthController);
    await userController.create(req, res);
});

export default router;
