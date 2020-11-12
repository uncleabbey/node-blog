import dotenv from "dotenv";
import chai from "chai";
import chaiHttp from "chai-http";
import "chai/register-should";
import app from "../../src/app";

dotenv.config();
chai.use(chaiHttp);
const { expect } = chai;
chai.should();
const invalidToken = process.env.INVALID_TOKEN;

export { chai, app, expect, invalidToken };
