import { before } from "mocha";
import { restfulBookerService } from "../utils/services/restfulBooker.service";
import { expect } from "chai";
import { ASSERTION_ERRORS, ERROR_MESSAGES, INITIAL_BOOKING_DATA } from "../data/constants";
import { checkSchema } from "../utils/helpers/checks";
import _ from "lodash";

describe("POST requests: ", () => {
    const initialBookingData = _.cloneDeep(INITIAL_BOOKING_DATA);

    before("health check", async () => {
        const healthCheckResponse = await restfulBookerService.healthCheck();
        if (healthCheckResponse.status !== 201) {
            throw new Error("Restfull Booker API doesn't work");
        }
    });

    it("create new booking", async () => {
        const schemaPath = "./src/utils/schemas/post.createBooking.json";

        const response = await restfulBookerService.createBooking(initialBookingData);
        expect(response.status).to.be.equal(200, ASSERTION_ERRORS.RESPONSE_STATUS(200));
        expect(response.data.booking).to.deep.equal(initialBookingData);
        const responseData = response.data;
        await checkSchema(schemaPath, responseData);
    });

    it("unsuccessful creation of new booking with invalid data", async () => {
        let invalidNewBookingData = _.cloneDeep(initialBookingData);
        invalidNewBookingData.firstname = 111;

        const response = await restfulBookerService.createBooking(invalidNewBookingData);
        expect(response.status).to.be.equal(500, ASSERTION_ERRORS.RESPONSE_STATUS(500));
        expect(response.statusText).to.be.equal(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, ASSERTION_ERRORS.RESPONSE_MESSAGE(ERROR_MESSAGES.INTERNAL_SERVER_ERROR));
    });
});