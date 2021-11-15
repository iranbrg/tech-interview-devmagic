import { Router } from "express";
import notFound from "./notFound";
import v1 from "./v1";

const router = Router();

router.use("/v1", v1);

router.use(notFound);

export default router;
