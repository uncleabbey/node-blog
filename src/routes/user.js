/**
 * @swagger
 *  components:
 *    schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user.
 *         name:
 *          type: string
 *          description: The name of your user.
 *         email:
 *          type: string
 *          description: The email of your user.
 *         password:
 *          type: string
 *          description: The password of your user.
 *       example:
 *          name: John Doe
 *          email: johnny@gmail.com
 *          password: johnnixace
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *     Login:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         email:
 *          type: string
 *          description: The email of your user.
 *         password:
 *          type: string
 *          description: The password of your user.
 *       example:
 *          email: johnny@gmail.com
 *          password: johnnixace
 */

/**
 * @swagger
 *   tags:
 *    name: User
 *    description: API to manage your users.
 */

/**
 * @swagger
 *  path:
 *    /users/register:
 *      post:
 *        summary: registers users
 *        tags: [User]
 *        requestBody:
 *         required: true
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/User'
 *        responses:
 *          201:
 *           description: The created user.
 *           content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/User'
 *    /users/login:
 *      post:
 *        summary: login users
 *        tags: [User]
 *        requestBody:
 *         required: true
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Login'
 *        responses:
 *          201:
 *           description: The created user.
 *           content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/User'
 *          400:
 *           desciption: Bad Request
 *    /users/me:
 *      get:
 *        security:
 *          - bearerAuth: []
 *        summary: Get a users based on token supplied
 *        tags: [User]
 *        responses:
 *          200:
 *           description: The list of users.
 *           content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/User'
 *          401:
 *           desciption: No token provided
 *          404:
 *           desciption: User not found
 */

import { Router } from "express";
import verifyUser from "../middleware/verifyUser";
import {
  validateUserBody,
  validateLoginBody,
} from "../middleware/validators";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/user";

const router = new Router();
router.post("/register", validateUserBody, registerUser);
router.post("/login", validateLoginBody, loginUser);
router.get("/me", verifyUser, getUser);

export default router;
