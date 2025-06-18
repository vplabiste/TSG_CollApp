
export type UserRole = 'student' | 'schoolrep' | 'admin';

export interface User {
  uid: string;
  email: string | null;
  role: UserRole;
  name: string;
}
