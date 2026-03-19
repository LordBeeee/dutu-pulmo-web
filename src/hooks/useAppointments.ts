import { useQuery } from '@tanstack/react-query';

import { appointmentService, type AppointmentTypeFilter, type PublicDoctorQuery } from '@/services/appointment.service';

const appointmentKeys = {
  doctors: (params?: PublicDoctorQuery) => ['doctors', 'public', params] as const,
  specialties: () => ['doctors', 'specialties'] as const,
  doctorSlots: (doctorId: string, date: string, appointmentType: AppointmentTypeFilter) =>
    ['doctors', 'slots', doctorId, date, appointmentType] as const,
  doctorSlotSummary: (doctorId: string, from: string, to: string, appointmentType: AppointmentTypeFilter) =>
    ['doctors', 'slots', 'summary', doctorId, from, to, appointmentType] as const,
};

export function useSpecialties() {
  return useQuery({
    queryKey: appointmentKeys.specialties(),
    queryFn: () => appointmentService.getSpecialties(),
  });
}

export function usePublicDoctors(params?: PublicDoctorQuery) {
  return useQuery({
    queryKey: appointmentKeys.doctors(params),
    queryFn: () => appointmentService.getPublicDoctors(params),
  });
}
