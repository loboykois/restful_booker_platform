export class BookingForm {
  #page;
  #form;

  constructor(page) {
    this.#page = page;
    this.#form = this.#page.locator(".col-sm-4");
  }

  getLocator() {
    return this.#form;
  }
}
