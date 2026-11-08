# Student Management System

A responsive single-page application to manage student records - add, view,
search, sort, edit, and delete students with full client-side persistence.

Built as Task 1 of a Software Engineering internship.

## Features

- **Create** - Add students with roll number, name, email, phone, course, and year.
- **Read** - View all students in a sortable, searchable table.
- **Update** - Edit any record; the form pre-fills with the selected student's data.
- **Delete** - Delete with a confirmation dialog (no accidental data loss).
- **Validation** - Required fields, email format, phone format, year range (1-6),
  and duplicate roll number / email prevention.
- **Search** - Live search across name, email, roll number, and course.
- **Sort** - Newest first, name A-Z / Z-A, roll number, year ascending / descending.
- **Persistence** - Records survive page refresh via `localStorage`.
- **Responsive** - Table layout on desktop; stacked labeled cards on mobile.
- **Accessibility** - Labeled inputs, `aria-invalid` / `aria-describedby` on errors,
  keyboard-dismissable dialog (Esc), `role="status"` toast announcements.
- **Empty states** - Distinct messages for "no students yet" vs. "no search results".
- **Feedback** - Inline field errors + auto-dismissing success/error toast.

## Tech Stack

|    Layer    |            Choice              |                                          Why                                           |
|-------------|--------------------------------|----------------------------------------------------------------------------------------|
| UI          | React 18+                      | Component model, predictable state-driven rendering                                    |
| Build       | Vite                           | Fast dev server and production build                                                   |
| Styling     | Plain CSS with design tokens   | No dependency bloat; demonstrates CSS fundamentals                                     |
| Persistence | Browser `localStorage`         | Suitable for a client-only task; isolated behind a storage module for easy replacement |
| Linting     | oxlint (Vite template default) | Static checks                                                                          |

No UI component library is used - all components and styles are original.

## Getting Started

**Prerequisites:** Node.js 18 or newer, npm.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# create a production build
npm run build

# preview the production build locally
npm run preview
