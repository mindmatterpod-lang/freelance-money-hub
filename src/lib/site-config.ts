// Site-wide constants that were previously duplicated (and, in the case of
// the email, silently broken) across multiple files.
//
// SUPPORT_EMAIL is still a placeholder — "hello@freelancerate.example" uses
// the reserved .example TLD, which can never receive mail. Nobody could
// confirm a real, owned mailbox to replace it with, so it's centralized
// here as a single line to change once one exists, rather than fixed with
// a guessed address that might be unclaimed or belong to someone else.
export const SUPPORT_EMAIL = "hello@freelancerate.example";

export const BRAND_NAME = "FreelanceRate";
