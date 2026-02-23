/**
 * Central color palette for the TodoList application.
 * All hardcoded color strings should be replaced with references to this object.
 *
 * Grouping:
 *  - brand      → the core brown palette (primary UI)
 *  - accent     → orange-brown CTAs and interactive highlights
 *  - surface    → backgrounds and card surfaces
 *  - border     → dividers and field outlines
 *  - status     → semantic colors (success / warning / danger)
 *  - sidebar    → colors exclusive to the navigation drawer
 *  - badge      → colors for sidebar badge chips
 */
export const colors = {
  // ─── Brand (brown scale) ────────────────────────────────────────────────────
  /** Primary heading / icon color */
  primary:        '#5c3d26',
  /** Slightly lighter brown — logo, active sidebar item */
  primaryLight:   '#684e39',
  /** Label color for form fields and sub-headings */
  secondary:      '#836650',

  // ─── Accent (orange-brown CTAs) ─────────────────────────────────────────────
  /** Main CTA — buttons, active indicators */
  accent:         '#c8845a',
  /** Darker shade used on hover */
  accentDark:     '#b0734d',

  // ─── Surface (backgrounds) ──────────────────────────────────────────────────
  /** Pure white — cards, form, task rows */
  white:          '#ffffff',
  /** Slightly warm white — field backgrounds */
  fieldBg:        '#faf8f6',
  /** Warm page background — sidebar */
  sidebarBg:      '#faf6f2',
  /** Subtle warm gray — completed task rows */
  completedRowBg: '#fafafa',
  /** Lightest brown tint — "Total Tasks" card background */
  totalCardBg:    '#f5f0ec',
  /** Pending tasks card background */
  pendingCardBg:  '#fef5ee',
  /** Completed tasks card background */
  completedCardBg: '#eaf6ea',

  // ─── Border / Divider ───────────────────────────────────────────────────────
  /** Standard card and drawer border */
  border:         '#e8ddd4',
  /** Thinner input field border */
  fieldBorder:    '#efe4d9',

  // ─── Status ─────────────────────────────────────────────────────────────────
  /** Completed / success green */
  green:          '#3CB371',
  /** Success text */
  greenText:      '#1a7d1a',
  /** Pending / warning orange */
  orange:         '#F4A261',
  /** Danger / delete red */
  danger:         '#eb5757',

  // ─── Sidebar specific ───────────────────────────────────────────────────────
  /** Active sidebar list item text/icon */
  sidebarActive:  '#7a5c44',
  /** Inactive sidebar list item text/icon */
  sidebarInactive: '#a08068',
  /** Inactive sidebar hover background */
  sidebarHover:   '#f0e8df',
  /** Sidebar sub-label ("Tasks manager") */
  sidebarSubLabel: '#b09070',
  /** Logout button background */
  logoutBg:       '#f0cbc5',
  /** Logout button hover background */
  logoutHoverBg:  '#efb59d',
  /** Logout button text / hover icon */
  logoutText:     '#836650',
  /** Logout button hover text */
  logoutHoverText: '#684e39',

  // ─── Badge chips (sidebar) ──────────────────────────────────────────────────
  badgeTotal:     '#c8a98a',
  badgePending:   '#e07b5a',
  badgeDone:      '#7aab8a',
} as const;

export type AppColor = keyof typeof colors;
