/**
 * @swagger
 *  components:
 *    schemas:
 *      Post:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          body:
 *            type: string
 */
/**
 * @swagger
 *  path:
 *    /posts/:
 *      get:
 *       summary: get all posts
 *       tags:
 *         - Posts
 *       responses:
 *         200:
 *          description: All post fetched
 *          content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Post'
 *      post:
 *        security:
 *          - bearerAuth: []
 *        summary: creates post
 *        tags:
 *          - Posts
 *        requestBody:
 *         required: true
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Post'
 *        responses:
 *          201:
 *           description: The created post.
 *           content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/Post'
 *    /posts/{id}:
 *      get:
 *        summary: get a post
 *        tags:
 *          - Posts
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Post Id
 *        responses:
 *          200:
 *            description: The Fetched post
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Post'
 *      patch:
 *        security:
 *          - bearerAuth: []
 *        summary: edit a post
 *        tags:
 *          - Posts
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Post Id
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Post'
 *        responses:
 *          202:
 *            description: The modified post
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Post'
 *      delete:
 *        security:
 *          - bearerAuth: []
 *        summary: delete a post
 *        tags:
 *          - Posts
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Post Id
 *        responses:
 *          204:
 *            description: The deleted post
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Post'
 *    /posts/user:
 *      get:
 *        security:
 *          - bearerAuth: []
 *        summary: get all posts by user
 *        tags:
 *          - Posts
 *        responses:
 *          200:
 *            description: Post by  that particular user
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Post'
 */

import { Router } from "express";
import verifyUser from "../middleware/verifyUser";
import isOwner from "../middleware/verifyOwner";
import { validatePostBody } from "../middleware/validators";
import {
  addPost,
  getAllPosts,
  getPost,
  deletePost,
  modifyPost,
  postByUsers,
} from "../controllers/post";

const router = new Router();

router.route("/user").get(verifyUser, postByUsers);
router
  .route("")
  .get(getAllPosts)
  .post(validatePostBody, verifyUser, addPost);
router
  .route("/:id")
  .get(getPost)
  .patch(validatePostBody, verifyUser, isOwner, modifyPost)
  .delete(verifyUser, isOwner, deletePost);

export default router;
