import { test, expect } from "@playwright/test";
import { fakeResponses } from "./tools/fakeResponses";
import { ReservationPage } from "../pageObjects/basePage/reservationPage";
import { fakeData } from "../tests/tools/fakeData";

test.describe("Booking rooms Api tests", () => {
  // requests & response interception

  test.describe("should catch all", () => {
    test("requests when page is loaded", async ({ page }) => {
      page.on("request", (request) => console.log(">>: " + request.method(), request.resourceType(), request.url()));

      await page.goto("/");
    });

    test("responses when page is loaded", async ({ page }) => {
      page.on("response", (response) => console.log("<<: ", response.status(), response.url()));

      await page.goto("/");
    });
  });

  test.describe("should display", () => {
    test("empty Rooms field when an empty response is returned", async ({ page }) => {
      const reservationPage = new ReservationPage(page);

      await reservationPage.sendResponse({ body: fakeResponses.noRooms });
      const rooms = await reservationPage.getRooms();

      expect(rooms.length).toBe(0);
    });

    test("error message when 500 status code is sended", async ({ page }) => {
      const reservationPage = new ReservationPage(page);

      await reservationPage.abortResponse();
      const rooms = await reservationPage.getRooms();

      expect(rooms.length).toBe(0);
    });

    test("empty block with rooms when response has status code 500", async ({ page }) => {
      const reservationPage = new ReservationPage(page);

      await reservationPage.sendResponse({
        status: 500,
        body: fakeResponses.doubleRoom,
      });
      const rooms = await reservationPage.getRooms();

      expect(rooms.length).toBe(0);
    });
  });
});

test.describe("Calendar tests", () => {
  test("should open room details when Book this room button was pressed", async ({ page }) => {
    const reservationPage = new ReservationPage(page);
    await reservationPage.navigate();

    const rooms = await reservationPage.getRooms();

    await rooms[0].book();

    await rooms[0].calendar.selectDateRange(13, 14);
  });
});

test.describe("Room booking form tests", () => {
  test("should display Booking Successful modal window when user has entered correct data", async ({ page }) => {
    const reservationPage = new ReservationPage(page);
    await reservationPage.navigate();

    const rooms = await reservationPage.getRooms();
    const targetRoom = await rooms[0];

    await targetRoom.book();

    await targetRoom.form.enterFirstName(fakeData.firstName);
    await targetRoom.form.enterLastName(fakeData.lastName);
    await targetRoom.form.enterEmail(fakeData.email);
    await targetRoom.form.enterPhone(fakeData.phone);
    await targetRoom.form.confirmBooking();

    const conformationWindow = await targetRoom.form.getConfirmationWindow();

    await expect(conformationWindow).toBeHidden();
  });
});
