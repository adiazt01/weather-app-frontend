import type { ErrorApi } from "../interfaces/errors-api.interface";

export const mapResponseError = (error: any): ErrorApi => {
    console.log('Error:', error);
    if (error.response) {
        return {
            message: error.response.data?.message || 'Ocurrió un error inesperado.',
            code: error.response.data?.code,
            details: error.response.data?.details,
        };
    } else if (error.request) {
        return {
            message: 'No se pudo conectar con el servidor. Por favor, inténtalo más tarde.',
        };
    } else {
        return {
            message: error.message || 'Ocurrió un error desconocido.',
        };
    }
};