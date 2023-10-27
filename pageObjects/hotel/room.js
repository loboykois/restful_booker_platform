import { Calendar } from "./calendar";
import { BookingForm } from "./bookingForm";
import { ReservationPage } from "../basePage/reservationPage";

export class Room extends ReservationPage {
  constructor(page) {
    super(page);
    this.page = page;
    this.info = page.locator(".hotel-room-info");
    this.details = page.locator(".col-sm-7");
    this.calendar = new Calendar(page);
    this.form = new BookingForm(page);
  }

  async book() {
    await this.details.locator("button:has-text('Book this room')").click();
  }

  async sendResponse(response) {
    await this.page.route("https://automationintesting.online/room/", (route) =>
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify(response),
      })
    );

    await this.page.goto("/");
  }

  // async sendRequest() {
  //   await this.page.route("https://automationintesting.online/room/"),
  //     (route) => route.abort();
  // }

  async sendRequest() {
    await this.page.route("https://automationintesting.online/room/"),
      (route) =>
        route.fulfill({
          status: 500,
        });
  }
}
