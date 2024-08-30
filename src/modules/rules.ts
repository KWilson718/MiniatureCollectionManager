// src/assets/modules/rules.ts
export const rules = {
    required: [(v: string) => !!v || 'Required Field'], // Ensure this is an array of functions
    minLength: (v: string, length: number) => v.length >= length || `Minimum ${length} Characters`,
};
