import { app, chai, expect, invalidToken } from "./helper/helper";

const registerUrl = "/api/v1/users/register";
const loginUrl = "/api/v1/users/login";
const getUserUrl = "/api/v1/users/me";
let validToken;

before(async () => {
  const data = {
    email: "davido@example.com",
    password: "buhariole",
    name: "Davido",
  };
  const res = await chai.request(app).post(registerUrl).send(data);
  validToken = res.body.data.token;
});
describe("Register Routes", () => {
  it("Should register valid user input", (done) => {
    const userData = {
      email: "daddyShowkey@example.com",
      password: "buhariole",
      name: "Daddy Showkey",
    };
    chai
      .request(app)
      .post(registerUrl)
      .set("Accept", "application/json")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { status, message, data } = res.body;
        const { token, user } = data;
        expect(status).to.equal("success");
        expect(message).to.equal("user created successfully");
        expect(token).to.be.a("string");
        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user).to.have.property("email");
        expect(user).to.have.property("name");
        expect(user).to.have.property("isAdmin");
        done();
      });
  });
  it("Should return error for invalid user input", (done) => {
    const data = {
      email: "",
      password: "buhariole",
      name: "Daddy Showkey",
    };
    chai
      .request(app)
      .post(registerUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("Should return error if user has registered before", (done) => {
    const data = {
      email: "davido@example.com",
      password: "buhariole",
      name: "Davido",
    };
    chai
      .request(app)
      .post(registerUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.equal("User already exist");
        done();
      });
  });
});

describe("Login User Routes", () => {
  it("Login user with valid inputs", (done) => {
    const userData = {
      email: "davido@example.com",
      password: "buhariole",
    };
    chai
      .request(app)
      .post(loginUrl)
      .set("Accept", "application/json")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { status, message, data } = res.body;
        const { token, user } = data;
        expect(status).to.equal("success");
        expect(message).to.equal("login was successful");
        expect(token).to.be.a("string");
        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user).to.have.property("email");
        expect(user).to.have.property("name");
        expect(user).to.have.property("isAdmin");
        done();
      });
  });
  it("should return error for invalid password", (done) => {
    const data = {
      email: "davido@example.com",
      password: "buhariol",
    };
    chai
      .request(app)
      .post(loginUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.equal("Invalid email or Password");
        done();
      });
  });
  it("should error for invalid inputs", (done) => {
    const data = {
      email: "",
      password: "buhariol",
    };
    chai
      .request(app)
      .post(loginUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
});

describe("get Users", () => {
  it("should get user details from valid token", (done) => {
    chai
      .request(app)
      .get(getUserUrl)
      .set("authorization", `Bearer ${validToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { status, data } = res.body;
        expect(status).to.equal("success");
        expect(data).to.be.an("object");
        expect(data).to.have.property("_id");
        expect(data).to.have.property("email");
        expect(data).to.have.property("name");
        expect(data).to.have.property("isAdmin");
        done();
      });
  });
  it("should get error from no token", (done) => {
    chai
      .request(app)
      .get(getUserUrl)
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("should get error from invalid token", (done) => {
    chai
      .request(app)
      .get(getUserUrl)
      .set("authorization", `Bearer ${invalidToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
});
