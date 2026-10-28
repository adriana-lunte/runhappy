# Schemas

Zod schemas for form and API data. Export the schema and its type:

```ts
export const signUpSchema = z.object({ email: z.email() });
export type SignUp = z.infer<typeof signUpSchema>;
```
