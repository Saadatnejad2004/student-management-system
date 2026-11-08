# Testing Report - Student Management System

**Environment:** Chrome / Firefox / Edge, Node.js 18+, `npm run dev` (Vite dev server)
**Tester:** Amir Hossein Saadatnejad
**Date:** 2026-11-07

All tests executed manually against the running application. Each test was run
from a clean state (localStorage cleared via DevTools -> Application -> Storage -> Clear).

## Functional Tests

| ID  |            Test                  | Steps | Expected | Result |
|-----|----------------------------------|-------|----------|--------|
| T01 | Empty initial state              | Load app with cleared storage | Form shown; "No students yet" empty state; 0 students count | PASS |
| T02 | Submit empty form        | Click "Add Student" with all fields blank | All 6 fields show inline errors; red toast "Please fix the highlighted fields" | PASS |
| T03 | Invalid email                    | Enter `abc` in email, valid rest | Error "Enter a valid email address."; record not saved | PASS |
| T04 | Invalid phone                    | Enter `12ab` in phone | Error "Phone must be 7-15 digits (optional leading +)." | PASS |
| T05 | Invalid year                     | Enter `2024` in year | Error "Year must be between 1 and 6." | PASS |
| T06 | Fractional year                  | Enter `2.5` in year | Error "Year must be a whole number." | PASS |
| T07 | Duplicate email                | Save student A with `a@x.com`; add student B with `a@x.com` | Error "This email is already registered."; B not saved | PASS |
| T08 | Duplicate email, different case  | Add `A@X.com` after `a@x.com` exists | Blocked as duplicate (case-insensitive) | PASS |
| T09 | Duplicate roll number            | Add two students with roll `S-001` | Second blocked: "This roll number is already in use." | PASS |
| T10 | Create student                   | Fill all fields with valid data, submit | Toast "Student added successfully."; form clears; row appears at top | PASS |
| T11 | Persistence                      | Create student, hard-refresh the page | Student still visible; count unchanged | PASS |
| T12 | Newest-first ordering            | Add three students in sequence | Newest record appears first | PASS |
| T13 | Search                           | Type part of a name / email / roll / course | List filters live; count updates | PASS |
| T14 | No search results                | Search `zzzzz` | "No matching students" state with hint text | PASS |
| T15 | Clear search                     | Clear search input | Full list returns | PASS |
| T16 | Sort options                    | Switch through all six sort options | List reorders correctly each time (name A-Z/Z-A, roll, year 1-6, 6-1, newest) | PASS |
| T17 | Edit pre-fill                    | Click Edit on a row | Form title "Edit Student"; all fields pre-filled; row highlighted | PASS |
| T18 | Edit save                  | Change course, click "Save Changes" | Row updates; toast "Student updated successfully."; highlight removed; form resets | PASS |
| T19 | Edit duplicate exclusion         | Edit a student without changing email, save | No duplicate error (editing record excluded from duplicate check) | PASS |
| T20 | Cancel edit                      | Click Edit, then Cancel | Form resets; no changes saved; highlight removed | PASS |
| T21 | Delete confirmation              | Click Delete on a row | Dialog opens showing student's name and roll number | PASS |
| T22 | Escape closes dialog             | Open delete dialog, press Esc | Dialog closes; nothing deleted | PASS |
| T23 | Overlay click closes             | Open dialog, click outside it | Dialog closes; nothing deleted | PASS |
| T24 | Cancel deletion                  | Open dialog, click Cancel | Dialog closes; record still present | PASS |
| T25 | Confirm deletion                 | Open dialog, click Delete | Row removed; toast "Student deleted." | PASS |
| T26 | Deleting the record being edited | Start editing student A, delete student A | Record deleted; form resets to "Add Student" | PASS |
| T27 | Deleting last record             | Delete all records | "No students yet" empty state returns | PASS |
| T28 | XSS safety                       | Add student named `<script>alert(1)</script>` | Text rendered literally; no script executes | PASS |
| T29 | Long input                       | Paste a 200-character name            | Field accepted up to max; validation rejects >60 chars with clear message | PASS |
| T30 | Unicode names                    | Add student named `علی` / `José Müller` | Accepted and displayed correctly | PASS |
| T31 | Phone formatting tolerance       | Add phone `(0912)-345-6789`             | Accepted after normalization | PASS |
| T32 | Responsive layout                | Resize browser to ≤720px width          | Table becomes stacked cards with field labels | PASS |
| T33 | Accessibility                    | Tab through form and dialog             | All controls focusable; labels announced; Esc closes dialog | PASS |

## Edge Cases Verified

- Whitespace-only input is rejected (fields are trimmed before validation).
- Empty year is rejected (not silently converted to 0).
- Deleting while editing does not leave the form in an inconsistent state.
- Corrupted localStorage data returns an empty list instead of crashing the app.

## Known Limitations

- Persistence is browser-local (`localStorage`), so data does not sync across
  devices or browsers. A backend is listed as a future improvement.
- No automated tests yet; validation is a pure module and is ready for Vitest.

## How to Reproduce

1. `npm install && npm run dev`
2. Open http://localhost:5173
3. Follow the steps column above; use DevTools -> Application -> localStorage to
   verify the `sms.students.v1` key after each create/update/delete.
