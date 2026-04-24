# Bug Report

Generate a professional bug report based on the description provided. If no description is given, ask the user to describe what went wrong.

Use the following structure to produce a complete, well-written bug report ready to be filed in a tool like Jira, Linear, or GitHub Issues.

---

## How to interpret the input

The user may give you:
- A brief description ("the cart badge doesn't update when you add an item")
- A failed test output (paste from terminal)
- A screenshot description or error message
- A mix of the above

Extract as much as you can from what's given. Where information is missing (e.g. exact steps, environment), make a reasonable inference based on the project context and flag it with `[to confirm]` so the user knows to verify it.

---

## Bug report format

### Title
A single line in the format: `[Component] Short description of the failure`
- Keep it under 80 characters
- Use present tense ("Cart badge does not update" not "Cart badge didn't update")
- Be specific enough that someone can understand the bug without reading further

### Environment
- **App**: (infer from project context — e.g. Saucedemo, Automation Exercise)
- **Browser**: (infer from test project if available, otherwise `[to confirm]`)
- **Test file**: (if raised from a test failure, include the spec file and test name)

### Summary
2–3 sentences describing the bug in plain English. What is broken, what impact does it have, and is it consistent or intermittent?

### Steps to Reproduce
Numbered steps starting from a clean state. Be specific — include URLs, credentials, data used, and exact actions taken.

### Expected Behaviour
What should happen according to the requirements or user expectation.

### Actual Behaviour
What actually happens. Include exact error messages, screenshots references, or assertion failures if available.

### Severity
Choose one and justify briefly:
- **Critical** — blocks core user journey, no workaround
- **High** — significant impact, workaround exists but is painful
- **Medium** — noticeable issue, reasonable workaround available
- **Low** — minor issue, cosmetic, or edge case

### Priority
Choose one:
- **P1** — fix immediately, holds up release
- **P2** — fix this sprint
- **P3** — fix when capacity allows
- **P4** — nice to have / backlog

### Additional Notes
Any relevant context: related tests, known similar bugs, affected user types, or suggested investigation starting point.

---

## Tone and style

- Write in clear, professional English
- Be factual and objective — describe what happened, not who caused it
- Avoid vague language like "it doesn't work" or "something is wrong"
- A good bug report should be reproducible by someone who has never seen the issue before
