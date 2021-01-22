import dotenv from "dotenv";
import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import "chai/register-should";
import app from "../../src/app";
import google from "./mockProfile";

dotenv.config();
chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;
chai.should();
const invalidToken = process.env.INVALID_TOKEN;
const invalidToken2 = process.env.INVALID_TOKEN_TWO;

export {
  chai,
  app,
  expect,
  invalidToken,
  invalidToken2,
  sinon,
  google,
};
