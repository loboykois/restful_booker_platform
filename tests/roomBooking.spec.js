import { test, expect } from "@playwright/test";
import { fakeResponses } from "./tools/fakeResponses";
import { Room } from "../pageObjects/hotel/room";

test.describe("Booking rooms Api test", () => {
  // requests & response interception

  test.describe("should catch all", () => {
    test("requests when page is loaded", async ({ page }) => {
      page.on("request", (request) =>
        console.log(
          ">>: " + request.method(),
          request.resourceType(),
          request.url()
        )
      );

      await page.goto("/");
    });

    test("responses when page is loaded", async ({ page }) => {
      page.on("response", (response) =>
        console.log("<<: ", response.status(), response.url())
      );

      await page.goto("/");
    });
  });

  test.describe("should display", () => {
    // modify response

    test("empty Rooms field when an empty response is returned", async ({
      page,
    }) => {
      const room = new Room(page);

      await room.sendResponse(fakeResponses.noRooms);

      await expect(room.info).toBeHidden();
    });

    // return bad response (status code 500)
    // TODO: fix this case
    test("error message when 500 status code is sended", async ({ page }) => {
      const room = new Room(page);

      try {
        await room.sendRequest();
        await expect(room.info).toBeVisible();
      } catch (error) {
        console.error("Server error: ", error);
      } finally {
        await expect(room.info).toBeHidden();
      }
    });
  });
});
