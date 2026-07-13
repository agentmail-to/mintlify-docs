# Control who can email an AgentMail inbox and who it can email

Allow/block lists filter inbound senders and outbound recipients per inbox, pod, or organization. Use them to lock an agent inbox to trusted senders or restrict which addresses it may email.

## Do this

Only accept new inbound mail from one domain, and block one sender for a single inbox:

```bash
# Org-scope receive allow list (flips org inbound to default-deny)
curl -X POST "https://api.agentmail.to/v0/lists/receive/allow" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"entry": "yourcompany.com"}'

# Inbox-scope receive block entry with a reason
curl -X POST "https://api.agentmail.to/v0/inboxes/agent@yourdomain.com/lists/receive/block" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"entry": "noise@example.com", "reason": "automated newsletter"}'

# Unblock a recipient (delete an org send block entry), returns 204
curl -X DELETE "https://api.agentmail.to/v0/lists/send/block/user@example.com" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"
```

## SDK

Install: `pip install agentmail` (Python), `npm install agentmail` (TypeScript), `npm install -g agentmail-cli` (CLI).

| Operation | Python | TypeScript |
| --- | --- | --- |
| Create entry (org) | `client.lists.create(direction, type, entry=..., reason=...)` | `client.lists.create(direction, type, { entry, reason })` |
| List entries (org) | `client.lists.list(direction, type, limit=..., page_token=...)` | `client.lists.list(direction, type, { limit, pageToken })` |
| Get entry (org) | `client.lists.get(direction, type, entry=...)` | `client.lists.get(direction, type, entry)` |
| Delete entry (org) | `client.lists.delete(direction, type, entry=...)` | `client.lists.delete(direction, type, entry)` |
| Pod scope | `client.pods.lists.<op>(pod_id, direction, type, ...)` | `client.pods.lists.<op>(podId, direction, type, ...)` |
| Inbox scope | `client.inboxes.lists.<op>(inbox_id, direction, type, ...)` | `client.inboxes.lists.<op>(inboxId, direction, type, ...)` |

CLI: `agentmail lists create|list|get|delete --direction <d> --type <t> [--entry <e>] [--reason <r>]`; pod scope `agentmail pods:lists ... --pod-id <id>`; inbox scope `agentmail inboxes:lists ... --inbox-id <address>`.

SDK reference: https://docs.agentmail.to/api-reference

## Facts

- Endpoints (org scope): `GET /v0/lists/{direction}/{type}`, `POST /v0/lists/{direction}/{type}`, `GET /v0/lists/{direction}/{type}/{entry}`, `DELETE /v0/lists/{direction}/{type}/{entry}`.
- Pod-scope endpoints prefix with `/v0/pods/{pod_id}`; inbox-scope endpoints prefix with `/v0/inboxes/{inbox_id}`. Unprefixed `/v0/lists/...` paths resolve scope from the API key.
- `direction` enum: `send`, `receive`, `reply`. `type` enum: `allow`, `block`.
- Entry type is derived, not passed: an entry containing `@` is stored as `entry_type: "email"`, otherwise `entry_type: "domain"`.
- `reason` on create is optional, max 1,024 characters.
- Create returns the entry object: `entry`, `organization_id`, `direction`, `list_type`, `entry_type`, optional `reason`, optional `read_only`, `created_at`. Delete returns HTTP 204.
- Evaluation cascade: inbox scope, then pod scope, then org scope; first match wins. Within a scope the check order is: email allow, email block, domain allow, domain block.
- If any allow list for the direction has at least one entry at any scanned scope (inbox, pod, or org), an entry that matches nothing is blocked with reason `not in allow list`.
- Inbound mail that answers a message the inbox sent (resolved via the `In-Reply-To` header) is checked against `reply` lists only; new-thread inbound mail is checked against `receive` lists only. Empty reply lists allow all replies.
- Inbound blocked mail is still stored, labeled `blocked`, and excluded from message/thread listings by default; retrieve with `include_blocked=true` plus the `label_blocked_read` permission. Same pattern for `spam` (`include_spam`, `label_spam_read`) and `unauthenticated` (`include_unauthenticated`, `label_unauthenticated_read`).
- `spam` label: message failed the spam verdict. `unauthenticated` label: SPF/DKIM/DMARC headers entirely absent. Mail with present-but-failing auth headers is dropped before delivery and is unrecoverable.
- Auto-created block entries are org-scope `send`/`block`: permanent bounce (reason `bounced`, deletable), spam complaint (reason `complained`, read-only), List-Unsubscribe click (reason `Unsubscribed via List-Unsubscribe`, read-only). Transient bounces create no entry.
- Reading lists requires only `list_entry_read` (granted to all keys); create and delete require a verified organization.
- Sends from the shared `agentmail.to` domain also honor an SES account-level suppression list, populated automatically on bounce/complaint feedback and on unsubscribe clicks. Custom-domain sends do not use the shared suppression list.

## Not supported

- No API to view or clear SES account-level suppression; clearing it is support-only (support@agentmail.cc).
- Read-only block entries (`complained`, `Unsubscribed via List-Unsubscribe`) cannot be deleted via the API.
- No update/PATCH on list entries; delete and re-create instead.
- No wildcard or regex entries; only exact email addresses and exact domains.
- Blocking inbound mail does not bounce or reject it at SMTP level; it is delivered with the `blocked` label.
- No per-entry expiry or TTL on list entries.

## Errors

| Error | HTTP | Cause | Fix |
| --- | --- | --- | --- |
| `MessageRejectedError` | 403 | Send recipient matches a send block list or misses a populated send allow list; message lists each blocked recipient and reason | Delete the block entry or add the recipient to the allow list |
| `CannotDeleteError` | 409 | DELETE on a read-only entry (reason `complained` or `Unsubscribed via List-Unsubscribe`) | Do not re-enable; recipient opted out. Contact support if genuinely erroneous |
| `NotFoundError` | 404 | GET or DELETE on an entry not present in that scope's list | Check scope (org vs pod vs inbox), direction, and type |
| `ValidationError` | 400 | Invalid entry string or reason over 1,024 characters | Send a valid email address or bare domain |
| `ForbiddenError` | 403 | Create or delete attempted by an unverified organization | Verify the organization first |

## Verify

Confirm an entry exists (and see its `read_only` flag before attempting delete):

```bash
curl "https://api.agentmail.to/v0/lists/send/block/user@example.com" \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"
```

Success returns the entry object, e.g. `{"entry": "user@example.com", "direction": "send", "list_type": "block", "entry_type": "email", "reason": "bounced", ...}`. A 404 means the address is not on that list.

## Related

- [Send and reply](./send)
- [Receive email](./receive)
