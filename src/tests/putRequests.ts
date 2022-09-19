import { before } from "mocha";
import { restfulBookerService } from "../utils/services/restfulBooker.service";
import { expect } from "chai";
import { ASSERTION_ERRORS, INITIAL_BOOKING_DATA } from "../data/constants";
import { checkSchema } from "../utils/helpers/checks";
import _ from "lodash";

describe("PUT requests: ", () => {
    const initialBookingData = _.cloneDeep(INITIAL_BOOKING_DATA);

    const updatedBookingData = {
        "firstname" : "William",
        "lastname" : "Gates",
        "totalprice" : 9999,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2025-01-01",
            "checkout" : "2026-01-01"
        },
        "additionalneeds" : "breakfast"
    };

    let authToken: string;
    let bookingId: string;

    before("health check", async () => {
        const healthCheckResponse = await restfulBookerService.healthCheck();
        if (healthCheckResponse.status !== 201) {
            throw new Error("Restfull Booker API doesn't work");
        }

        const newBookingResponse = await restfulBookerService.createBooking(initialBookingData);
        expect(newBookingResponse.status).to.be.equal(200, ASSERTION_ERRORS.RESPONSE_STATUS(200));
        expect(newBookingResponse.data.booking).to.deep.equal(initialBookingData);
        bookingId = newBookingResponse.data.bookingid.toString();

        authToken = (await restfulBookerService.getAuthToken()).data.token;
    });

    it("update existing booking", async () => {
        const schemaPath = "./src/utils/schemas/get.bookingById.json";

        const updateResponse = (await restfulBookerService.updateBooking(bookingId, updatedBookingData, authToken)).data;
        await checkSchema(schemaPath, updateResponse);
        const updatedBookingResponse = (await restfulBookerService.getBookingById(bookingId)).data;
        expect(updatedBookingResponse).to.deep.equal(updatedBookingData);
    });
});