
'use server';

import { z } from 'zod';
import { adminDb } from '@/lib/firebase-admin';
import cloudinary from '@/lib/cloudinary';
import { onboardingSchema, profilePictureSchema } from '@/lib/student-schemas';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import type { User } from '@/lib/auth-constants';

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: z.ZodIssue[];
  newImageUrl?: string;
}

const uploadFile = (file: File, userId: string, type: 'birth-cert' | 'school-id' | 'profile-picture'): Promise<string> => {
  if (!file) throw new Error(`No file provided for ${type}`);
  
  return new Promise(async (resolve, reject) => {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `user-documents/${userId}`,
          public_id: `${type}-${uuidv4()}`,
          resource_type: 'auto',
          access_mode: 'public',
        },
        (error, result) => {
          if (error) {
            return reject(new Error(`Cloudinary upload failed: ${error.message}`));
          }
          if (!result) {
            return reject(new Error('Cloudinary upload failed: No result returned.'));
          }
          resolve(result.secure_url);
        }
      );
      uploadStream.end(buffer);
    } catch (e) {
      reject(e);
    }
  });
};

export async function submitOnboardingForm(formData: FormData, userId: string | null): Promise<ActionResult> {
  if (!userId) {
    return { success: false, message: 'You must be logged in to submit this form.' };
  }

  if (!cloudinary.config().cloud_name) {
    console.error("submitOnboardingForm Error: Cloudinary configuration is missing. Check .env.local and restart server.");
    return { 
        success: false, 
        message: "Configuration Error: Could not upload files. Please ensure your Cloudinary credentials in a .env.local file are correct and the server has been restarted." 
    };
  }

  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = onboardingSchema.safeParse(rawData);
  
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check the fields.',
      errors: validatedFields.error.issues,
    };
  }
  
  const { data } = validatedFields;

  let birthCertificateUrl: string;
  let schoolIdUrl: string;

  try {
    birthCertificateUrl = await uploadFile(data.birthCertificate, userId, 'birth-cert');
    schoolIdUrl = await uploadFile(data.schoolId, userId, 'school-id');
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return { success: false, message: `File Upload Failed: ${error.message || 'Please check your connection and try again.'}` };
  }
    
  try {
    const userDocRef = adminDb.collection('users').doc(userId);

    const userProfileData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      sex: data.sex,
      dateOfBirth: data.dateOfBirth,
      address: {
        isInternational: data.isInternational === 'international',
        streetAddress: data.streetAddress,
        zipCode: data.zipCode,
        ...(data.isInternational === 'philippines'
          ? {
              region: data.region,
              province: data.province,
              city: data.city,
            }
          : {
              country: data.country,
              fullAddress: data.internationalAddress,
            }),
      },
      father: {
        name: data.fatherName,
        occupation: data.fatherOccupation,
        contact: data.fatherContact,
      },
      mother: {
        name: data.motherName,
        occupation: data.motherOccupation,
        contact: data.motherContact,
      },
      birthCertificateUrl,
      schoolIdUrl,
      onboardingComplete: true,
    };

    await userDocRef.set(userProfileData, { merge: true });

  } catch (error: any) {
    console.error("Firestore update error:", error);
    return { success: false, message: `An error occurred while saving your profile: ${error.message || 'Please try again.'}` };
  }
  
  revalidatePath('/student');
  redirect('/student');
}


export async function updateProfilePicture(formData: FormData, userId: string | null): Promise<ActionResult> {
   if (!userId) {
    return { success: false, message: 'You must be logged in to update your profile picture.' };
  }
   if (!cloudinary.config().cloud_name) {
     console.error("updateProfilePicture Error: Cloudinary not configured.");
     return { success: false, message: "Configuration Error: Could not upload file." };
  }

  const validatedFields = profilePictureSchema.safeParse({
    profilePicture: formData.get('profilePicture'),
  });

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid file.', errors: validatedFields.error.issues };
  }

  const { profilePicture } = validatedFields.data;

  try {
    const profilePictureUrl = await uploadFile(profilePicture, userId, 'profile-picture');
    const userDocRef = adminDb.collection('users').doc(userId);
    await userDocRef.update({ profilePictureUrl });
    
    revalidatePath('/student/settings');
    revalidatePath('/student');

    return { success: true, message: 'Profile picture updated successfully!', newImageUrl: profilePictureUrl };
  } catch (error: any) {
    console.error("Profile picture update error:", error);
    return { success: false, message: `Upload Failed: ${error.message || 'Please try again.'}` };
  }
}

export async function getUserProfile(userId: string): Promise<User | null> {
  if (!userId) {
    return null;
  }
  try {
    const userDocRef = adminDb.collection('users').doc(userId);
    const userDocSnap = await userDocRef.get();

    if (userDocSnap.exists) {
      return { uid: userDocSnap.id, ...userDocSnap.data() } as User;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}
