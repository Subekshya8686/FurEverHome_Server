// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const app = require("../index"); // Your Express app
// const Pet = require("../models/pet");
// const { expect } = chai;

// chai.use(chaiHttp);

// describe("CRUD Operations for Pets", () => {
//   let sandbox;

//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   it("POST /api/v1/pet/create should create a new pet", (done) => {
//     sandbox.stub(Pet.prototype, "save").resolves({
//       _id: "mock-pet-id",
//       name: "Buddy",
//       type: "Dog",
//       breed: "Labrador",
//       age: 2,
//       weight: 25,
//       dateOfBirth: "2019-05-01",
//       adoptionStatus: "Available",
//     });

//     chai
//       .request(app)
//       .post("/api/v1/pet/create")
//       .send({
//         name: "Buddy",
//         type: "Dog",
//         breed: "Labrador",
//         age: 2,
//         weight: 25,
//         dateOfBirth: "2019-05-01",
//         adoptionStatus: "Available",
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property(
//           "message",
//           "Pet created successfully"
//         );
//         expect(res.body.data).to.have.property("_id").eql("mock-pet-id");
//         done();
//       });
//   });


//   it("GET /api/v1/pet/get/:id should get a pet by ID", (done) => {
//     sandbox.stub(Pet, "findById").resolves({
//       _id: "mock-pet-id",
//       name: "Buddy",
//       type: "Dog",
//       breed: "Labrador",
//       age: 2,
//       weight: 25,
//       adoptionStatus: "Available",
//     });

//     chai
//       .request(app)
//       .get("/api/v1/pet/get/mock-pet-id")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property("_id", "mock-pet-id");
//         expect(res.body).to.have.property("name", "Buddy");
//         done();
//       });
//   });

//   it("PUT /api/v1/pet/update/:id should update a pet by ID", (done) => {
//     sandbox.stub(Pet, "findByIdAndUpdate").resolves({
//       _id: "mock-pet-id",
//       name: "Buddy",
//       type: "Dog",
//       breed: "Labrador",
//       age: 3, // Updated age
//       weight: 26, // Updated weight
//       adoptionStatus: "Available",
//     });

//     chai
//       .request(app)
//       .put("/api/v1/pet/update/mock-pet-id")
//       .send({ age: 3, weight: 26 })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property("age", 3);
//         expect(res.body).to.have.property("weight", 26);
//         done();
//       });
//   });

//   it("DELETE /api/v1/pet/delete/:id should delete a pet by ID", (done) => {
//     sandbox.stub(Pet, "findByIdAndDelete").resolves({
//       _id: "mock-pet-id",
//       name: "Buddy",
//       type: "Dog",
//       breed: "Labrador",
//       age: 2,
//       weight: 25,
//       adoptionStatus: "Available",
//     });

//     chai
//       .request(app)
//       .delete("/api/v1/pet/delete/mock-pet-id")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property(
//           "message",
//           "Pet deleted successfully"
//         );
//         done();
//       });
//   });
// });
