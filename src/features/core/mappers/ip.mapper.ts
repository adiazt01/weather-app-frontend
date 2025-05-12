import type { IP } from "../interfaces/ip.interface";
import type { IPResponse } from "../interfaces/responses/ip-response.interface";

export const mapIpResponseToIP = (ipResponse: IPResponse): IP => {
    return {
        city: ipResponse.city,
    };
}