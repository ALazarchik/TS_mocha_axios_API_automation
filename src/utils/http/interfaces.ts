export interface AllBookingIds {
    data: {
        "bookingid": number;
    }[];
}

export interface Token {
    "token": "string";
}

export interface OneBooking {
    "firstname": "string";
    "lastname": "string";
    "totalprice": number;
    "depositpaid": boolean;
    "bookingdates": {
        "checkin": "string";
        "checkout": "string";
    },
    "additionalneeds": "string";
}

export interface CreateBooking {
    "bookingid": number;
    "booking": {
        "firstname": "string";
        "lastname": "string";
        "totalprice": number;
        "depositpaid": boolean;
        "bookingdates": {
            "checkin": "string";
            "checkout": "string";
        },
        "additionalneeds": "string";
    };
}