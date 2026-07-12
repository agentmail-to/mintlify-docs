# Run a send-receive-reply loop against the AgentMail API

Creates an inbox, sends a test message to it, lists received messages, and replies on the same thread. Use this to verify an API key end to end and to learn the core object model: inbox, message, thread, reply.

## Do this

```bash
export AGENTMAIL_API_KEY="<API_KEY>"
BASE="https://api.agentmail.to/v0"

# 1. Verify the credential
curl "$BASE/auth/me" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"

# 2. Create an inbox (body optional; display_name recommended)
curl -X POST "$BASE/inboxes" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"display_name": "Quickstart inbox"}'
# response includes: inbox_id (the inbox's email address), created_at

# 3. Send a message to the inbox itself (content field is "text", not "body")
curl -X POST "$BASE/inboxes/<inbox_id>/messages/send" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"to": "<inbox_id>", "subject": "Hello", "text": "Test message"}'
# response: { "message_id": "...", "thread_id": "..." }

# 4. List received messages (delivery may take a moment; retry if empty)
curl "$BASE/inboxes/<inbox_id>/messages" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"

# 5. Reply to the message id (NOT the thread id)
curl -X POST "$BASE/inboxes/<inbox_id>/messages/<message_id>/reply" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Reply body"}'
# response: new message_id, same thread_id
```

## Facts

- Base URL is `https://api.agentmail.to/v0`. The `/v0` segment is required; `https://api.agentmail.to` without `/v0` returns 404.
- Every request carries the header `Authorization: Bearer <API_KEY>`.
- `GET /v0/auth/me` returns the scope the authenticated key resolves to. Status 200 means the key is valid.
- `POST /v0/inboxes` creates an inbox. The request body is optional and all fields in it are optional; `{}` is a valid body.
- The `inbox_id` returned by `POST /v0/inboxes` is the inbox's email address, formed as `username@domain`; username is randomly generated unless specified, domain defaults to `agentmail.to`.
- The `inbox_id` goes in the path of every message call: `/v0/inboxes/{inbox_id}/messages`, `/v0/inboxes/{inbox_id}/messages/send`, `/v0/inboxes/{inbox_id}/messages/{message_id}/reply`.
- `POST /v0/inboxes/{inbox_id}/messages/send` accepts `to`, `subject`, and content in `text` and/or `html`. The content field is `text`, never `body`.
- `POST /v0/inboxes/{inbox_id}/messages/send` returns `message_id` and `thread_id`.
- Delivery into the recipient inbox is not instant; poll `GET /v0/inboxes/{inbox_id}/messages` until the message appears.
- `GET /v0/inboxes/{inbox_id}/messages` returns `count`, `limit`, `next_page_token`, and a `messages` array; `next_page_token` paginates.
- Each item in the `messages` array of `GET /v0/inboxes/{inbox_id}/messages` includes `message_id`, `thread_id`, `from`, `to`, `subject`, `preview`, and `timestamp`.
- `POST /v0/inboxes/{inbox_id}/messages/{message_id}/reply` accepts content in `text` and/or `html` and returns a new `message_id` with the same `thread_id` as the original message.
- A reply always lands on the same `thread_id` as the message it replies to; an original message and its replies share one `thread_id`.
- Some flows build a reply as a draft first and then send it; the result is the same message on the thread.
- The CLI is installed with `npm install -g agentmail-cli` (Node.js required) and reads the key from the `AGENTMAIL_API_KEY` environment variable; there is no separate login step.
- CLI command equivalents: `agentmail auth me`, `agentmail inboxes create`, `agentmail inboxes:messages send`, `agentmail inboxes:messages list`, `agentmail inboxes:messages reply`.

## Not supported

- Replying by thread id: there is no reply endpoint that takes a `thread_id`. Replies target a message id via `POST /v0/inboxes/{inbox_id}/messages/{message_id}/reply`.
- A `body` field in send or reply requests: message content goes in `text` and/or `html`.
- Serving the API at `https://api.agentmail.to` without the `/v0` prefix: those requests return 404.
- Re-running signup to get a fresh account or key when the account already exists: the request is rejected with a 403 "already exists" error.

## Errors

| Error | HTTP | Cause | Fix |
|---|---|---|---|
| Unauthorized | 401 | `AGENTMAIL_API_KEY` missing or wrong in the `Authorization: Bearer` header | Re-check the key value and the header |
| Not Found | 404 | Base URL missing the `/v0` segment, or a wrong path | Use exactly `https://api.agentmail.to/v0` |
| "already exists" | 403 | Re-running signup when the account already exists | Sign in and reuse or rotate the existing API key |

## Verify

```bash
curl "https://api.agentmail.to/v0/auth/me" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"
```

Status 200 with a JSON body describing the key's scope confirms the credential. To confirm the full loop, run `GET /v0/inboxes/{inbox_id}/messages` and check that two messages (the original and the reply) share one `thread_id`.

## Related

- [Introduction](/introduction): account setup and API key management.
- [Architecture](/architecture): how inboxes, messages, and threads fit together.
