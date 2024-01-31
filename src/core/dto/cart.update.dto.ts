import Joi from 'joi'

export interface CartUpdateDto {
    productId: string
    count: number
}

export const cartItemSchema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().required(),
    id: Joi.string().optional(),
})
