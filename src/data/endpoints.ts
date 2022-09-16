export const API_PATH = {
    CREATE_TOKEN: `/auth`,
    ALL_BOOKINGS: `/booking`,
    EXACT_BOOKING: (bookingId: string) => `/booking/${bookingId}`,
    HEALTH_CHECK: `/ping`,
    AUTH_TOKEN: `/auth`
};