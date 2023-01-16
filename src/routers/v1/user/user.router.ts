import express from "express";
import verifyToken, {authentication, authorization} from "middleware/auth.middleware";

import * as controller from "./user.controller";

const router = express.Router({mergeParams: true});

router.post("/", controller.create);
// router.use(verifyToken);
// Need to login
router.get("/", authorization, controller.find);
router.get("/:id", controller.get);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
