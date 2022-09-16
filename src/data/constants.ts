export enum TIMEOUTS {
    MOCHA_TIMEOUT = 600000
}

export enum ENCODING {
    UTF8 = "utf-8"
}

export const ASSERTION_ERRORS = {
    RESPONSE_STATUS: (statusCode: string | number) => `The response status code does not equal ${statusCode}`,
    RESPONSE_MESSAGE: (message: string) => `The error response message does not equal "${message}"`
};

export const ERROR_MESSAGES = {
    INTERNAL_SERVER_ERROR: `Internal Server Error`,
    NOT_FOUND: `Not Found`
};

export const AUTH_CREDENTIALS = {
    USERNAME: "admin",
    PASSWORD: "password123"
};

export const INITIAL_BOOKING_DATA = {
    "firstname" : "John",
    "lastname" : "Connor",
    "totalprice" : 11111,
    "depositpaid" : false,
    "bookingdates" : {
        "checkin" : "2024-01-01",
        "checkout" : "2024-06-01"
    },
    "additionalneeds" : "late checkout"
};