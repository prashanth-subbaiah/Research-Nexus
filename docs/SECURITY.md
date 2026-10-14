# Showcase security and privacy

The exported website contains public informational content only. It has no authentication endpoints, database credentials, backend service keys, shared submissions, or public administrator controls. GitHub repository access controls content updates.

Only allowlisted faculty fields are included: name, designation, qualification, specialization, and the confirmed departmental role. The original personnel workbook, personal identifiers, dates of employment, private accounts, SQLite databases, `.env`, backend files, and test output are excluded from the publication package and hosted artifact.

User notes and bookmarks remain in browser localStorage. They are not sent to a server or synchronized between devices. Visitors can download a plan. Notes should not contain confidential research or sensitive personal information, particularly on shared computers. Clearing browser data removes locally saved content.

React renders user-written notes as text. Source links are curated HTTP(S) links and use `rel="noreferrer"` when opened in another tab. The local preview server restricts file access to `out/` and rejects directory traversal.

The charts contain actual directory/catalog values. Faculty-topic links indicate suggested relevance, not accepted assignments, contact authorization, availability, or scholarly authorship. No external generative service processes visitor data.

GitHub Pages is appropriate for this public academic showcase. Adding shared accounts, uploads, or private editing later would require a separately designed backend and authorization model.
