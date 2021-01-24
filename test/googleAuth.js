// import nock from "nock";
// import { app, chai, expect } from "./helper/helper";
import { expect } from "./helper/helper";

// const url = "/api/v1/users/google/callback";
// const baseUrl = "http://localhost:3000";

describe("Google Aunthentication routes", () => {
  // beforeEach(() => {
  //   const serverResponse = {
  //     status: "success",
  //     message: "login was successful",
  //     data: {
  //       user: {
  //         _id: "234errrnrnrnncncn",
  //         name: "Kayode Gabriel",
  //         email: "kayodegabriel@gmail.com",
  //         isAdmin: false,
  //       },
  //     },
  //   };
  //   nock(baseUrl).get(url).reply(201, serverResponse);
  // });
  // it("should accept a response from google", (done) => {
  //   chai
  //     .request(app)
  //     .get(url)
  //     .end((err, res) => {
  //       // eslint-disable-next-line no-console
  //       console.log(res.status);
  //       console.log(res.body);
  //       expect(2 + 2).to.equal(4);
  //       done(err);
  //     });
  // });
  it('should behave. as a placeholder', function() {
    expect(2 + 2).to.equal(4)
  });
});
