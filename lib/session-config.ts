/**
 * Edge-safe session constants (no node:crypto here) so both the edge middleware
 * and the Node-runtime auth module can share them without pulling crypto into
 * the edge bundle.
 */
export const SESSION_COOKIE = "othayoth_stay";
