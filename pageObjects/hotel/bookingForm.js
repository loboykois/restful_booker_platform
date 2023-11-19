export class BookingForm {
  #form;

  constructor(roomContainer) {
    this.#form = roomContainer.locator(".col-sm-4");
  }

  async enterFirstName(value) {
    await this.#form.locator(".room-firstname").fill(value);
  }
  async enterLastName(value) {
    await this.#form.locator(".room-lastname").fill(value);
  }
  async enterEmail(value) {
    await this.#form.locator(".room-email").fill(value);
  }
  async enterPhone(value) {
    await this.#form.locator(".room-phone").fill(value);
  }

  async actions() {
    return {
      book: await this.#form.locator("button:has-text('Book')").click(),
      cancel: await this.#form.locator("button:has-text('Cancel')").click(),
    };
  }

  async confirmBooking() {
    await this.#form.locator("button:has-text('Book')").click();
  }

  async cancelBooking() {
    await this.#form.locator("button:has-text('Cancel')").click();
  }

  async getConfirmationWindow() {
    return await this.#form.locator(".confirmation-modal");
  }

  async getErrorMessageType() {
    return this.#form.locator(".alert-danger > p");
  }
}
