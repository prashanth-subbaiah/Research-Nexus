# Showcase verification

The current test suite targets the exported, server-independent website. It verifies:

1. College identity and crest, seven source-linked catalog records, 29 faculty profiles, correct cursor styles, no runtime `/api/` calls, and absence of account/team controls.
2. Faculty directory rendering, Dr. Suresh G's Head of Department label, faculty search, and specialization-to-topic connections.
3. Keyword search, subject and experience filters, empty states, and filter reset.
4. Browser-saved topics, checklist/notes persistence after refresh, and a downloadable Markdown research plan.
5. Actual-value charts and downloadable CSV summary.
6. Mobile layout without horizontal overflow, navigation, faculty rendering, and the getting-started guide.

## Results — 14 October 2026

- `npm run build:pages`: production compilation, type checking, and static export passed.
- The final build used `NEXT_PUBLIC_BASE_PATH=/research-nexus` and the local static preview served that repository prefix.
- `TEST_BASE_URL=http://127.0.0.1:3002/research-nexus/ npx playwright test`: **6 passed** in the final 4.1-second run.
- The suite observed zero `/api/` requests and ran without a backend.
- Source-link, faculty, topic and subject metrics were checked against the bundled records. SVG chart sectors/bars were checked for rendering; desktop/mobile screenshots were inspected.
- The crest loads correctly from a repository-prefix URL. Mobile width 390 × 844 has no horizontal overflow.
- Browser checklist/notes persisted through a refresh, and Markdown/CSV downloads were produced.

The exact GitHub repository URL is not yet supplied. GitHub's live deployment is not verified until the project is uploaded and its Actions workflow finishes successfully. Local tests do not establish universal browser compatibility, accessibility conformance, or external dataset availability indefinitely.
