export {};

// Create a type for the roles
export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
export interface ItemCartProps {
  name: string;
  discount?: number;
  price: number;
  colors: { name: string; color: string };
  quantity: number;
  image: string;
}
