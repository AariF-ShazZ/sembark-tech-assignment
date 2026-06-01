describe("Meesho E-Commerce App", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("shows products on the home page", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .should("have.length.greaterThan", 0);
  });

  it("shows category filter buttons", () => {
    cy.get('[aria-label="Filter by category"]', { timeout: 10000 }).should(
      "exist"
    );
    cy.get('[aria-label="Filter by category"] button').should(
      "have.length.greaterThan",0);
  });
  it("adds category to URL when filter is clicked", () => {
    cy.get('[aria-label="Filter by category"] button', {
      timeout: 10000,
    })
      .first()
      .click();

    cy.url().should("include", "categories=");
  });
  it("keeps filter in URL after page refresh", () => {
    cy.get('[aria-label="Filter by category"] button', {
      timeout: 10000,
    })
      .first()
      .click();

    cy.url().should("include", "categories=");

    cy.reload();

    cy.url().should("include", "categories=");
    cy.get('[aria-pressed="true"]').should("exist");
  });
  it("clears filters when clear button is clicked", () => {
    cy.get('[aria-label="Filter by category"] button', {
      timeout: 10000,
    })
      .first()
      .click();

    cy.url().should("include", "categories=");

    cy.get('[aria-label="Clear all filters"]').click();

    cy.url().should("not.include", "categories=");
  });
  it("updates URL when sort option is changed", () => {
    cy.get("#sort-select").select("price_asc");
    cy.url().should("include", "sort=price_asc");

    cy.get("#sort-select").select("price_desc");
    cy.url().should("include", "sort=price_desc");
  });

  it("opens product detail page when a product card is clicked", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .first()
      .click();
    cy.url().should("include", "/product/");
    cy.url().should("include", "/details");
    cy.get("h1").should("exist");
  });
  it("shows title, description, price and add to cart button on detail page", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .first()
      .click();
    cy.get("h1").should("exist");
    cy.get("p.text-gray-500").should("exist");
    cy.get("p.text-blue-600").should("exist");
    cy.get("button").contains(/add to cart/i).should("exist");
  });
  it("shows confirmation text after adding to cart", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .first()
      .click();

    cy.get("button").contains(/add to cart/i).click();
    cy.get("button").contains(/added to cart/i).should("exist");
  });
  it("goes back to home page when back button is clicked", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .first()
      .click();

    cy.get('[aria-label="Go back"]').click();

    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("shows the item on cart page after adding to cart", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .first()
      .click();

    cy.get("button").contains(/add to cart/i).click();
    cy.visit("/cart");
    cy.contains("Your cart is empty").should("not.exist");
    cy.get('[aria-label="Cart items"]').children().should("have.length.greaterThan", 0);
  });
  it("shows the correct number of items in cart", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .first()
      .click();
    cy.get("button").contains(/add to cart/i).click();
    cy.visit("/cart");
    cy.contains("1 item").should("exist");
  });
  it("removes item from cart and shows empty state", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .first()
      .click();
    cy.get("button").contains(/add to cart/i).click();
    cy.visit("/cart");
    cy.get('[aria-label="Cart items"]').children().should("have.length", 1);
    cy.get('[aria-label*="Remove"]').first().click();

    cy.contains("Your cart is empty").should("exist");
  });
  it("clears all items when clear cart is clicked", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .first()
      .click();

    cy.get("button").contains(/add to cart/i).click();

    cy.visit("/cart");

    cy.get('[aria-label="Remove all items from cart"]').click();

    cy.contains("Your cart is empty").should("exist");
  });

  it("cart still has items after page is reloaded", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .first()
      .click();

    cy.get("button").contains(/add to cart/i).click();
    cy.reload();
    cy.visit("/cart");
    cy.contains("Your cart is empty").should("not.exist");
    cy.get('[aria-label="Cart items"]').children().should("have.length.greaterThan", 0);
  });
  it("navigates back to home from empty cart page", () => {
    cy.visit("/cart");
    cy.get('[aria-label="Continue shopping"]').click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });
  it("shows order summary with total price", () => {
    cy.get('[aria-label="Product listing"]', { timeout: 15000 })
      .children()
      .first()
      .click();
    cy.get("button").contains(/add to cart/i).click();
    cy.visit("/cart");
    cy.contains("Order summary").should("exist");
    cy.contains("Total").should("exist");
    cy.contains("Free").should("exist");
  });
});