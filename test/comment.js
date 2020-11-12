/* eslint-disable no-underscore-dangle */
import { app, chai, expect, invalidToken } from "./helper/helper";

const registerUrl = "/api/v1/users/register";
const postUrl = "/api/v1/posts";
let validToken;
let validToken2;
let postId;
let commentId;
before(async () => {
  const userData = {
    email: "oluwaburna@example.com",
    password: "buhariole",
    name: "Damini Ogulu",
  };
  const userData2 = {
    email: "olamide@example.com",
    password: "buhariole",
    name: "Badoo Olamide Adedeji",
  };
  const postData = {
    title: "Drogba",
    body: "Joanna Jo Joona. Didier Drogba",
  };
  const commentData = {
    body: "comment to be deleted",
  };
  const res = await chai
    .request(app)
    .post(registerUrl)
    .send(userData);
  const res2 = await chai
    .request(app)
    .post(registerUrl)
    .send(userData2);
  validToken = res.body.data.token;
  validToken2 = res2.body.data.token;
  const postResponse = await chai
    .request(app)
    .post(postUrl)
    .set("authorization", `Bearer ${validToken}`)
    .send(postData);
  postId = postResponse.body.data._id;
  const commentRes = await chai
    .request(app)
    .post(`${postUrl}/${postId}/comments`)
    .set("authorization", `Bearer ${validToken}`)
    .send(commentData);
  commentId = commentRes.body.data._id;
});

describe("Comment on Post", () => {
  it("It should comment on post with valid token", (done) => {
    const comment = {
      body: "opor yeah",
    };
    chai
      .request(app)
      .post(`${postUrl}/${postId}/comments`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${validToken}`)
      .send(comment)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { status, message, data } = res.body;
        expect(status).to.equal("success");
        expect(message).to.equal("comment created successfully");
        expect(data).to.be.an("object");
        expect(data).to.have.property("body");
        expect(data).to.have.property("createdAt");
        expect(data).to.have.property("modifiedAt");
        done();
      });
  });
  it("It should not comment on post with invalid input and valid token", (done) => {
    const comment = {
      body: "",
    };
    chai
      .request(app)
      .post(`${postUrl}/${postId}/comments`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${validToken}`)
      .send(comment)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("It should not comment on post with valid input and invalid token", (done) => {
    const comment = {
      body: "opor yeah gan",
    };
    chai
      .request(app)
      .post(`${postUrl}/${postId}/comments`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${invalidToken}`)
      .send(comment)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
});

describe("Delete comment", () => {
  it("should not delete a comment with invalid token", (done) => {
    chai
      .request(app)
      .delete(`${postUrl}/${postId}/comments/${commentId}`)
      .set("authorization", `Bearer ${invalidToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("should not delete a comment with no token", (done) => {
    chai
      .request(app)
      .delete(`${postUrl}/${postId}/comments/${commentId}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("should not delete comment of invalid owner with valid token", (done) => {
    chai
      .request(app)
      .delete(`${postUrl}/${postId}/comments/${commentId}`)
      .set("authorization", `Bearer ${validToken2}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.equal(
          "Sorry on the owner can delete comment"
        );
        done();
      });
  });
  it("should delete comment of owner with valid token", (done) => {
    chai
      .request(app)
      .delete(`${postUrl}/${postId}/comments/${commentId}`)
      .set("authorization", `Bearer ${validToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { status, message } = res.body;
        expect(status).to.equal("success");
        expect(message).to.equal("succesfully deleted the comment");
        done();
      });
  });
});
