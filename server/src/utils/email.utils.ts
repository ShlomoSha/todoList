import { Resend } from "resend"
import { FROM_EMAIL_DEV, RESEND_API_KEY } from "../config/env.config"

const resend = new Resend(RESEND_API_KEY)

export const sendResetEmail = async (to: string, resetUrl: string) => {
    await resend.emails.send({
        from: FROM_EMAIL_DEV,
        to,
        subject: 'Password Reset Request',
          html: `
            <p>קיבלנו בקשה לאיפוס סיסמא.</p>
            <p>לחץ על הלינק הבא (בתוקף לשעה):</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>אם לא ביקשת זאת, התעלם מהמייל הזה.</p>
        `,
    })
}