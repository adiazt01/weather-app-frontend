import type { IP } from "../interfaces/ip.interface";
import { mapIpResponseToIP } from "../mappers/ip.mapper";
import axios from "axios";
import type { IPResponse } from "../interfaces/responses/ip-response.interface";
import { mapResponseError } from "@/features/shared/mappers/errors.mappers";

export const getCurrentLocationFromIp = async (): Promise<IP> => {
    try {
        const response = await axios.get<IPResponse>("https://ipapi.co/json/", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_IPAPI_KEY}`,
            },
        });

        return mapIpResponseToIP(response.data);
    } catch (error) {
        throw mapResponseError(error);
    }
}