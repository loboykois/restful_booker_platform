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

  // || 1, 0, true, false, null, undefined
  // ?? => null or undefined
  // options = { body, status = 200 }
  // async sendResponse1(options) {
  //   await this.page.route("https://automationintesting.online/room/", (route) =>
  //     route.fulfill({
  //       status: options?.status ?? 200,
  //       contentType: options?.contentType ?? 'application/json',
  //       body: options?.body ? JSON.stringify(options?.body) : null
  //     })
  //   );

  //   await this.page.goto("/");
  // }

  // async sendResponse(status, { body, contentType });
  // async replaceRoomsResponse
  // async replacePlaceOrderResponse
  // staging: https://automationintesting-staging.online/room/
  // production: https://automationintesting.online/room/

  async sendResponse({ body, status = 200 }) {
    await this.page.route("https://automationintesting.online/room/", (route) =>
      route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify(body),
      })
    );

    await this.page.goto("/");
  }

  async abortResponse() {
    await this.page.route("https://automationintesting.online/room/", (route) =>
      route.abort()
    );
  }

  async fulfillAbortResponse() {
    await this.page.route("https://automationintesting.online/room/", (route) =>
      route.fulfill({ status: 500 })
    );
  }
}
