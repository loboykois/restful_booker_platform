export class Calendar {
  #page;
  #calendar;

  constructor(page) {
    this.#page = page;
    this.#calendar = this.#page.locator(".col-sm-6");
  }

  async isVisible() {
    return await this.#calendar.isVisible();
  }
  getLocator() {
    return this.#calendar;
  }
}
