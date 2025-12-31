'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const locationSchema = z.discriminatedUnion('dorm', [
    z.object({
        dorm: z.literal("Off Campus"),
        address: z.string().min(1, "Address is required"),
    }),
    z.object({
        dorm: z.string().refine((val) => val !== "Off Campus", {
            message: "Please select a valid dorm"
        }),
        roomNumber: z.string().min(1, "Room number is required"),
    })
])

const FormSchema = z.object({
    firstName: z.string({
        message: 'Please enter first name',
    }),
    lastName: z.string({
        message: 'Please enter last name',
    }),
    phoneNumber: z.string({
        message: 'Please enter a phone number',
    }),
    location: locationSchema,
});

const CreatePNM = FormSchema;

export type State = {
    errors?: {
        firstName?: string[];
        lastName?: string[];
        phoneNumber?: string[];
        location?: string[] | {
            dorm?: string[];
            address?: string[];
            roomNumber?: string[];
        };
    };
    message?: string | null;
};

export async function createPNM(prevState: State, formData: FormData) {
    const validatedFields = CreatePNM.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phoneNumber: formData.get('phoneNumber'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
    console.log(validatedFields);
    revalidatePath('/dashboard');
    redirect('/dashboard');
}