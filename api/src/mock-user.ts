import argon2 from "argon2";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}


const plainPassword = "password123";


let mockUser: User;

async function createMockUser(): Promise<User> {
  if (!mockUser) {
    const hashedPassword = await argon2.hash(plainPassword);
    mockUser = {
      id: "1",
      name: "Suraj",
      email: "suraj@example.com",
      password: hashedPassword,
    };
  }
  return mockUser;
}

export { createMockUser, plainPassword };
