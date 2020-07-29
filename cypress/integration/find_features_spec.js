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

  it("typing box clears after a word plus a space", () => {
    cy.get("#typing-box").click().type("word ");
    cy.get("#typing-box").should("have.value", "");
  });
});

describe("word highlighting functionality", () => {
  it("should have the first word highlighted initially", () => {
    cy.get(".word-box").get("#word-0").should("have.class", "word-highlighted");
  });

  it("should move the highlight to the next word after a word plus a space ", () => {
    cy.get(".word-box").get("#word-0").should("have.class", "word-highlighted");
    cy.get("#typing-box").click().type("word ");
    cy.get(".word-box")
      .get("#word-0")
      .should("not.have.class", "word-highlighted");
    cy.get(".word-box").get("#word-1").should("have.class", "word-highlighted");
    cy.get("#typing-box").should("have.value", "");
  });
});

describe("find wpm and acc", () => {
  it.only("should find the wpm box", () => {
    cy.get("#wpm").should("have.text", "wpm | -");
  });
  it("should find the acc box", () => {
    cy.get("#acc").should("have.text", "0 | acc");
    cy.get("#acc").should("have")
  });
});
