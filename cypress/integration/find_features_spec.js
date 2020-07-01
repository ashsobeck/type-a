/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("localhost:3000");
});

describe("finding things", () => {
  it("finds the word box", () => {
    assert(cy.get(".word-box"));
  });
  it("finds the typing box", () => {
    assert(cy.get("#typing-box"));
  });
});

describe("typing box functionality", () => {
  it("can type in the typing box", () => {
    cy.get("#typing-box").click().type("hello");
    cy.get("#typing-box").should("have.value", "hello");
  });

  it("doesn't register just a space character", () => {
    cy.get("#typing-box").click().type(" ");
    cy.get("#typing-box").should("have.value", "");
  });

  it("typing box clears after a space", () => {
    cy.get("#typing-box").click().type("word ");
    cy.get("#typing-box").should("have.value", "");
  });
});

// describe("word highlighting functionality", () => {
//   it.only("should have the first word highlighted initially", () => {
//     cy.get(".word-box").get("#word-0").should("have.css", ".word-highlighted");
//   });
// });
