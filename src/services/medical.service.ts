import { api } from "./api";
import type { MedicalRecord, Prescription } from '@/types/medical.types';

export const medicalService = {
  /**
   * Lấy danh sách hồ sơ bệnh án của bệnh nhân
   */
  getPatientRecords: async (patientId: string): Promise<MedicalRecord[]> => {
    const response = await api.get<MedicalRecord[]>(
      `/patients/${patientId}/medical-records`,
    );
    return response.data;
  },

  /**
   * Lấy chi tiết hồ sơ bệnh án
   */
  getMedicalRecordDetail: async (recordId: string): Promise<MedicalRecord> => {
    const response = await api.get<MedicalRecord>(
      `/medical/records/${recordId}/detail`,
    );
    return response.data;
  },

  /**
   * Lấy danh sách đơn thuốc của bệnh nhân
   */
  getPatientPrescriptions: async (
    patientId: string,
  ): Promise<Prescription[]> => {
    const response = await api.get<Prescription[]>(
      `/patients/${patientId}/prescriptions`,
    );
    return response.data;
  },

  /**
   * Lấy chi tiết đơn thuốc
   */
  getPrescriptionDetail: async (
    prescriptionId: string,
  ): Promise<Prescription> => {
    const response = await api.get<Prescription>(
      `/medical/prescriptions/${prescriptionId}`,
    );
    return response.data;
  },

  /**
   * Lấy URL PDF hồ sơ bệnh án
   */
  getMedicalRecordPdf: async (
    recordId: string,
  ): Promise<{ pdfUrl: string | null }> => {
    const response = await api.get<{ pdfUrl: string | null }>(
      `/medical/records/${recordId}/pdf`,
    );
    return response.data;
  },

  /**
   * Lấy URL PDF đơn thuốc
   */
  getPrescriptionPdf: async (
    prescriptionId: string,
  ): Promise<{ pdfUrl: string | null }> => {
    const response = await api.get<{ pdfUrl: string | null }>(
      `/medical/prescriptions/${prescriptionId}/pdf`,
    );
    return response.data;
  },
};

export default medicalService;
