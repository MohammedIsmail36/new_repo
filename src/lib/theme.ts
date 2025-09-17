// src/lib/theme.ts
export const theme = {
  colors: {
    primary_blue: "#16315A",
    secondary_blue: "#2E5D9C",
    accent_blue: "#E2E8F0",
    white: "#FFFFFF",
    gray_light: "#F7F8FA",
    text_dark: "#333333",
    text_light: "#FFFFFF",
    border: "#E0E0E0",
    green: "#059669", // للحالة "مدفوع"
    red: "#DC2626", // للحالة "غير مدفوع"
    yellow: "#D97706", // للحالة "متأخر"
    bg_selected: "#DBEAFE", // للصفوف المختارة
  },
  typography: {
    heading_1: { fontSize: "24px", fontWeight: 600 },
    heading_2: { fontSize: "20px", fontWeight: 500 },
    body_text: { fontSize: "14px", fontWeight: 400 },
    small_text: { fontSize: "12px", fontWeight: 400, color: "#2E5D9C" },
  },
  layout: {
    sidebar: { width: "240px", backgroundColor: "#16315A", textColor: "#FFFFFF", activeItemBg: "#2E5D9C" },
    header: { height: "60px", backgroundColor: "#FFFFFF", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" },
    main_content: { backgroundColor: "#F7F8FA", padding: "20px" },
  },
  components: {
    card: { backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.08)", padding: "20px" },
    button: {
      primary: { backgroundColor: "#2E5D9C", textColor: "#FFFFFF", borderRadius: "8px", padding: "10px 20px" },
      secondary: { backgroundColor: "#FFFFFF", textColor: "#2E5D9C", border: "1px solid #2E5D9C", borderRadius: "8px", padding: "10px 20px" },
    },
    icon_button: { backgroundColor: "#E2E8F0", iconColor: "#2E5D9C", borderRadius: "8px", size: "40px" },
    table: { header_bg: "#E2E8F0", row_border: "1px solid #E0E0E0" },
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.08)",
    lg: "0 10px 15px rgba(0,0,0,0.1)",
  },
};