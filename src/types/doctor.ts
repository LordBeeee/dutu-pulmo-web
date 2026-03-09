export interface Doctor {
    id: string;
    fullName: string;
    gender: "MALE" | "FEMALE";
    avatarUrl: string | null;
    title: string | null;
    specialty: string;
    yearsOfExperience: number;
    address: string | null;
    defaultConsultationFee: string;
    primaryHospital?: {
        id: string;
        name: string;
    };
    
}