export const API_PATH = {
    ALL_BOOKINGS: `/booking`,
    ONE_BOOKING_BY_ID: (bookingId: string) => `/booking/${bookingId}`,
    HEALTH_CHECK: `/ping`,
    AUTH_TOKEN: `/auth`
};