/* eslint-disable no-underscore-dangle */
import mongoose from "mongoose";
import {
  app,
  chai,
  expect,
  invalidToken,
  sinon,
} from "./helper/helper";
import Post from "../src/models/post";

const registerUrl = "/api/v1/users/register";
const postUrl = "/api/v1/posts";
let validToken;
let validToken2;
let postId;
let postId2;
before(async () => {
  const userData = {
    email: "wizkid@example.com",
    password: "buhariole",
    name: "Wizkid Ayo Balogun",
  };
  const userData2 = {
    email: "olamidebadoom@example.com",
    password: "buhariole",
    name: "Badoo Olamide Adedeji",
  };
  const postData = {
    title: "Drogba",
    body: "Joanna Jo Joona. Didier Drogba",
  };
  const postData2 = {
    title: "post to be editted and deleted",
    body: "Joanna Jo Joona. Didier Drogba",
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
  const postResponse2 = await chai
    .request(app)
    .post(postUrl)
    .set("authorization", `Bearer ${validToken}`)
    .send(postData2);
  postId = postResponse.body.data._id;
  postId2 = postResponse2.body.data._id;
});

describe("Add Post route", () => {
  it("add post with valid inputs and token", (done) => {
    const postData = {
      title: "Something Nice",
      body: "Something About a Kingdom",
    };
    chai
      .request(app)
      .post(postUrl)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${validToken}`)
      .send(postData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { status, message, data } = res.body;
        expect(status).to.equal("success");
        expect(message).to.equal("post added successfully");
        expect(data).to.be.an("object");
        expect(data).to.have.property("_id");
        expect(data).to.have.property("title");
        expect(data).to.have.property("body");
        expect(data).to.have.property("author");
        expect(data).to.have.property("createdAt");
        expect(data).to.have.property("modifiedAt");
        done();
      });
  });
  it("add post with valid inputs and invalid token", (done) => {
    const data = {
      title: "Something Nice",
      body: "Something About a Kingdom",
    };
    chai
      .request(app)
      .post(postUrl)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${invalidToken}`)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("add post with valid inputs and no token", (done) => {
    const data = {
      title: "Something Nice",
      body: "Something About a Kingdom",
    };
    chai
      .request(app)
      .post(postUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("should not add post with invalid inputs and valid token", (done) => {
    const data = {
      title: "",
      body: "Something About a Kingdom",
    };
    chai
      .request(app)
      .post(postUrl)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${validToken}`)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("internal server error for adding post to database", (done) => {
    const stub = sinon
      .stub(Post.prototype, "save")
      .callsFake(() =>
        Promise.reject(new Error("Internal server error"))
      );
    const data = {
      title: "davidor@example.com",
      body: "buhariole",
    };
    chai
      .request(app)
      .post(postUrl)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${validToken}`)
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        const { status } = res.body;
        expect(status).to.equal("error");
        done(err);
        stub.restore();
      });
  });
});

describe("Get post route", () => {
  it("Get All post route", (done) => {
    chai
      .request(app)
      .get(postUrl)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { status, message, data } = res.body;
        expect(status).to.equal("success");
        expect(message).to.equal("all post retrieved successfully");
        expect(data).to.be.an("array");
        done();
      });
  });
  it("Internal server error for Get All post route", (done) => {
    const stub = sinon
      .stub(mongoose.Model, "find")
      .callsFake(() =>
        Promise.reject(new Error("Internal server error"))
      );
    chai
      .request(app)
      .get(postUrl)
      .end((err, res) => {
        expect(res).to.have.status(500);
        const { status } = res.body;
        expect(status).to.equal("error");
        done();
        stub.restore();
      });
  });

  it("Get one post", (done) => {
    chai
      .request(app)
      .get(`${postUrl}/${postId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { status, message, data } = res.body;
        expect(status).to.equal("success");
        expect(message).to.equal("succesfully retrieved post");
        expect(data).to.be.an("object");
        done();
      });
  });
  it("Get error when for invalid postid", (done) => {
    chai
      .request(app)
      .get(`${postUrl}/5fa996a0ec9008047ccaa1bd`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("Internal server error for Get one post route", (done) => {
    const stub = sinon
      .stub(mongoose.Model, "findOne")
      .callsFake(() =>
        Promise.reject(new Error("Internal server error"))
      );
    chai
      .request(app)
      .get(`${postUrl}/${postId}`)
      .end((err, res) => {
        expect(res).to.have.status(500);
        const { status } = res.body;
        expect(status).to.equal("error");
        done();
        stub.restore();
      });
  });
});

describe("Modify Posts", () => {
  it("modify with post with valid Token", (done) => {
    const postData = {
      title: "Heart Matters",
      body: "Love is a beautiful something",
    };
    chai
      .request(app)
      .patch(`${postUrl}/${postId2}`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${validToken}`)
      .send(postData)
      .end((err, res) => {
        expect(res).to.have.status(202);
        const { status, message, data } = res.body;
        expect(status).to.equal("success");
        expect(message).to.equal("succesfully modified the post");
        expect(data).to.be.an("object");
        expect(data.title).to.be.equal(postData.title);
        done();
      });
  });
  it("should not modify with post with invalid Token", (done) => {
    const postData = {
      title: "Heart Matters",
      body: "Love is a beautiful something",
    };
    chai
      .request(app)
      .patch(`${postUrl}/${postId2}`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${invalidToken}`)
      .send(postData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("should not modify with post with no Token", (done) => {
    const postData = {
      title: "Heart Matters",
      body: "Love is a beautiful something",
    };
    chai
      .request(app)
      .patch(`${postUrl}/${postId2}`)
      .set("Accept", "application/json")
      .send(postData)
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("should not modified post with valid inputs and invalid owner", (done) => {
    const data = {
      title: "Something Nice",
      body: "Something About a Kingdom",
    };
    chai
      .request(app)
      .patch(`${postUrl}/${postId2}`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${validToken2}`)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("should not modified post with valid inputs and valid owner and invalid postid", (done) => {
    const data = {
      title: "Something Nice",
      body: "Something About a Kingdom",
    };
    chai
      .request(app)
      .patch(`${postUrl}/5fa996a0ec9008047ccaa1bd`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${validToken}`)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(404);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("should not modified post and invalid postid", (done) => {
    const data = {
      title: "Something Nice",
      body: "Something About a Kingdom",
    };
    chai
      .request(app)
      .patch(`${postUrl}/3eee3`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${validToken}`)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.an("object");
        done();
      });
  });
});

describe("Delete Article Endpoint", () => {
  it("should delete a post with valid token", (done) => {
    chai
      .request(app)
      .delete(`${postUrl}/${postId2}`)
      .set("authorization", `Bearer ${validToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { status, message } = res.body;
        expect(status).to.equal("success");
        expect(message).to.equal("succesfully deleted the post");
        done();
      });
  });
  it("should not delete a post with invalid token", (done) => {
    chai
      .request(app)
      .delete(`${postUrl}/${postId2}`)
      .set("authorization", `Bearer ${invalidToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("should not delete a post with no token", (done) => {
    chai
      .request(app)
      .delete(`${postUrl}/${postId2}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
});

describe("Get Post by User endpoint", () => {
  it("should return list of post by valid user token", (done) => {
    chai
      .request(app)
      .get(`${postUrl}/user`)
      .set("authorization", `Bearer ${validToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { status, message, data } = res.body;
        expect(status).to.equal("success");
        expect(message).to.equal(
          "Successfully retrieved post by user"
        );
        expect(data).to.be.an("array");
        done();
      });
  });
  it("should return list of post  with invalid token", (done) => {
    chai
      .request(app)
      .get(`${postUrl}/user`)
      .set("authorization", `Bearer ${invalidToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("sshould return list of post with no token", (done) => {
    chai
      .request(app)
      .get(`${postUrl}/user`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("Internal server error for Get All post by user route", (done) => {
    const stub = sinon
      .stub(mongoose.Model, "find")
      .callsFake(() =>
        Promise.reject(new Error("Internal server error"))
      );
    chai
      .request(app)
      .get(`${postUrl}/user`)
      .set("authorization", `Bearer ${validToken}`)
      .end((err, res) => {
        expect(res).to.have.status(500);
        const { status } = res.body;
        expect(status).to.equal("error");
        done();
        stub.restore();
      });
  });
});
