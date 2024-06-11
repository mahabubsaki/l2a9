const SCHEMA_NAMES = ['sign-up'] as const;

// Step 2: Create a type from the array
export type TSchema = typeof SCHEMA_NAMES[number];