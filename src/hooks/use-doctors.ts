import { useQuery } from '@tanstack/react-query';

import { doctorService } from '@/services/doctor';
import type { DoctorFilters } from '@/types/doctor';

export const doctorKeys = {
  list: (page: number, filters: DoctorFilters) => ['doctors', 'public', page, filters] as const,
  detail: (id: string) => ['doctors', 'detail', id] as const,
  slots: (doctorId: string, date: string) => ['doctors', 'slots', doctorId, date] as const,
  summary: (doctorId: string, from: string, to: string) =>
    ['doctors', 'slot-summary', doctorId, from, to] as const,
};

export function useDoctors(page: number, filters: DoctorFilters) {
  return useQuery({
    queryKey: doctorKeys.list(page, filters),
    queryFn: () => doctorService.getDoctors(page, filters),
  });
}

export function usePublicDoctorDetail(doctorId?: string) {
  return useQuery({
    queryKey: doctorKeys.detail(doctorId || ''),
    queryFn: () => doctorService.getPublicDoctorDetail(doctorId || ''),
    enabled: Boolean(doctorId),
  });
}

export function useDoctorAvailableSlots(doctorId?: string, date?: string) {
  return useQuery({
    queryKey: doctorKeys.slots(doctorId || '', date || ''),
    queryFn: () => doctorService.getDoctorAvailableTimeSlots(doctorId || '', date || ''),
    enabled: Boolean(doctorId && date),
  });
}

export function useDoctorSlotSummary(doctorId?: string, from?: string, to?: string) {
  return useQuery({
    queryKey: doctorKeys.summary(doctorId || '', from || '', to || ''),
    queryFn: () => doctorService.getDoctorTimeSlotSummary(doctorId || '', from || '', to || ''),
    enabled: Boolean(doctorId && from && to),
  });
}

