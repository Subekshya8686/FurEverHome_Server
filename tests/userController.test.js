// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const app = require("../index"); // Your Express app
// const User = require("../models/user");

// const bcrypt = require("bcryptjs"); // Import bcrypt
// const jwt = require("jsonwebtoken"); // Import jwt
// const { expect } = chai;

// chai.use(chaiHttp);

// describe("CRUD Operations for Users", () => {
//   let sandbox;

//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   it("POST /api/v1/user should create a new user", (done) => {
//     // Stubbing the save method to mock the creation of a new user.
//     sandbox.stub(User.prototype, "save").resolves({
//       _id: "mock-user-id",
//       name: "Subekshya Kayastha",
//       email: "subekshya@example.com",
//       role: "Admin",
//       phone: "1234567890",
//       address: "123 Main St",
//       dateOfBirth: "1990-01-01",
//       image: "image.jpg", // Mocked image filename
//     });

//     chai
//       .request(app)
//       .post("/api/v1/user")
//       .send({
//         name: "Subekshya Kayastha",
//         email: "subekshya@example.com",
//         password: "password123",
//         phone: "1234567890",
//         address: "123 Main St",
//         dateOfBirth: "1990-01-01",
//         role: "Admin",
//       })
//       .end((err, res) => {
//         // Checking if the response has the correct status and message
//         expect(res).to.have.status(500);
 
//         done();
//       });
//   });

//   it("GET /api/v1/user should get all users", (done) => {
//     sandbox.stub(User, "find").resolves([
//       {
//         _id: "mock-user-id-1",
//         name: "Subekshya Kayastha",
//         email: "subekshya@example.com",
//         role: "Admin",
//       },
//       {
//         _id: "mock-user-id-2",
//         name: "John Doe",
//         email: "john@example.com",
//         role: "User",
//       },
//     ]);

//     chai
//       .request(app)
//       .get("/api/v1/user")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property("success", true);
//         expect(res.body.data).to.be.an("array").that.is.not.empty;
//         expect(res.body.data).to.have.lengthOf(2);
//         done();
//       });
//   });

//   it("GET /api/v1/user/:id should get a user by ID", (done) => {
//     sandbox.stub(User, "findById").resolves({
//       _id: "mock-user-id",
//       name: "Subekshya Kayastha",
//       email: "subekshya@example.com",
//       role: "Admin",
//     });

//     chai
//       .request(app)
//       .get("/api/v1/user/mock-user-id")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property("_id", "mock-user-id");
//         expect(res.body).to.have.property("name", "Subekshya Kayastha");
//         done();
//       });
//   });

//   it("PUT /api/v1/user/update/:id should update a user by ID", (done) => {
//     sandbox.stub(User, "findByIdAndUpdate").resolves({
//       _id: "mock-user-id",
//       name: "Subekshya Kayastha",
//       email: "subekshya@example.com",
//       role: "Admin",
//       phone: "9876543210", // Updated phone number
//     });

//     chai
//       .request(app)
//       .put("/api/v1/user/update/mock-user-id")
//       .send({ phone: "9876543210" })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property("phone", "9876543210");
//         done();
//       });
//   });

//   it("DELETE /api/v1/user/:id should delete a user by ID", (done) => {
//     sandbox.stub(User, "findByIdAndDelete").resolves({
//       _id: "mock-user-id",
//       name: "Subekshya Kayastha",
//       email: "subekshya@example.com",
//       role: "Admin",
//     });

//     chai
//       .request(app)
//       .delete("/api/v1/user/mock-user-id")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property(
//           "message",
//           "User deleted successfully"
//         );
//         done();
//       });
//   });

//   it("POST /api/v1/user/login should login a user and return a token", (done) => {
//     sandbox.stub(User, "findOne").resolves({
//       _id: "mock-user-id",
//       email: "subekshya@example.com",
//       password: "$2a$10$hashOfPassword", // Mocked hashed password
//       role: "Admin",
//     });

//     sandbox.stub(bcrypt, "compare").resolves(true); // Mock password comparison

//     chai
//       .request(app)
//       .post("/api/v1/user/login")
//       .send({ email: "subekshya@example.com", password: "password123" })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property("message", "Login successful");
//         expect(res.body).to.have.property("token");
//         done();
//       });
//   });

//   it("POST /api/v1/user/login should return error for invalid credentials", (done) => {
//     sandbox.stub(User, "findOne").resolves(null); // Mock user not found

//     chai
//       .request(app)
//       .post("/api/v1/user/login")
//       .send({ email: "nonexistent@example.com", password: "wrongPassword" })
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property("error", "Invalid Credentials");
//         done();
//       });
//   });
// });
