import { before } from "mocha";
import { restfulBookerService } from "../utils/services/restfulBooker.service";
import { expect } from "chai";
import { ASSERTION_ERRORS, ERROR_MESSAGES, INITIAL_BOOKING_DATA } from "../data/constants";
import _ from "lodash";

describe("DELETE requests: ", () => {
    const initialBookingData = _.cloneDeep(INITIAL_BOOKING_DATA);

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

    it("delete existing booking", async () => {
        const deleteResponse = await restfulBookerService.deleteBookingById(bookingId, authToken);
        expect(deleteResponse.status).to.be.equal(201, ASSERTION_ERRORS.RESPONSE_STATUS(201));
        const searchResponse = await restfulBookerService.getBookingById(bookingId);
        expect(searchResponse.status).to.be.equal(404, ASSERTION_ERRORS.RESPONSE_STATUS(404));
        expect(searchResponse.statusText).to.be.equal(ERROR_MESSAGES.NOT_FOUND, ASSERTION_ERRORS.RESPONSE_MESSAGE(ERROR_MESSAGES.NOT_FOUND));
    });
});