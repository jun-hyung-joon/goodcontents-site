# goodcontents.co.kr

GOOD CONTENTS studio site, built by GitHub Pages (Jekyll).

## Add a devlog entry

1. Upload images to `assets/devlog/YYYY-MM-DD/` (e.g. `cover.jpg`, `01.jpg`). Keep each under ~1 MB.
2. Create `_posts/YYYY-MM-DD-short-title.md`:

```markdown
---
layout: post
title: "Title of the update"
summary: "One sentence shown on the card."
image: /assets/devlog/YYYY-MM-DD/cover.jpg
---

A few short paragraphs.

![Caption](/assets/devlog/YYYY-MM-DD/01.jpg)
*Caption text*
```

The newest three entries appear on the home page automatically; all entries are listed at `/devlog/`.
