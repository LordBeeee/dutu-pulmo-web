import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  appointmentService,
  type AppointmentListQuery,
  type CancelAppointmentPayload,
  type CreateAppointmentPayload,
} from '@/services/appointment.service';

export const appointmentKeys = {
  myList: (params?: AppointmentListQuery) => ['appointments', 'my-patient', params] as const,
  detail: (appointmentId: string) => ['appointments', 'detail', appointmentId] as const,
};

export function useAppointments(params?: AppointmentListQuery) {
  return useQuery({
    queryKey: appointmentKeys.myList(params),
    queryFn: () => appointmentService.getMyAppointments(params),
  });
}

export function useAppointmentDetail(appointmentId?: string) {
  return useQuery({
    queryKey: appointmentKeys.detail(appointmentId || ''),
    queryFn: () => appointmentService.getAppointmentById(appointmentId || ''),
    enabled: Boolean(appointmentId),
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) => appointmentService.createAppointment(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, payload }: { appointmentId: string; payload: CancelAppointmentPayload }) =>
      appointmentService.cancelAppointment(appointmentId, payload),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['appointments'] });
      void queryClient.invalidateQueries({ queryKey: appointmentKeys.detail(variables.appointmentId) });
    },
  });
}

