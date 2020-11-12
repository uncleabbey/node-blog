/**
 * @swagger
 *  components:
 *    schemas:
 *      Comment:
 *        type: object
 *        properties:
 *          body:
 *            type: string
 */
/**
 * @swagger
 *  path:
 *    /posts/{id}/comments:
 *      post:
 *        security:
 *          - bearerAuth: []
 *        summary: edit a comment
 *        tags:
 *          - Comment
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
 *                $ref: '#/components/schemas/Comment'
 *        responses:
 *          202:
 *            description: The modified post
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Comment'
 *    /posts/{id}/comments/{commentId}:
 *      delete:
 *        security:
 *          - bearerAuth: []
 *        summary: delete a comment
 *        tags:
 *          - Comment
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Post Id
 *          - in: path
 *            name: commentId
 *            schema:
 *              tpe: string
 *            required: true
 *            description: The comment ID
 *        responses:
 *          204:
 *            description: The deleted comments
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Post'
 */

import { Router } from "express";
import { addComment, deleteComment } from "../controllers/comment";
import verifyUser from "../middleware/verifyUser";
import verifyCommentOwner from "../middleware/verifyCommentOwner";
import { validateCommentBody } from "../middleware/validators";

const router = new Router();

router
  .route("/:id/comments")
  .post(validateCommentBody, verifyUser, addComment);
router
  .route("/:id/comments/:commendtId")
  .delete(verifyUser, verifyCommentOwner, deleteComment);

export default router;
