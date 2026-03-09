export interface UserProfile {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    gender: "MALE" | "FEMALE";
    avatarUrl: string | null;
    address?: string | null;
    CCCD?: string | null;
}