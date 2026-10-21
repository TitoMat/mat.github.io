# Automation Portfolio

A static, privacy-safe portfolio site for an **AI Automation & Systems Engineer** looking for
part-time freelance automation work.

Plain HTML, CSS, and a single small vanilla JavaScript file. No framework, no build step, no
backend, no API keys, no analytics, no external runtime dependencies. It runs from any static
host and works on GitHub Pages using relative paths only.

> **Status:** all placeholders are resolved — the site is filled in with the real name, email,
> and LinkedIn URL, and no `PLACEHOLDER` comments remain. See
> [Resolved placeholders](#resolved-placeholders).

---

## Files

| File           | Purpose                                                                     |
| -------------- | --------------------------------------------------------------------------- |
| `index.html`   | All page content, sections, and inline SVG diagrams + wireframes (drawn from scratch) |
| `styles.css`   | Design system, layout, responsive rules, print styles                        |
| `script.js`    | Mobile nav, active section highlighting, reveal-on-scroll, footer year       |
| `README.md`    | This file                                                                    |

No other files are required. No `package.json`, no lockfile, no assets folder.

---

## Run locally

Any static file server works. From this directory:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or simply open `index.html` directly in a browser — everything is relative, so `file://` works
too.

---

## Publish to GitHub Pages (when you are ready)

These are the steps only — nothing has been created, pushed, or deployed.

1. Create a new repository, e.g. `automation-portfolio` (public).
2. Copy these four files into the repository root.
3. Commit and push to the default branch.
4. In the repository: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / root**.
5. The site appears at `https://<username>.github.io/automation-portfolio/`.

All references are relative (`styles.css`, `script.js`, `#anchors`), so the site works from a
sub-path as well as from a domain root.

---

## Sections

| Section            | Notes                                                                          |
| ------------------ | ------------------------------------------------------------------------------ |
| Hero               | Role headline, positioning, availability                                       |
| About              | Working style, engagement facts card                                           |
| Technical Skills   | Four groups: automation, applied AI, data/scripting, systems/delivery          |
| Case study         | One deep study of a platform you built, with five from-scratch SVG graphics     |
| Engineering approach | Six numbered principles                                                      |
| Private demonstrations | What can be shown live, and what cannot                                     |
| Contact            | Email and LinkedIn links, availability                                          |

### Case study

A single, deliberately deep study — **Ingestion, extraction & AI analysis pipeline** — described
across three architecture diagrams and two interface wireframes:

1. **End-to-end flow** — intake → canonical storage with checksum → durable job + manifest →
   worker claim/verify/extract → schema-constrained AI analysis → chunked, embedded, searchable
   records.
2. **Extraction decision tree** — native text vs OCR vs image vs Office, with the sandboxed
   parser and the guards that apply on every path.
3. **Job lifecycle** — queued → claimed → processing → completed, with error, retry and
   lease-expiry recovery paths.
4. **Orchestration console wireframe** — a visual workflow editor with a split/merge canvas and
   an executions panel showing retries.
5. **Operations console wireframe** — a dashboard reporting queue, storage and model *state*
   above a job table with attempt counts.

The two wireframes are hand-drawn `<svg>` mockups, not screenshots. They are deliberately drawn
to look like real UI, so the rule that matters most is below.

Content rules applied:

- It describes a real internal platform you designed and owned — not a fictional or client
  engagement, and it does not imply one.
- The organisation, business domain, data, model identities, endpoints, hostnames, repository
  details and table names are omitted.
- Only open-source tooling is named (Node.js, BullMQ, Redis, PostgreSQL/pgvector, OCRmyPDF,
  Tesseract, Poppler, n8n, launchd/systemd, Docker, NestJS, React).
- No invented performance metrics and no claimed deployment outcomes or production status.
- Every mechanism described is grounded in real source code, not a generic pattern.
- All five graphics were drawn from scratch in inline SVG — never screenshots of a real system.
- **The wireframes are the highest-risk element on the site.** Because they depict UI, a reader
  will assume they are screenshots. Before publishing, confirm that every workflow name, run id,
  job id, timestamp and label on them is invented, and that nothing about them identifies the
  client organisation, its sector, or the real tooling. If a value on a wireframe is true of the
  real system, change it — it should not be possible to learn anything from it.
- Wireframes show *state* ("draining", "verified", attempt counts) rather than volumes, rates or
  durations, so nothing on them can be misread as a performance claim.
- The study carries an explicit confidentiality note stating that no screenshots appear anywhere
  on the site.
- The study carries an explicit confidentiality note.

**Before publishing:** re-read the case study with fresh eyes and confirm you are comfortable
naming the stack and the shape of this system publicly. It is written to be safe, but it is the
one piece of content on this site derived from a real private project.

---

## Resolved placeholders

All placeholder values have been replaced, so there are no `PLACEHOLDER` comments left in the
source. The site now carries:

| # | Item            | Value                                     | Where                                       |
| - | --------------- | ----------------------------------------- | ------------------------------------------- |
| 1 | Full name       | `Mat`                                     | `<title>`, meta author, brand, hero, footer |
| 2 | Email address   | `matorlino@gmail.com`                     | Contact section (`mailto:`)                 |
| 3 | LinkedIn        | `https://www.linkedin.com/in/mat-orlino-a1b20637/` | Contact section                    |

These two are the only outbound links on the page; everything else is an in-page `#anchor`.
The GitHub contact item was removed — there is no GitHub link in the site.

Also worth reviewing (optional, not blockers):

- Hero availability line ("Available for part-time freelance engagements").
- The facts card in the About section (availability, working mode, engagement types).
- "I reply to every serious enquiry" and the response-time wording in Contact.

---

## Privacy & security review

Reviewed before handover. Summary of what was checked and what holds by construction:

- **No third-party requests.** No CDN, no web fonts, no analytics, no tag manager, no embedded
  widgets, no iframe embeds. The only `https://` values in the source are the two contact
  links in `<a href>`.
- **No cookies, no storage, no fingerprinting.** `script.js` writes nothing to
  `localStorage`/`sessionStorage`/cookies and sends nothing over the network.
- **No secrets.** No API keys, tokens, or credentials anywhere in the source.
- **Self-contained favicon.** The icon is an inline `data:image/svg+xml` URI, so no extra request.
- **Content exposure.** The case study carries no organisation, domain, endpoint, path, volume or
  metric detail, and no confidential material was copied in from any existing project.
- **Third-party script surface.** Zero external scripts, so no supply-chain or integrity risk.
- **Anchors validated.** Every in-page `href="#…"` resolves to an existing element id.
- **Accessibility.** Semantic landmarks, skip link, labelled SVG diagrams (`role="img"` +
  `<title>`/`<desc>`), `aria-expanded`/`aria-controls` on the menu toggle, visible focus styles,
  keyboard-dismissable mobile menu (Escape), and `prefers-reduced-motion` support.
- **Contrast.** Body text and muted text exceed WCAG AA on the charcoal background; the orange
  accent is used for large text, borders, and dark-on-accent buttons only.

If you later add analytics, fonts, or embeds, this stops being a zero-third-party-request site —
add them deliberately and update this section.

---

## Customisation

- **Colours** — all tokens live in `:root` at the top of `styles.css`. Change `--accent` to
  retune the whole site; `--bg`, `--surface`, `--border`, and the `--text*` set control the
  charcoal base.
- **Diagrams & wireframes** — the case study has five inline `<svg>` elements, each with its own
  `viewBox` and a unique `<marker>` id. The three architecture diagrams use the `dg-*` classes
  (`.dg-box`, `.dg-accent`, `.dg-arrow`, `.dg-label`, `.dg-sub`); the two UI wireframes use the
  `wf-*` classes (`.wf-frame`, `.wf-node`, `.wf-panel`, `.wf-label`, `.wf-sub`). Keep the class
  names and the styling follows the theme automatically. If you add another diagram, scope its
  `marker-end` via the `[data-diagram="…"]` selectors in `styles.css`.
- **Sections** — each section is a self-contained `<section id="…">`; copy a card or case study
  block to add one, and add a matching `.nav-link` in the header.
- **Motion** — reveal animations only run when JavaScript is enabled and are disabled for users
  who prefer reduced motion.

---

## Notes

- Verified locally only. Not committed, not pushed, not published, not deployed.
- No repository has been created for this work.
