export class Calendar {
  #calendar;

  constructor(page) {
    this.page = page;
    this.#calendar = this.page.locator(".col-sm-6");
  }
}
