import { Router } from "express";
import userRoutes from "./user";
import postRoutes from "./post";
import commentRoutes from "./comment";
import googleLoginRoutes from "./googleLogin";

const router = new Router();
router.use("/users", googleLoginRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/posts", commentRoutes);

export default router;
