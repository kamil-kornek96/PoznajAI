export interface UserModel {
    id: number;
    username: string;
    passwordHash: string;
    passwordSalt: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
  }
  
  