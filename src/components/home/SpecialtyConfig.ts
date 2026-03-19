export type SpecialtyConfig = {
  label: string;
  icon: string;
  color: string;
  bg: string;
};

export function getSpecialtyConfig(specialty: string): SpecialtyConfig {
  switch (specialty) {
    case "Pulmonology":
      return { label: "Hô hấp", icon: "air", color: "#0A7CFF", bg: "#EFF6FF" };
    case "Thoracic Surgery":
      return {
        label: "Phẫu thuật lồng ngực",
        icon: "monitor_heart",
        color: "#22C55E",
        bg: "#F0FDF4",
      };
    case "Respiratory Medicine":
      return {
        label: "Nội khoa hô hấp",
        icon: "respiratory_rate",
        color: "#4F46E5",
        bg: "#EEF2FF",
      };
    case "Tuberculosis":
      return {
        label: "Lao phổi",
        icon: "coronavirus",
        color: "#EF4444",
        bg: "#FEF2F2",
      };
    default:
      return {
        label: specialty,
        icon: "medical_services",
        color: "#6B7280",
        bg: "#F3F4F6",
      };
  }
}
