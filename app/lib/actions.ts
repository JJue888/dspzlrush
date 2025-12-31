'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const locationSchema = z.union([
    z.object({
        dorm: z.literal("Off Campus"),
        address: z.string().min(1, "Address is required"),
    }),
    z.object({
        dorm: z.string().min(1, "Please select a dorm")
            .refine(val => val !== "Off Campus", {
                message: "Please select a valid dorm",
            }),
        roomNumber: z.string().min(1, "Room number is required"),
    }),
]);

const FormSchema = z.object({
    firstName: z.string({
        message: 'First name is required',
    }).min(1, "First name cannot be empty"),

    lastName: z.string({
        message: 'Last name is required',
    }).min(1, "Last name cannot be empty"),

    phoneNumber: z.string({
        message: 'Phone number is required',
    }).regex(/^\d{3}-\d{3}-\d{4}$/, {
        message: 'Phone number must be in format 123-123-1234',
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
    const dorm = (formData.get('dorm') as string) || "";
    const address = (formData.get('address') as string) || "";
    const roomNumber = (formData.get('roomNumber') as string) || "";

    console.log("Form data received:", { dorm, address, roomNumber });

    // Build location object - must match one of the discriminated union options
    let location;
    if (dorm === "Off Campus") {
        location = {
            dorm: "Off Campus" as const,
            address: address,
        };
    } else {
        // For any other value (including empty string)
        location = {
            dorm: dorm,
            roomNumber: roomNumber,
        };
    }

    console.log("Location object built:", location);

    const validatedFields = CreatePNM.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phoneNumber: formData.get('phoneNumber'),
        location: location,
    });

    console.log("validating");

    if (!validatedFields.success) {
        console.log("Validation errors:", JSON.stringify(validatedFields.error.format(), null, 2));
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create PNM.',
        };
    }

    console.log("Validated data:", validatedFields.data);

    // Your database logic here with validatedFields.data

    revalidatePath('/dashboard/pnms');
    redirect('/dashboard/pnms');
}