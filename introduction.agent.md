# Understand what AgentMail is and pick a surface to build on

AgentMail gives AI agents their own programmable email inboxes: create an inbox, receive mail sent to it, trigger workflows on incoming messages, and send replies through one API. Use this page to decide whether AgentMail fits your use case and which access surface (CLI, MCP, Console, SDK, or raw HTTP) to start with.

## Facts

- AgentMail provides email inboxes owned by AI agents. Each inbox is a real email address the agent can hand out, receive mail into, and send from.
- The core loop on AgentMail is: create an inbox, receive mail, trigger workflows on incoming messages, send replies. All of it runs through one API.
- Agents need their own inboxes because email is the account layer of the internet: service signups, address confirmation, password resets, verification codes, receipts, and notifications all run through an inbox.
- An agent with its own AgentMail address can register for services, receive verification codes, complete verification flows unattended, and hold ongoing correspondence without borrowing a human's mailbox.
- AgentMail serves AI agents and moves both inbound and outbound mail for the agent's own inbox. SendGrid and Resend serve applications and move outbound transactional email. Mailchimp serves marketers and moves outbound broadcasts to subscriber lists. Gmail API serves a human user and gives programmatic access to that person's existing mailbox.
- AgentMail exposes five access surfaces: CLI, MCP, Console (web dashboard), SDKs (Python and TypeScript), and raw HTTP.
- Surface selection: CLI for terminal use and one-off scripted checks; MCP for MCP-capable agents and assistants operating inboxes as tools; Console for visual inspection of inboxes and messages; SDKs (Python, TypeScript) for application code; raw HTTP for languages without an SDK or dependency-free integrations.
- All access surfaces (CLI, MCP, Console, SDKs, raw HTTP) talk to the same AgentMail API.
- No SDK is required: every AgentMail operation is available over raw HTTP, so any language that can make an HTTP request can call the API.

## Not supported

- AgentMail is not a bulk marketing or broadcast tool; it does not target subscriber-list campaigns (use Mailchimp-class tools for that).
- AgentMail is not an outbound-only transactional sender for application-generated email (that is the SendGrid / Resend model); AgentMail inboxes receive mail as well as send it.
- AgentMail does not provide programmatic access to a human's existing mailbox (that is the Gmail API model); it creates inboxes owned by the agent.
- AgentMail does not require a human sitting in a mail client to operate an inbox.

## Related

- [Quickstart: create your first inbox and send a message](/quickstart)
- [Architecture: the object model behind inboxes, messages, and workflows](/architecture)
