# Place any AgentMail primitive in the object tree and predict request path shape from key scope

This page maps AgentMail's containment hierarchy (Organization > Pod > Inbox > Messages/Threads/Drafts) and the rule that decides which pod a call targets: pod- and inbox-scoped keys resolve the pod from the key; org-scoped keys target the pod named in the path, and unprefixed paths fall back to org-wide reads and default-pod writes. Use it before building against any endpoint to know whether a `/pods/{pod_id}` segment is needed.

## Do this

Check what a key is scoped to before writing calls against it:

```bash
curl https://api.agentmail.to/v0/auth/me \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"
```

Read `scope_type` in the response. If `scope_type` is `organization`, include `/pods/{pod_id}` in paths whenever you mean a specific pod (example: `/v0/pods/{pod_id}/inboxes`); unprefixed writes such as `POST /v0/inboxes` succeed but create in the organization's default pod. If `scope_type` is `pod` or `inbox`, omit the pod segment; the key resolves scope on its own.

## Facts

- Base URL for all API requests: `https://api.agentmail.to/v0`.
- Authentication header: `Authorization: Bearer <key>`.
- Containment hierarchy: Organization contains Pods; a Pod contains Inboxes; an Inbox contains Messages, Threads, and Drafts.
- Every message, thread, and draft belongs to exactly one inbox.
- A pod is the unit of multi-tenancy: one pod per customer isolates each tenant's inboxes and mail.
- Domains belong to a pod.
- API keys are scoped to an organization, a pod, or an inbox.
- Webhooks attach at organization, pod, or inbox level.
- Lists (allow/block, per direction: send, receive, reply) exist at organization, pod, or inbox level.
- Labels are tags on messages and threads; system labels (sent, received, bounced) are managed by AgentMail.
- WebSocket connections stream events for inboxes within the connecting key's scope.
- `GET /v0/auth/me` returns the caller's scope; response fields: `scope_type`, `scope_id`, `organization_id`, `pod_id`, `inbox_id`, `api_key_id`.
- `scope_type` is one of exactly: `organization`, `pod`, `inbox`.
- `scope_id` equals the inbox id when `scope_type` is `inbox`, the pod id when `pod`, the organization id when `organization`.
- `organization_id` is always present in the `GET /v0/auth/me` response.
- `pod_id` is present only when `scope_type` is `pod` or `inbox`.
- `inbox_id` is present only when `scope_type` is `inbox`.
- `api_key_id` is present only when the caller authenticated with an API key; absent for JWT and proxy credentials.
- Path rule: keys with `scope_type` of `pod` or `inbox` never include a `/pods/{pod_id}` segment. Keys with `scope_type` of `organization` include `/pods/{pod_id}` to target a specific pod.
- With an org-scoped key, unprefixed paths do not error: reads (`GET /v0/inboxes`) return resources across all pods in the organization; writes (`POST /v0/inboxes`) create in the organization's default pod.
- Every organization has a default pod; unprefixed writes with an org-scoped key land there.

## Not supported

- Request paths never include an organization segment; the organization is implied by the key.
- Targeting a specific non-default pod with an org-scoped key on an unprefixed path: not possible. The unprefixed write silently creates in the default pod instead of failing — name `/pods/{pod_id}` in the path.
- A message cannot belong to more than one inbox.

## Verify

```bash
curl https://api.agentmail.to/v0/auth/me \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"
```

Success is a `200` JSON body containing `scope_type` (`organization`, `pod`, or `inbox`), `scope_id`, and `organization_id`. `pod_id` appears for pod- and inbox-scoped keys; `inbox_id` appears for inbox-scoped keys; `api_key_id` appears only for API-key callers.

## Related

- [Introduction](/introduction)
- [Quickstart](/quickstart)
