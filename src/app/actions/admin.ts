'use server';

import { adminDb } from '@/lib/firebase-admin';
import type { User } from '@/lib/auth-constants';

export async function getDashboardStats() {
  try {
    const usersSnapshot = await adminDb.collection('users').get();
    const totalUsers = usersSnapshot.size;

    const studentsSnapshot = await adminDb.collection('users').where('role', '==', 'student').get();
    const totalStudents = studentsSnapshot.size;

    const schoolRepsSnapshot = await adminDb.collection('users').where('role', '==', 'schoolrep').get();
    const totalSchoolReps = schoolRepsSnapshot.size;
    
    // Placeholder for colleges
    const totalColleges = 0;

    return {
      totalUsers,
      totalStudents,
      totalSchoolReps,
      totalColleges,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalUsers: 0,
      totalStudents: 0,
      totalSchoolReps: 0,
      totalColleges: 0,
    };
  }
}

export async function getRecentUsers(): Promise<User[]> {
    try {
        const usersSnapshot = await adminDb.collection('users')
            .orderBy('createdAt', 'desc')
            .limit(5)
            .get();

        if (usersSnapshot.empty) {
            return [];
        }

        return usersSnapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data()
        } as User));
    } catch (error) {
        console.error("Error fetching recent users:", error);
        // This can fail if 'createdAt' fields don't exist on older documents.
        // It's safe to return an empty array in this case.
        return [];
    }
}

export async function getAllUsers(): Promise<User[]> {
    try {
        const usersSnapshot = await adminDb.collection('users').get();

        if (usersSnapshot.empty) {
            return [];
        }

        const users = usersSnapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data()
        } as User));
        
        users.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            if (!a.createdAt && b.createdAt) return 1;
            if (a.createdAt && !b.createdAt) return -1;
            return 0;
        });

        return users;
    } catch (error) {
        console.error("Error fetching all users:", error);
        return [];
    }
}

export async function getSystemStatus() {
  const firebaseConfigured = !!process.env.FIREBASE_PROJECT_ID && !!process.env.FIREBASE_CLIENT_EMAIL;
  const cloudinaryConfigured = !!process.env.CLOUDINARY_CLOUD_NAME && !!process.env.CLOUDINARY_API_KEY;

  return {
    firebase: firebaseConfigured,
    cloudinary: cloudinaryConfigured,
  };
}

/**
 * For demonstration. In a real app, this would fetch from a database record.
 * @returns The current application status.
 */
export async function getApplicationStatus(): Promise<{ status: string }> {
    // This is a mocked value for the demo.
    return { status: 'open' };
}

/**
 * For demonstration. In a real app, this would update a database record.
 * @param newStatus The new status to set for the application cycle.
 */
export async function updateApplicationStatus(newStatus: string): Promise<{ success: boolean; message: string; }> {
    console.log(`Admin action: Application status changed to "${newStatus}". This is a mock action.`);
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: `Application status has been set to "${newStatus}".` };
}
