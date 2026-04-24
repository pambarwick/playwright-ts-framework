# Test Review

Review the test file currently open in the editor (or the file path provided as an argument). Analyse it from the perspective of an experienced QA automation engineer and produce a structured review covering the following areas:

## What to check

**Assertions**
- Are there enough assertions to actually verify behaviour, or does the test just click through without checking anything meaningful?
- Are assertions too broad (e.g. just checking visibility) when they could be more specific (checking exact text or value)?
- Are negative assertions (`.not.`) used appropriately?

**Test independence**
- Does each test set up its own state, or does it rely on a previous test having run first?
- Would any test fail if run in isolation or in a different order?

**Flakiness risk**
- Are there hardcoded waits (`page.waitForTimeout`, `cy.wait(5000)`) that should be replaced with proper assertions?
- Are selectors fragile (positional, based on index, or tied to styling classes that could change)?
- Are selectors using stable attributes like `data-test`, `aria-label`, or `getByRole`?

**Test naming**
- Does the test name clearly describe the behaviour being tested (not just "test 1" or "clicks button")?
- Would a non-technical stakeholder understand what the test covers from the name alone?

**Coverage**
- Are the happy path, sad path (error states), and edge cases represented?
- Is anything obviously missing given what the page or feature does?

**Page Object usage**
- Are page interactions going through page objects, or is there raw selector logic directly in the test?
- Is there any duplication that belongs in a shared helper or fixture?

## Output format

Provide your review in this structure:

### Summary
One or two sentences on the overall quality.

### Issues Found
List each issue with:
- **Severity**: Low / Medium / High
- **What**: What the problem is
- **Where**: Line number or test name
- **Fix**: Concrete suggestion to resolve it

### What's Done Well
Call out two or three things that are genuinely good practice.

### Suggested Improvements
Any broader suggestions that aren't bugs but would raise the quality of the suite.

Be direct and specific. Refer to actual line numbers and test names where possible.
