import { chai, app, expect } from "./helper/helper";

describe("Index.js", () => {
  it("should display welcome message", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { data, status } = res.body;
        expect(status).to.equal("success");
        expect(data).to.be.an("object");
        expect(data.message).to.be.equal("Welcome to Teamwork API");
        done();
      });
  });
  it("should display Error if route was not found", (done) => {
    chai
      .request(app)
      .get("/status")
      .end((err, res) => {
        expect(res).to.have.status(404);
        const { error, status } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.equal("404 Page Not Found");
        done();
      });
  });
});
