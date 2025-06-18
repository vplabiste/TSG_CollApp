
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth, db } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, type DocumentSnapshot } from 'firebase/firestore';
import type { User, UserRole } from '@/lib/auth-constants';
import { loginSchema, type LoginFormInputs, signupSchema, type SignupFormInputs } from '@/lib/auth-schemas';

export interface AuthResult {
  success: boolean;
  message?: string;
  redirectTo?: string;
}

const hardcodedUsers = [
  { email: 'admin@collapp.app', password: 'AdminPass123!', role: 'admin' as UserRole, name: 'Admin User COLLAPP' },
  { email: 'schoolrep@collapp.app', password: 'RepPass123!', role: 'schoolrep' as UserRole, name: 'School Rep User COLLAPP' },
  { email: 'student@collapp.app', password: 'StudentPass123!', role: 'student' as UserRole, name: 'Student User COLLAPP' },
];

export async function loginUser(data: LoginFormInputs): Promise<AuthResult> {
  try {
    const validatedData = loginSchema.parse(data);

    let userCredential: UserCredential;
    try {
      userCredential = await signInWithEmailAndPassword(auth, validatedData.email, validatedData.password);
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        const hardcodedUser = hardcodedUsers.find(u => u.email === validatedData.email && u.password === validatedData.password);
        if (hardcodedUser) {
          if (validatedData.userType && hardcodedUser.role !== 'admin' && hardcodedUser.role !== validatedData.userType) {
            return { success: false, message: `This account is not a ${validatedData.userType} account.` };
          }
          
          let redirectTo = '/';
          switch (hardcodedUser.role) {
            case 'admin':
              redirectTo = '/admin';
              break;
            case 'schoolrep':
              redirectTo = '/schoolrep';
              break;
            case 'student':
              redirectTo = '/student';
              break;
            default:
              return { success: false, message: 'Unknown user role for hardcoded user.' };
          }
          redirect(redirectTo); 
        }
        return { success: false, message: 'Invalid email or password.' };
      }
      console.error('Firebase Auth login error:', error);
      return { success: false, message: 'An unexpected error occurred during login. Please try again.' };
    }

    const firebaseUser = userCredential.user;
    if (!firebaseUser || !firebaseUser.uid) {
        return { success: false, message: 'Failed to retrieve user information.' };
    }

    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDocSnap: DocumentSnapshot = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return { success: false, message: 'User profile not found. Please contact support.' };
    }

    const userDataFromFirestore = userDocSnap.data() as Omit<User, 'uid' | 'email'>;
    const userRole = userDataFromFirestore.role;

    if (validatedData.userType && userRole !== 'admin' && userRole !== validatedData.userType) {
        return { success: false, message: `This account is not a ${validatedData.userType} account.` };
    }
    
    let redirectTo = '/';
    switch (userRole) {
      case 'admin':
        redirectTo = '/admin';
        break;
      case 'schoolrep':
        redirectTo = '/schoolrep';
        break;
      case 'student':
        redirectTo = '/student';
        break;
      default:
        return { success: false, message: 'Unknown user role.' };
    }
    
    redirect(redirectTo); 

  } catch (error) {
    if (typeof error === 'object' && error !== null && (error as any).digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors.map(e => e.message).join(' ') };
    }
    console.error('Login process error:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}

export async function registerStudent(data: SignupFormInputs): Promise<AuthResult> {
  try {
    const validatedData = signupSchema.parse(data);

    let userCredential: UserCredential;
    try {
      userCredential = await createUserWithEmailAndPassword(auth, validatedData.email, validatedData.password);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        return { success: false, message: 'An account with this email already exists.' };
      }
      console.error('Firebase Auth registration error:', error);
      return { success: false, message: 'Failed to create account. Please try again.' };
    }
    
    const firebaseUser = userCredential.user;
    if (!firebaseUser) {
        return { success: false, message: 'Failed to create user account details.' };
    }

    const newUser: Omit<User, 'uid' | 'email'> = { 
      name: validatedData.name,
      role: 'student',
    };

    try {
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
    } catch (firestoreError) {
      console.error('Firestore user creation error:', firestoreError);
      return { success: false, message: 'Account created, but failed to save profile. Please contact support.' };
    }
    
    redirect('/student');

  } catch (error) {
    if (typeof error === 'object' && error !== null && (error as any).digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors.map(e => e.message).join(' ') };
    }
    console.error('Registration process error:', error);
    return { success: false, message: 'An unexpected error occurred during registration. Please try again.' };
  }
}
