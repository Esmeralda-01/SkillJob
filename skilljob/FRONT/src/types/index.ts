import { z } from 'zod'

/** Auth & Users */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type CheckPasswordForm = Pick<Auth, 'password'>

/** Users */
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})
export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>

/** Comments */
export const commentSchema = z.object({
    _id: z.string(),
    content: z.string(),
    offer: z.string()
})
export const commentOfferSchema = commentSchema.pick({
    _id: true,
    content: true
})
export type Comment = z.infer<typeof commentSchema>
export type CommentFormData = Pick<Comment, 'content'>
export type CommentOffer = z.infer<typeof commentOfferSchema>

/** Offers */
export const offerSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    comments: z.array(commentSchema),
    solicitudes: z.string()
})

export const dashboardOfferSchema = z.array(
    offerSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)

export type Offer = z.infer<typeof offerSchema>
export type OfferFormData = Pick<Offer, 'clientName' | 'projectName' | 'description'>

/** solicitudes */
export const solicitudStatusSchema = z.enum(["pendiente", "enproceso", "rechazada", "finalizada" ])
export type SolicitudStatus = z.infer<typeof solicitudStatusSchema>

export const solicitudSchema = z.object({
    _id: z.string(),
    status: solicitudStatusSchema,
    offer: offerSchema
})
export const solicitudSchemaOfferSchema = solicitudSchema.pick({
    _id: true,
    status: true
})
export const solicitudProjectSchema = solicitudSchema.pick({
    _id: true,
    status: true,
    offer: true
})
export type Solicitud = z.infer<typeof solicitudSchema>
export type SolicitudFormData = Pick<Solicitud, 'status'>
export type SolicitudOffer = z.infer<typeof solicitudProjectSchema>

