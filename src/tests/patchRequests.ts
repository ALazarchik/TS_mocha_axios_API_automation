import { before } from "mocha";
import { restfulBookerService } from "../utils/services/restfulBooker.service";
import { expect } from "chai";
import { ASSERTION_ERRORS, INITIAL_BOOKING_DATA } from "../data/constants";
import { checkSchema } from "../utils/helpers/checks";
import _ from "lodash";

describe("PATCH requests: ", () => {
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

    it("partially update existing booking", async () => {
        const schemaPath = "./src/utils/http/schemas/get.bookingById.json";

        const newDataForBooking = { "firstname" : "Lionel", "lastname" : "Messi" };
        const updatedBooking = _.cloneDeep(initialBookingData);
        updatedBooking.firstname = newDataForBooking.firstname;
        updatedBooking.lastname = newDataForBooking.lastname;
        const updateResponse = (await restfulBookerService.partiallyUpdateBooking(bookingId, newDataForBooking, authToken)).data;
        await checkSchema(schemaPath, updateResponse);
        const updatedBookingResponse = (await restfulBookerService.getBookingById(bookingId)).data;
        expect(updatedBookingResponse).to.deep.equal(updatedBooking);
    });
});