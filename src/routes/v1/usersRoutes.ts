import { Router } from "express";
import { container } from "tsyringe";
import UserController from "../../controllers/UserController";
import validate from "../../middlewares/validate";
import verifyAuth from "../../middlewares/verifyAuth";
import { userSchema } from "../../utils/validationSchemas";

const router = Router();

router.use(verifyAuth);

router.post("/", validate(userSchema, "body"), async (req, res) => {
    const userController = container.resolve(UserController);
    await userController.create(req, res);
});

router.get("/", async (req, res) => {
    const userController = container.resolve(UserController);
    await userController.index(req, res);
});

export default router;
