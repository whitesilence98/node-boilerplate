import express from "express";

import user from "./user/user.router";
import product from "./product/product.router";
import authentication from "./authentication/authentication.route";

const router = express.Router();

router.use("/auth", authentication);
router.use("/user", user);
router.use("/product", product);

export default router;
