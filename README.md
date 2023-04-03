# Anki-UI

This project uses Anki-Connect to display anki cards, statistics and additional information from Anki app.

## Setting up

1. Open Anki and download an add-on 2055492159 (https://ankiweb.net/shared/info/2055492159) (AnkiConnect)
2. Change ad-config so instead of

```
"webCorsOriginList": [
        "localhost"
]
```

it would say

```
"webCorsOriginList": [
        "*"
]
```

3. In browser go to http://localhost:8765/ and check that text "AnkiConnect v.\*" is visible.
4. Keep Anki app must be opened at all times. In Anki add-on with number 2055492159 must be installed,
