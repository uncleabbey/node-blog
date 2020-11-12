import dotenv from "dotenv";
import getDb from "../src/helpers/getDb";
import { expect, invalidToken } from "./helper/helper";
import stripBearerToken from "../src/helpers/stripBearerToken";

dotenv.config();
describe("Get Database Function", () => {
  it("should get database for test", (done) => {
    const db = getDb("test");
    expect(db).to.equal("mongodb://localhost/blog_test");
    done();
  });
  it("should get database for development", (done) => {
    const db = getDb("development");
    expect(db).to.equal("mongodb://localhost/blog-dev");
    done();
  });
  it("should get database for production", (done) => {
    const db = getDb("production");
    expect(db).to.equal("mongodb://localhost/blog");
    done();
  });
  it("should get throw error if nothing is supplied", (done) => {
    // const db = getDb("nothing");
    expect(() => getDb("nothing")).to.throw("wrong env");
    done();
  });
});

describe("StripBearerToken Function", () => {
  it("should get token without bearer", (done) => {
    const token = stripBearerToken(invalidToken);
    expect(token).to.be.a("string");
    done();
  });
});
