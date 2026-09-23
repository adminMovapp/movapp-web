import nodemailer from 'nodemailer';

/*
   Variables requeridas en Netlify (Environment variables), function-only, no
   PUBLIC_: SMTP_HOST, SMTP_PORT, SMTP_SECURE ('true'/'false'), SMTP_USER,
   SMTP_PASS, MAIL_FROM, MAIL_TO.
*/
const REQUIRED_ENV = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM', 'MAIL_TO'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
   String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

export async function handler(event) {
   if (event.httpMethod === 'OPTIONS') {
      return {
         statusCode: 200,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
         },
         body: '',
      };
   }

   if (event.httpMethod !== 'POST') {
      return {
         statusCode: 405,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'Method not allowed' }),
      };
   }

   const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
   if (missingEnv.length > 0) {
      return {
         statusCode: 500,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'Missing environment variables', missing: missingEnv }),
      };
   }

   let data;
   try {
      data = JSON.parse(event.body || '{}');
   } catch (err) {
      return {
         statusCode: 400,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'Invalid JSON body' }),
      };
   }

   // Campos del formulario de contacto (src/sections/contacto/ContactoForm.astro):
   // nombre, apellido, correo, mensaje -- los 4 son obligatorios ahí, se
   // vuelve a exigir acá porque el request no pasa por la validación nativa
   // del navegador.
   const { nombre, apellido, correo, mensaje } = data;

   if (!nombre || !apellido || !correo || !mensaje) {
      return {
         statusCode: 400,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'Missing required fields: nombre, apellido, correo, mensaje' }),
      };
   }

   if (!EMAIL_RE.test(correo)) {
      return {
         statusCode: 400,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'Invalid email' }),
      };
   }

   const secureFlag = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';

   const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || (secureFlag ? 465 : 587),
      secure: secureFlag,
      auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
   });

   // El asunto se genera acá, nunca a partir de un valor del cliente: un
   // "subject" recibido del formulario e insertado tal cual en la cabecera
   // del correo abriría la puerta a inyección de cabeceras (CRLF).
   const mailSubject = `Nuevo mensaje de contacto - ${nombre} ${apellido}`;

   const htmlBody = `
      <!DOCTYPE html>
      <html lang="es">
         <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${escapeHtml(mailSubject)}</title>
         </head>
         <body
            style="margin:0;padding:0;background-color:#f5f0fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;"
         >
            <table
               width="100%"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="background-color:#f5f0fa;padding:24px 0;"
            >
               <tr>
                  <td align="center">
                     <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="max-width:640px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #d9c6f0;box-shadow:0 10px 25px rgba(60,15,90,0.09);"
                     >
                        <tr>
                           <td
                              style="background:linear-gradient(135deg,#7c3aed,#5b21b6);padding:20px 24px;color:#f5f0fa;"
                           >
                              <h1
                                 style="margin:0;font-size:20px;line-height:1.4;font-weight:800;letter-spacing:0.03em;text-transform:uppercase;"
                              >
                                 Nuevo mensaje desde el formulario de contacto
                              </h1>
                              <p style="margin:4px 0 0;font-size:13px;opacity:0.95;">
                                 Recibiste un nuevo mensaje desde movapp.org/contacto.
                              </p>
                           </td>
                        </tr>

                        <tr>
                           <td style="padding:20px 24px 8px 24px;background-color:#ffffff;">
                              <p style="margin:0 0 12px 0;font-size:14px;color:#1f2933;">
                                 <strong style="color:#2b0d47;">Nombre:</strong>
                                 <span style="color:#2b0d47;">${escapeHtml(nombre)} ${escapeHtml(apellido)}</span>
                              </p>
                              <p style="margin:0 0 12px 0;font-size:14px;color:#1f2933;">
                                 <strong style="color:#2b0d47;">Correo:</strong>
                                 <a
                                    href="mailto:${encodeURIComponent(correo)}"
                                    style="color:#7c3aed;text-decoration:none;font-weight:600;"
                                 >
                                    ${escapeHtml(correo)}
                                 </a>
                              </p>

                              <div
                                 style="margin:16px 0 8px 0;padding:14px 16px;background-color:#f5f0fa;border-radius:12px;border:1px solid #d9c6f0;"
                              >
                                 <p style="margin:0 0 8px 0;font-size:13px;font-weight:600;color:#7c3aed;">
                                    Mensaje
                                 </p>
                                 <p style="margin:0;font-size:14px;line-height:1.6;color:#2b0d47;white-space:pre-line;">
                                    ${escapeHtml(mensaje)}
                                 </p>
                              </div>
                           </td>
                        </tr>

                        <tr>
                           <td style="padding:12px 24px 20px 24px;border-top:1px solid #d9c6f0;background-color:#f5f0fa;">
                              <p style="margin:0 0 4px 0;font-size:12px;color:#6b7280;">
                                 Este correo fue generado automáticamente desde el sitio web.
                              </p>
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
            </table>
         </body>
      </html>
   `;

   const textBody = `
Nuevo mensaje desde el formulario de contacto

Nombre: ${nombre} ${apellido}
Correo: ${correo}

Mensaje:
${mensaje}
   `;

   const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: correo,
      subject: mailSubject,
      text: textBody,
      html: htmlBody,
   };

   try {
      const info = await transporter.sendMail(mailOptions);

      return {
         statusCode: 200,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ success: true, messageId: info.messageId }),
      };
   } catch (error) {
      // No se registra event.body en ningún punto de este handler: lleva
      // nombre/correo/mensaje en claro, y los logs de Netlify no son un
      // lugar controlado para datos personales.
      console.error('Error sending contact form email:', error.message);
      return {
         statusCode: 500,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ error: 'Failed to send email' }),
      };
   }
}
