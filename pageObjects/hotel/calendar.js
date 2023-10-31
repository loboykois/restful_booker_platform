import moment from "moment/moment";

export class Calendar {
  #calendar;

  constructor(page) {
    this.page = page;
    this.#calendar = this.page.locator(".col-sm-6");
  }

  async dateController() {
    return {
      today: await this.page.locator("button:has-text('Today')").click(),
      back: await this.page.locator("button:has-text('Back')").click(),
      next: await this.page.locator("button:has-text('Next')").click(),
    };
  }

  async getCurrentDate() {
    await this.page.locator(".rbc-toolbar-label").textContent();
  }

  async selectDateRangeForBooking(start, end) {}
}
