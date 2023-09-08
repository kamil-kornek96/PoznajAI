export interface UserModel {
    id: number;
    username: string;
    passwordHash: string;
    passwordSalt: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Role[];
  }
  
  export enum UserRole {
    User = 0,
    // Dodaj inne role, jeśli są dostępne
  }
  
  export interface Role {
    id: number;
    name: UserRole;
    userId: number;
  }
  