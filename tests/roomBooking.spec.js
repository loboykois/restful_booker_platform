import { test, expect } from "@playwright/test";
import { fakeResponses } from "./tools/fakeResponses";
import { Room } from "../pageObjects/hotel/room";
import { error } from "console";

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

      await room.sendResponse({ body: fakeResponses.noRooms });

      await expect(room.info).toBeHidden();
    });

    // return bad response (status code 500)
    // TODO: fix this case
    test("error message when 500 status code is sended", async ({ page }) => {
      const room = new Room(page);

      await room.abortResponse();

      await expect(room.info).toBeHidden();
    });

    test("test", async ({ page }) => {
      const room = new Room(page);

      // await room.sendResponse({ status: 500 });
      await room.sendResponse({ status: 500, body: fakeResponses.doubleRoom });
      await expect(room.info).toBeHidden();
    });
  });
});
