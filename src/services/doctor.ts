import { api } from '@/services/api';
import type { DoctorDetail, DoctorFilters, DoctorsResponse } from '@/types/doctor';
import { cleanParams } from '@/utils/query';

export type AppointmentTypeFilter = 'all' | 'online' | 'offline';

export type TimeSlotSummaryItem = {
  date: string;
  count: number;
  hasAvailability: boolean;
};

export type TimeSlotResponse = {
  id: string;
  doctorId: string;
  allowedAppointmentTypes: string[];
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
  isAvailable: boolean;
  baseConsultationFee?: number;
  discountPercent?: number;
  finalConsultationFee?: number;
  currency?: string;
  createdAt: string;
  updatedAt: string;
};

export const doctorService = {
  getDoctors: async (page: number, filters: DoctorFilters): Promise<DoctorsResponse> => {
    const { data } = await api.get<DoctorsResponse['data']>('/public/doctors', {
      params: cleanParams({
        page,
        limit: 10,
        sort: filters.sort,
        order: filters.order,
        search: filters.search,
        specialty: filters.specialty === 'ALL' ? undefined : filters.specialty,
        hospitalId: filters.hospitalId || undefined,
        appointmentType: filters.appointmentType === 'all' ? undefined : filters.appointmentType,
      }),
    });

    return { data };
  },

  getPublicDoctorDetail: async (id: string): Promise<DoctorDetail> => {
    const { data } = await api.get<DoctorDetail>(`/public/doctors/${id}`);
    return data;
  },

  getDoctorTimeSlots: async (doctorId: string): Promise<TimeSlotResponse[]> => {
    const { data } = await api.get<TimeSlotResponse[]>(`/public/doctors/${doctorId}/time-slots`);
    return data;
  },

  getDoctorTimeSlotSummary: async (
    doctorId: string,
    from: string,
    to: string,
    appointmentType?: AppointmentTypeFilter,
  ): Promise<TimeSlotSummaryItem[]> => {
    const { data } = await api.get<TimeSlotSummaryItem[]>(
      `/public/doctors/${doctorId}/time-slots/summary`,
      {
        params: cleanParams({ from, to, appointmentType }),
      },
    );
    return data;
  },

  getDoctorAvailableTimeSlots: async (
    doctorId: string,
    date: string,
    appointmentType?: AppointmentTypeFilter,
  ): Promise<TimeSlotResponse[]> => {
    const { data } = await api.get<TimeSlotResponse[]>(
      `/public/doctors/${doctorId}/time-slots/available`,
      {
        params: cleanParams({ date, appointmentType }),
      },
    );
    return data;
  },
};

export const getDoctors = doctorService.getDoctors;
export const getPublicDoctorDetail = doctorService.getPublicDoctorDetail;

