# KPI Gadget

A Jira dashboard gadget that displays KPI (Key Performance Indicator) metrics in a visually appealing card format.

## Features

- **Customizable KPI Display**: Show label, value, unit, and target
- **Trend Indicator**: Visual trend display with:
  - Colors: Green (up/rise), Red (down/fall), Yellow (stable)
  - Arrows: ↑ (up), ↓ (down), → (stable)
  - French labels: Hausse, Baisse, Stable
- **Progress Bar**: Visual progress indicator
- **UTF-8 Support**: Proper handling of special characters (accented characters, etc.)

## Configuration

When adding the gadget to a Jira dashboard, you can configure:

| Field | Description |
|-------|-------------|
| Label | KPI name/title |
| Value | Current KPI value |
| Unit's label | Unit of measurement (e.g., %, count, €) |
| Trend | Direction indicator (Hausse/Baisse/Stable) |
| Target | Target value to achieve |

## Tech Stack

- **Forge**: Atlassian's app framework for Jira
- **React**: UI library
- **Atlaskit**: Atlassian's design system components

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick Start

- Install top-level dependencies:
```
npm install
```

- Install dependencies (inside the `static/kpi-gadget` directory):
```
cd static/kpi-gadget && npm install
```

- Modify the app by editing files in `static/kpi-gadget/src/`

- Build the app:
```
cd static/kpi-gadget && npm run build
```

- Deploy the app:
```
forge deploy
```

- Install your app on an Atlassian site:
```
forge install
```

### Notes

- Use `forge deploy` to persist code changes
- Use `forge install` to install the app on a new site
- Once installed, the site automatically picks up deployed changes
