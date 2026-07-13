# Fetch, label, and search AgentMail conversation threads

Read a full email thread, track agent state with custom labels, and find conversations by full-text search. Use this when operating on existing mail rather than sending it.

## Do this

```bash
export AGENTMAIL_API_KEY="..."
BASE="https://api.agentmail.to/v0"

# Fetch a full thread (messages[] ordered by timestamp ascending, oldest first)
curl "$BASE/threads/$THREAD_ID" -H "Authorization: Bearer $AGENTMAIL_API_KEY"

# Update labels on every message in the thread
curl -X PATCH "$BASE/threads/$THREAD_ID" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"add_labels": ["triaged"], "remove_labels": ["unread"]}'

# Relevance-ranked full-text search across the organization
curl -G "$BASE/threads/search" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  --data-urlencode "q=invoice 1042"
```

## SDK

Python: `pip install agentmail`, then `client = AgentMail(api_key=...)`. TypeScript: `npm install agentmail`, then `client = new AgentMailClient({ apiKey })`.

| Operation | Python | TypeScript |
| --- | --- | --- |
| Get thread | `client.threads.get(thread_id=...)` | `client.threads.get(threadId)` |
| List threads | `client.threads.list(...)` | `client.threads.list({...})` |
| Update thread labels | `client.threads.update(thread_id=..., add_labels=[...], remove_labels=[...])` | `client.threads.update(threadId, { addLabels, removeLabels })` |
| Search threads (org) | `client.threads.search(q=...)` | `client.threads.search({ q })` |
| Search threads (inbox) | `client.inboxes.threads.search(inbox_id=..., q=...)` | `client.inboxes.threads.search(inboxId, { q })` |
| Search messages (inbox) | `client.inboxes.messages.search(inbox_id=..., q=...)` | `client.inboxes.messages.search(inboxId, { q })` |

SDK reference: https://docs.agentmail.to/api-reference

## Facts

- Base URL: `https://api.agentmail.to/v0`; auth header `Authorization: Bearer $AGENTMAIL_API_KEY`.
- `GET /v0/threads/{thread_id}` returns thread metadata plus `messages[]` ordered by `timestamp` ascending (oldest first).
- Thread metadata fields: `inbox_id`, `thread_id`, `labels`, `timestamp`, `received_timestamp?`, `sent_timestamp?`, `senders`, `recipients`, `subject?`, `preview?`, `attachments?`, `last_message_id`, `message_count`, `size`, `updated_at`, `created_at`.
- A thread's `labels` is the union of the labels on its messages.
- `GET /v0/threads` lists threads ordered by `timestamp` descending; response is `{count, limit?, next_page_token?, threads[]}`; filter with `labels`, `before`, `after`; `senders`/`recipients`/`subject` substring filters are served by search and cap `limit` at 100.
- Scope: `/v0/threads...` resolves scope from the API key; `/v0/inboxes/{inbox_id}/threads...` and `/v0/pods/{pod_id}/threads...` set scope explicitly.
- System labels, set by the platform and rejected from `add_labels`/`remove_labels` with 400: `received`, `sent`, `bounced`, `complained`, `delayed`, `delivered`, `rejected`, `opened`, `scheduled`.
- Custom labels are trimmed and lowercased on write; maximum 256 characters per label.
- `PATCH /v0/threads/{thread_id}` body `{add_labels?, remove_labels?}` applies the change to every message in the thread; `remove_labels` wins on duplicates; response `{thread_id, labels}`.
- `PATCH /v0/threads/{thread_id}` returns 422 `UnprocessableError` when the thread has 100 or more messages; use `PATCH /v0/inboxes/{inbox_id}/messages/{message_id}` or `POST /v0/inboxes/{inbox_id}/messages/batch-update` (max 50 ids, atomic) instead.
- Thread search endpoints: `GET /v0/threads/search` (org), `GET /v0/pods/{pod_id}/threads/search`, `GET /v0/inboxes/{inbox_id}/threads/search`; query params `q`, `limit`, `page_token`, `before`, `after`.
- Message search endpoint: `GET /v0/inboxes/{inbox_id}/messages/search` (inbox scope only).
- Search matches `q` against senders, recipients, subject (substring) and message body (tokenized full text); results ordered by relevance, best match first.
- Search `limit` defaults to 50, maximum 100; paging via `page_token` stops within the first 10,000 results.
- Search results may include `highlights` with per-field matched fragments (`from`, `recipients`, `subject`, `text`), matched terms wrapped in `**`; a field key is present only when that field matched.
- Search always excludes spam, trash, blocked, and unauthenticated mail.
- Search and thread reads require the `message_read` permission; label updates require `message_update`.
- Concurrent writes to a thread (simultaneous inbound messages, racing label edits) fail with 409 `RaceConditionError`; retry the same request.

## Not supported

- No organization- or pod-scope message search: `GET /v0/messages/search` and `GET /v0/pods/{pod_id}/messages/search` do not exist. Search threads at org scope instead.
- System labels cannot be added or removed via the API.
- Search endpoints have no `include_spam`/`include_blocked`/`include_unauthenticated`/`include_trash` parameters; the exclusion is unconditional (list endpoints do accept them).
- No label rename operation: remove the old label and add the new one.
- Search results cannot be sorted by recency; use list endpoints with filters for recency ordering.

## Errors

| Error name | HTTP | Cause | Fix |
| --- | --- | --- | --- |
| `ValidationError` | 400 | System label in `add_labels`/`remove_labels`, or `limit` > 100 on search | Use custom labels only; keep `limit` <= 100 |
| `ForbiddenError` | 403 | API key lacks `message_read` (reads/search) or `message_update` (label edits) | Use a key with the required permission |
| `NotFoundError` | 404 | Thread ID does not exist or is outside the key's scope | Check the ID and the key's inbox/pod/org scope |
| `RaceConditionError` | 409 | Concurrent write to the same thread raced this request | Retry the request |
| `UnprocessableError` | 422 | `PATCH /v0/threads/{thread_id}` on a thread with 100+ messages | Update messages individually or via batch-update |

## Verify

```bash
curl -G "https://api.agentmail.to/v0/threads" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  --data-urlencode "limit=1"
```

Success returns HTTP 200 with `{"count": ..., "threads": [...]}`. A thread object in the array confirms scope and `message_read` permission.

## Related

- [Quickstart](/quickstart)
- API reference: https://docs.agentmail.to/api-reference
