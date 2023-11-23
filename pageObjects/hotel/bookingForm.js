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

  async fillForm({ firstName, lastName, email = "", phone = "" }) {
    await this.#form.locator(".room-firstname").fill(firstName ?? "");
    await this.#form.locator(".room-lastname").fill(lastName ?? "");
    await this.#form.locator(".room-email").fill(email);
    await this.#form.locator(".room-phone").fill(phone);
  }

  async confirmBooking() {
    await this.#form.locator("button:has-text('Book')").click();
  }

  async cancelBooking() {
    await this.#form.locator("button:has-text('Cancel')").click();
  }

  async getConfirmationWindow() {
    return this.#form.page().locator(".confirmation-modal");
  }

  async getErrorMessageType() {
    return this.#form.locator(".alert-danger > p");
  }
}
