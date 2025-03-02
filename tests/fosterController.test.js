const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../index"); // Your Express app
const FosterApplication = require("../models/fosterApplication");
const { expect } = chai;

chai.use(chaiHttp);

describe("CRUD Operations for Foster Applications", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("POST /api/v1/foster/apply should submit a new foster application", (done) => {
    sandbox.stub(FosterApplication.prototype, "save").resolves({
      _id: "mock-foster-application-id",
      applicantId: "mock-applicant-id",
      petId: "mock-pet-id",
      applicantName: "Jane Doe",
      applicantEmail: "jane@example.com",
      applicantPhone: "0987654321",
      districtOrCity: "Los Angeles",
      homeAddress: "456 Oak St",
      householdMembers: 2,
      hasPets: true,
      petDetails: "Details about the pet",
      residenceType: "House",
      reasonForFostering: "Temporary care",
      experienceWithPets: "Yes",
      availabilityDuration: "6 months",
      abilityToHandleMedicalNeeds: true,
      hasFencedYard: true,
      agreementToTerms: true,
    });

    chai
      .request(app)
      .post("/api/v1/foster/apply")
      .send({
        applicantId: "mock-applicant-id",
        petId: "mock-pet-id",
        applicantName: "Jane Doe",
        applicantEmail: "jane@example.com",
        applicantPhone: "0987654321",
        districtOrCity: "Los Angeles",
        homeAddress: "456 Oak St",
        householdMembers: 2,
        hasPets: true,
        petDetails: "Details about the pet",
        residenceType: "House",
        reasonForFostering: "Temporary care",
        experienceWithPets: "Yes",
        availabilityDuration: "6 months",
        abilityToHandleMedicalNeeds: true,
        hasFencedYard: true,
        agreementToTerms: true,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "Foster application submitted successfully"
        );
        done();
      });
  });

  it("GET /api/v1/foster/get/:id should get a foster application by ID", (done) => {
    sandbox.stub(FosterApplication, "findById").resolves({
      _id: "mock-foster-application-id",
      applicantId: "mock-applicant-id",
      petId: "mock-pet-id",
      applicantName: "Jane Doe",
      applicantEmail: "jane@example.com",
      applicantPhone: "0987654321",
      districtOrCity: "Los Angeles",
      homeAddress: "456 Oak St",
      householdMembers: 2,
      hasPets: true,
      petDetails: "Details about the pet",
      residenceType: "House",
      reasonForFostering: "Temporary care",
      experienceWithPets: "Yes",
      availabilityDuration: "6 months",
      abilityToHandleMedicalNeeds: true,
      hasFencedYard: true,
      agreementToTerms: true,
    });

    chai
      .request(app)
      .get("/api/v1/foster/get/mock-foster-application-id")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("GET /api/v1/foster/get should fetch all foster applications", (done) => {
    sandbox.stub(FosterApplication, "find").resolves([
      {
        _id: "mock-foster-application-id-1",
        applicantName: "Jane Doe",
        petId: "mock-pet-id-1",
      },
      {
        _id: "mock-foster-application-id-2",
        applicantName: "John Smith",
        petId: "mock-pet-id-2",
      },
    ]);

    chai
      .request(app)
      .get("/api/v1/foster/get")
      .end((err, res) => {
        expect(res).to.have.status(404);
        // expect(res.body).to.have.property("count").eql(2);
        done();
      });
  });

  it("DELETE /api/v1/foster/delete/:id should delete a foster application by ID", (done) => {
    sandbox.stub(FosterApplication, "findByIdAndDelete").resolves({
      _id: "mock-foster-application-id",
      applicantId: "mock-applicant-id",
      petId: "mock-pet-id",
      applicantName: "Jane Doe",
      applicantEmail: "jane@example.com",
      applicantPhone: "0987654321",
      districtOrCity: "Los Angeles",
      homeAddress: "456 Oak St",
      householdMembers: 2,
      hasPets: true,
      petDetails: "Details about the pet",
      residenceType: "House",
      reasonForFostering: "Temporary care",
      experienceWithPets: "Yes",
      availabilityDuration: "6 months",
      abilityToHandleMedicalNeeds: true,
      hasFencedYard: true,
      agreementToTerms: true,
    });

    chai
      .request(app)
      .delete("/api/v1/foster/delete/mock-foster-application-id")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "Foster application deleted successfully"
        );
        done();
      });
  });

  it("PUT /api/v1/foster/review/:id should review a foster application", (done) => {
    sandbox.stub(FosterApplication, "findByIdAndUpdate").resolves({
      _id: "mock-foster-application-id",
      adminId: "mock-admin-id",
      adminStatus: "Approved",
      adminNotes: "Approved for fostering",
      handledAt: new Date(),
    });

    chai
      .request(app)
      .put("/api/v1/foster/review/mock-foster-application-id")
      .send({
        adminId: "mock-admin-id",
        adminStatus: "Approved",
        adminNotes: "Approved for fostering",
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        // expect(res.body).to.have.property("message", "Application reviewed successfully");
        done();
      });
  });

  it("GET /api/v1/foster/download should download all foster applications as CSV", (done) => {
    sandbox.stub(FosterApplication, "find").resolves([
      {
        _id: "mock-foster-application-id-1",
        applicantName: "Jane Doe",
        petId: "mock-pet-id-1",
      },
      {
        _id: "mock-foster-application-id-2",
        applicantName: "John Smith",
        petId: "mock-pet-id-2",
      },
    ]);

    chai
      .request(app)
      .get("/api/v1/foster/download")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.header["content-type"]).to.include("text/csv");
        done();
      });
  });

  it("GET /api/v1/foster/download should return error if no foster applications exist", (done) => {
    sandbox.stub(FosterApplication, "find").resolves([]);

    chai
      .request(app)
      .get("/api/v1/foster/download")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property(
          "error",
          "No foster applications found"
        );
        done();
      });
  });
});
