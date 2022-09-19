import { HTTP } from "../http/http";
import { config } from "../../config/config";
import _ from "lodash";
import { AxiosResponse } from "axios";
import { AllBookingIds, AxiosResponseError, CreateBooking, OneBooking, Token } from "../http/interfaces";
import { API_PATH } from "../../data/endpoints";

class RestfulBookerService extends HTTP {
    constructor() {
        super({
            baseURL: config.baseUrl
        });
    }

    private static setAxiosConfig(token?: unknown, params = {}) {
        const basicConfig = {
            headers: {
                "Cookie": token ? `token=${token}` : null,
                "Content-Type": "application/json",
            },
        };
        return _.merge(basicConfig, params);
    }

    public async healthCheck(): Promise<AxiosResponse> {
        return this.get(`${API_PATH.HEALTH_CHECK}`, RestfulBookerService.setAxiosConfig());
    }

    public async getAuthToken(): Promise<AxiosResponse<Token>> {
        return this.post(`${API_PATH.AUTH_TOKEN}`, { "username" : config.auth_credentials.username,
            "password" : config.auth_credentials.password }, RestfulBookerService.setAxiosConfig());
    }

    public async getAllBookingsIds(): Promise<AxiosResponse<AllBookingIds & AxiosResponseError>> {
        return this.get(`${API_PATH.ALL_BOOKINGS}`, RestfulBookerService.setAxiosConfig());
    }

    public async getBookingById(bookingId: string): Promise<AxiosResponse<OneBooking & AxiosResponseError>> {
        return this.get(`${API_PATH.ONE_BOOKING_BY_ID(bookingId)}`, RestfulBookerService.setAxiosConfig(null, { headers: { "Accept": "application/json" } }));
    }

    public async createBooking(data): Promise<AxiosResponse<CreateBooking & AxiosResponseError>> {
        return this.post(`${API_PATH.ALL_BOOKINGS}`, data, RestfulBookerService.setAxiosConfig(null, { headers: { "Accept": "application/json" } }));
    }

    public async updateBooking(bookingId: string, data = {}, token: string) {
        return this.put(`${API_PATH.ONE_BOOKING_BY_ID(bookingId)}`, data, RestfulBookerService.setAxiosConfig(token, { headers: { "Accept": "application/json" } }));
    }

    public async partiallyUpdateBooking(bookingId: string, data = {}, token: string) {
        return this.patch(`${API_PATH.ONE_BOOKING_BY_ID(bookingId)}`, data, RestfulBookerService.setAxiosConfig(token, { headers: { "Accept": "application/json" } }));
    }

    public async deleteBookingById(bookingId: string, token: string) {
        return this.delete(`${API_PATH.ONE_BOOKING_BY_ID(bookingId)}`, RestfulBookerService.setAxiosConfig(token));
    }
}

export const restfulBookerService = new RestfulBookerService();