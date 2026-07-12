# Send, reply, forward, and schedule email from an AgentMail inbox

Sends a new email or a threaded reply/forward from an inbox, immediately or as a scheduled draft. Use for any outbound mail; all send paths return `{message_id, thread_id}`.

## Do this

```bash
export AGENTMAIL_API_KEY=...   # inbox_id is the inbox's email address

curl -X POST "https://api.agentmail.to/v0/inboxes/$INBOX_ID/messages/send" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["recipient@example.com"],
    "subject": "Your receipt",
    "text": "Thanks for your order.",
    "html": "<p>Thanks for your order.</p>"
  }'
# => {"message_id": "...", "thread_id": "..."}
```

Reply (threading, Re: subject, and quoting are automatic; body fields same as send):

```bash
curl -X POST "https://api.agentmail.to/v0/inboxes/$INBOX_ID/messages/$MESSAGE_ID/reply" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Confirmed. Shipping today."}'
```

## SDK

Python: `pip install agentmail`, client `AgentMail(api_key=...)`. TypeScript: `npm install agentmail`, client `new AgentMailClient({ apiKey })`.

| Operation | Python | TypeScript |
| --- | --- | --- |
| Send | `client.inboxes.messages.send(inbox_id=..., to=[...], ...)` | `client.inboxes.messages.send(inboxId, {...})` |
| Reply | `client.inboxes.messages.reply(inbox_id=..., message_id=..., text=...)` | `client.inboxes.messages.reply(inboxId, messageId, {...})` |
| Create draft | `client.inboxes.drafts.create(inbox_id=..., ..., send_at=...)` | `client.inboxes.drafts.create(inboxId, {..., sendAt})` |
| Send draft | `client.inboxes.drafts.send(inbox_id=..., draft_id=...)` | `client.inboxes.drafts.send(inboxId, draftId)` |
| Idempotency header | `request_options={"additional_headers": {"Idempotency-Key": ...}}` | third arg `{ headers: { "Idempotency-Key": ... } }` |

Full API reference: https://docs.agentmail.to/llms.txt

## Facts

- Send: `POST /v0/inboxes/{inbox_id}/messages/send`. Requires at least one of `to`, `cc`, `bcc`. Response: `{message_id, thread_id}`.
- Message content fields are `text` and/or `html`. There is no `body` field.
- Reply: `POST /v0/inboxes/{inbox_id}/messages/{message_id}/reply`. Reply-all: `POST /v0/inboxes/{inbox_id}/messages/{message_id}/reply-all` (or `"reply_all": true` on `/reply`). Forward: `POST /v0/inboxes/{inbox_id}/messages/{message_id}/forward`.
- Reply/reply-all/forward set `In-Reply-To` and `References` automatically, prefix the subject with `Re:`/`Fwd:`, quote the original below the new body, and land in the source message's thread.
- Reply default recipients: caller `to`, else original Reply-To, else original sender. Reply-all: original To plus sender, minus the sending inbox's own address, original Cc carried.
- Forward requires explicit recipients and includes the original message's attachments plus any new ones.
- Attachment entries take exactly one of `content` (base64) or `url` (fetched at send time, 10-second timeout, redirects followed). Optional: `filename`, `content_type` (inferred from filename if omitted), `content_disposition` (`inline` | `attachment`; defaults to `inline` when `content_id` is set, else `attachment`), `content_id`.
- `headers` on any send is a map of custom SMTP headers; a `null` value suppresses that header. Shared-domain (`agentmail.to`) sends always carry AgentMail's `List-Unsubscribe` headers, not overridable.
- Drafts: create `POST /v0/inboxes/{inbox_id}/drafts`; send `POST /v0/inboxes/{inbox_id}/drafts/{draft_id}/send` (deletes the draft, returns `{message_id, thread_id}`); update `PATCH /v0/inboxes/{inbox_id}/drafts/{draft_id}`; delete `DELETE /v0/inboxes/{inbox_id}/drafts/{draft_id}`.
- Draft reply/forward creation: `POST /v0/inboxes/{inbox_id}/messages/{message_id}/draft-reply`, `/draft-reply-all`, `/draft-forward`. Creates a draft only; nothing sends until the draft-send call.
- Scheduling: set `send_at` (ISO 8601 datetime) on draft create or update. A scheduled draft requires at least one recipient and carries the `scheduled` label. Cancel the schedule with `"send_at": null` (keeps draft) or delete the draft.
- `send_status` enum (complete): `scheduled`, `sending`, `failed`. A `sending` draft can no longer be canceled. Retry a `failed` draft by setting a new `send_at`. There is no `sent` value; a sent draft is deleted.
- Idempotency: opt-in via `Idempotency-Key` HTTP header on `messages/send`, `reply`, `reply-all`, `forward`, and `drafts/{draft_id}/send`. Key: 1-256 chars from `A-Z a-z 0-9 - . _ ~`, scoped to the organization.
- Idempotent replay: same key + same request within 24 hours of completion returns the original `{message_id, thread_id}` and sends nothing. Ambiguous send failures hold the key up to 15 minutes (retries 409 during that window).
- Reply-loop prevention (caller-side): skip `message.sent` webhook events and mail whose `from` is your own inbox address; do not reply when the received message's `headers` map has `Auto-Submitted` with any value other than `no`; cap your own replies per `thread_id`.

## Not supported

- No `body` field on any send; only `text` and `html`.
- `reply_all: true` cannot be combined with explicit `to`, `cc`, or `bcc` (recipients are always derived).
- An attachment cannot carry both `content` and `url`, or neither.
- No idempotency field in the request body (`idempotency_id` is rejected); the `Idempotency-Key` header is the only mechanism. Sends without the header are not deduplicated.
- No dedicated cancel endpoint for scheduled sends; cancel via `PATCH` with `"send_at": null` or `DELETE` the draft.
- A draft's kind (plain, reply, forward) is fixed at create; `PATCH` cannot add or change `in_reply_to`/`forward_of`.
- `List-Unsubscribe` headers on shared-domain sends cannot be overridden or suppressed via the `headers` map.

## Errors

| Error | HTTP | Cause | Fix |
| --- | --- | --- | --- |
| `ValidationError`: `to, cc, or bcc must be specified` | 400 | Send or forward with no recipients | Add at least one recipient |
| `ValidationError`: `Idempotency-Key must contain only the following characters: A-Z a-z 0-9 - . _ ~` | 400 | Invalid or empty `Idempotency-Key` header | Use 1-256 chars from the allowed set |
| `ConflictError`: `A send with this Idempotency-Key is already in progress` | 409 | Concurrent duplicate of an in-flight send | Wait, then retry with the same key |
| `ConflictError`: `Idempotency-Key was already used for a different message` | 409 | Key reused with different content, inbox, or endpoint | Use a fresh key |
| `MessageRejectedError`: `Message rejected: Recipient(s) blocked: ...` | 403 | Recipient matches a block list entry | Remove the blocked recipient |
| `MessageRejectedError`: `Message rejected: attachment source <url> returned <status>` | 403 | URL attachment source answered 4xx | Fix or refresh the attachment URL |
| `ForbiddenError` | 403 | API key lacks `message_send` (or `draft_send`) permission | Use a key with send permission |
| `NotFoundError`: `Message not found` | 404 | `message_id` does not exist in that inbox | Check the id and inbox |
| `ServiceUnavailableError` | 503 | Transient failure fetching a URL attachment | Retry the send |

## Verify

```bash
curl "https://api.agentmail.to/v0/inboxes/$INBOX_ID/messages/$MESSAGE_ID" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"
# => message object; "labels" includes "sent"
```

## Related

- [Quickstart](/quickstart)
