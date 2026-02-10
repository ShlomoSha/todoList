import { BadRequestError } from "../errors/httpErrors";
import { RequiredFields } from "../types/requiredFields";

export const validateData = (data: Record<string, any>, requiredFields: RequiredFields[]) => {
    if (!data || typeof data !== 'object') {
        throw new BadRequestError('Invalid request body')
    }
    for (const field of requiredFields) {
        if (!data[field]) {
            throw new BadRequestError('Something is missing')
        }
    }
}