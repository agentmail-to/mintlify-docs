# Receive email with AgentMail

Poll an AgentMail inbox for inbound mail: list threads, fetch messages, extract new reply content, download attachments and the raw .eml. Use this for pull-based receiving; webhook/WebSocket push delivery is configured separately and is not covered here.

## Do this

```bash
export AGENTMAIL_API_KEY="your-key"
BASE="https://api.agentmail.to/v0"
AUTH="Authorization: Bearer $AGENTMAIL_API_KEY"

# 1. Create an inbox. All body fields optional; username random if omitted,
#    domain defaults to agentmail.to. Response inbox_id is the email address.
curl -X POST "$BASE/inboxes" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"username": "support"}'

# 2. List unread threads across all visible inboxes, newest first.
curl "$BASE/threads?labels=unread" -H "$AUTH"

# 3. Fetch one thread; messages[] is ordered by timestamp ascending (last = newest).
curl "$BASE/threads/$THREAD_ID" -H "$AUTH"

# 4. Download an attachment (returns signed download_url + expires_at).
curl "$BASE/threads/$THREAD_ID/attachments/$ATTACHMENT_ID" -H "$AUTH"

# 5. Get the raw .eml (returns signed download_url + size + expires_at).
curl "$BASE/inboxes/$INBOX_ID/messages/$MESSAGE_ID/raw" -H "$AUTH"

# 6. Mark a message processed so labels=unread polls skip it.
curl -X PATCH "$BASE/inboxes/$INBOX_ID/messages/$MESSAGE_ID" \
  -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"add_labels": ["read"], "remove_labels": ["unread"]}'
```

## SDK

Install: `pip install agentmail` (Python) or `npm install agentmail` (TypeScript). Clients: `AgentMail(api_key=...)` / `new AgentMailClient({ apiKey })`.

| Operation | Python | TypeScript |
| --- | --- | --- |
| Create inbox | `client.inboxes.create(username=..., domain=...)` | `client.inboxes.create({ username, domain })` |
| List threads (org-wide) | `client.threads.list(labels=[...], limit=..., page_token=...)` | `client.threads.list({ labels, limit, pageToken })` |
| Get thread | `client.threads.get(thread_id=...)` | `client.threads.get(threadId)` |
| Get attachment | `client.threads.get_attachment(thread_id, attachment_id)` | `client.threads.getAttachment(threadId, attachmentId)` |
| Get raw .eml | `client.inboxes.messages.get_raw(inbox_id, message_id)` | `client.inboxes.messages.getRaw(inboxId, messageId)` |
| Update labels | `client.inboxes.messages.update(inbox_id, message_id, add_labels=[...], remove_labels=[...])` | `client.inboxes.messages.update(inboxId, messageId, { addLabels, removeLabels })` |

Reference: https://docs.agentmail.to/api-reference

## Facts

- Base URL is `https://api.agentmail.to/v0`; auth is `Authorization: Bearer <api key>`.
- `inbox_id` is the inbox's email address in the form `username@domain`.
- `POST /v0/inboxes` accepts optional `username`, `domain`, `display_name`, `client_id`; `domain` defaults to `agentmail.to` and custom domains must be verified (or be a subdomain of a verified domain with subdomains enabled).
- Every inbound message gets labels `received` and `unread`; classification may add `spam`, `unauthenticated`, or `blocked`.
- `spam` means the message failed spam screening; `unauthenticated` means SPF/DKIM/DMARC headers were missing; `blocked` means the sender matched a block list entry.
- Inbound mail whose authentication headers are present but fail SPF/DKIM/DMARC is dropped before delivery and cannot be retrieved.
- `GET /v0/threads` returns `{count, limit?, next_page_token?, threads[]}` ordered by `timestamp` descending; `GET /v0/inboxes/{inbox_id}/threads` is the per-inbox variant.
- `GET /v0/threads` hides `spam`, `unauthenticated`, `blocked`, and trashed threads unless `include_spam`, `include_unauthenticated`, `include_blocked`, or `include_trash` is true AND the API key holds the matching label read permission (for example `label_spam_read`).
- `GET /v0/threads` supports `senders`, `recipients`, and `subject` substring filters; filtered requests cap `limit` at 100.
- `GET /v0/threads/{thread_id}` returns the thread with `messages[]` ordered by `timestamp` ascending.
- Message body fields: `text` (plain body as sent), `html` (HTML body as sent), `extracted_text` and `extracted_html` (new content only, quoted history stripped by Talon). All four are optional; `text` is absent for HTML-only email.
- Attachment and raw-message downloads return a signed `download_url` that expires at `expires_at`; raw responses also include `size` in bytes.
- Raw .eml endpoint: `GET /v0/inboxes/{inbox_id}/messages/{message_id}/raw`.
- Per-message attachment endpoint: `GET /v0/inboxes/{inbox_id}/messages/{message_id}/attachments/{attachment_id}`.
- Mark processed: `PATCH /v0/inboxes/{inbox_id}/messages/{message_id}` with `{"remove_labels": ["unread"]}`.

## Not supported

- No dedicated mark-as-read endpoint; read state is the `unread` label, managed via the message PATCH endpoint.
- The `received` system label cannot be added or removed through the API.
- No API retrieves mail dropped for failed SPF/DKIM/DMARC authentication.
- Attachment metadata in thread/message objects contains no bytes and no URL; the download URL only comes from the get-attachment endpoints.
- `download_url` values expire at `expires_at`; they are not stable long-term links.

## Errors

| Code | HTTP | Cause | Fix |
| --- | --- | --- | --- |
| `not_found` | 404 | Unknown `thread_id`, `inbox_id`, `message_id`, or `attachment_id`, or the item carries a label the key cannot read | Verify the ID; check label read permissions and `include_*` flags |
| (validation) | 400 | Invalid request body or query parameters | Read `errors[]` in the response; each entry has a path and message for the invalid field |

Error bodies include `name`, `message`, and a machine-readable snake_case `code`; branch on `code`, not the message text.

## Verify

```bash
curl "https://api.agentmail.to/v0/threads?limit=1" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"
```

Success is HTTP 200 with a body shaped like `{"count": 1, "threads": [{"thread_id": "...", "labels": [...], "subject": "...", ...}]}`. An empty organization returns `{"count": 0, "threads": []}`.

## Related

- [Quickstart](/quickstart)
- [API reference](https://docs.agentmail.to/api-reference)
