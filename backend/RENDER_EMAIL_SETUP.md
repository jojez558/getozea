# Contact email notifications on Render

New contact-form and quote submissions are still saved in `data/messages.json`. When email settings are configured, the backend also sends a notification to George. Email delivery is best-effort: a mail-provider outage does not discard the saved request.

## Configure Resend

1. Create a Resend account at `https://resend.com/`.
2. Add and verify a domain you control, or verify an allowed sender address according to Resend's current account rules.
3. Create an API key with permission to send email.
4. In Render, open the backend web service, then **Environment** and add:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | The private API key from Resend. Keep it only in Render; never put it in frontend code or commit it. |
| `NOTIFICATION_FROM` | A sender Resend has authorized, for example `Getozvea Website <notifications@your-verified-domain>` |
| `NOTIFICATION_TO` | `georgemwaura058@gmail.com` |
| `CONTACTS_ADMIN_TOKEN` | A long, random secret used to protect the submissions-list endpoint. Generate it privately; do not share it in chat or put it in frontend code. |

5. Save the environment variables and redeploy/restart the Render service.
6. Submit a test message through the live site. The notification should arrive at `georgemwaura058@gmail.com`; reply to the message to respond to the visitor.

## Viewing stored messages

The messages-list endpoint is now private. Send the Render API request with an authorization header:

```text
GET https://getozea.onrender.com/api/contact
Authorization: Bearer <CONTACTS_ADMIN_TOKEN>
```

Do not place the token in the website, a public URL, or a client-side script. If notification configuration is missing, submissions are still stored, but no email can be sent.
