# goodcontents.co.kr

GOOD CONTENTS studio site, built by GitHub Pages (Jekyll).

- `/` studio home: games, latest news, about
- `/games/<name>/` one page per game
- `/news/` all news

## Add news

Upload the image or clip to `assets/news/`, then create `_posts/YYYY-MM-DD-short-title.md`:

```markdown
---
title: "Title"
media: /assets/news/2026-11-01.jpg   # jpg/png/webp, or mp4 (plays muted, looped)
youtube: ""                          # or a YouTube embed URL instead of media
---
One or two lines.
```

## Add a game

Add an entry to `_data/games.yml`. For a game page, copy `games/samjoko/` and set its `url`.

## Images

Write file paths in `_data/media.yml` (sizes are noted there).
