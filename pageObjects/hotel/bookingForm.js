export class BookingForm {
  #form;

  constructor(page) {
    this.page = page;
    this.#form = this.page.locator(".col-sm-4");
  }
}
