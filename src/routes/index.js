import { Router } from "express";
import userRoutes from "./user";
import postRoutes from "./post";
import commentRoutes from "./comment";

const router = new Router();
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/posts", commentRoutes);

export default router;
