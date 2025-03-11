# Layouts Documentation

This folder contains Vue layout components used in the application. Below is a brief description of each layout:

## Contents

- **clean.vue**: A clean layout with minimal design, including a navigation bar and footer.
- **default.vue**: The default layout with a standard navigation bar and footer.
- **pratice.vue**: A layout specifically designed for practice sessions, featuring a full-height main section.

## Layout Details

### clean.vue
- **Description**: A minimalistic layout with a clean design.
- **Components Used**: `LayoutsNavClean`
- **Styles**:
  - `.app`: Grid layout with three areas: nav, main, and foot.
  - `.hideFooter`: Hides the footer.
  - `.justify`: Justifies text alignment.
  - `.no-text-decoration`: Removes text decoration.

### default.vue
- **Description**: The default layout used throughout the application.
- **Components Used**: `LayoutsNav`
- **Styles**:
  - `.app`: Grid layout with three areas: nav, main, and foot.
  - `.hideFooter`: Hides the footer.
  - `.justify`: Justifies text alignment.
  - `.no-text-decoration`: Removes text decoration.

### pratice.vue
- **Description**: A layout designed for practice sessions with a full-height main section.
- **Styles**:
  - `#main-pratice`: Sets the height to 100vh.