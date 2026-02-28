export const commonSelectStyles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    minHeight: "auto",
    width:"180px",
    backgroundColor:
      state.isFocused || state.menuIsOpen ? "#374151" : "transparent",
    borderColor: "#4B5563",
    borderRadius: "0.375rem",
    boxShadow: "none",
    cursor: "pointer",
    fontSize: "0.75rem",
    fontWeight: 500,
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#374151",
      borderColor: "#4B5563",
    },
  }),
  valueContainer: (baseStyles: any) => ({
    ...baseStyles,
    padding: "0.375rem 0.5rem",
    gap: "0.375rem",
  }),
  input: (baseStyles: any) => ({
    ...baseStyles,
    margin: 0,
    padding: 0,
    color: "#e5e7eb",
  }),
  placeholder: (baseStyles: any) => ({
    ...baseStyles,
    color: "#9ca3af",
    margin: 0,
  }),

  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    fontSize: "0.75rem",
    color: "#e5e7eb",
    margin: "2px 0px",
    backgroundColor:
      state.isFocused || state.isSelected ? "#374151" : "transparent",
    padding: "0.375rem 0.5rem",
    borderRadius: "0.125rem",
    cursor: "pointer",
    ":active": {
      backgroundColor: "#374151",
    },
  }),
  dropdownIndicator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    padding: "0 0.5rem",
    color: state.isFocused ? "#e5e7eb" : "#9ca3af",
    ":hover": {
      color: "#e5e7eb",
    },
  }),
  menu: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: "#1f2937",
    border: "1px solid #374151",
    borderRadius: "0.375rem",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", // shadow-xl
    marginTop: "0.25rem",
    zIndex: 50,
  }),
  menuList: (baseStyles: any) => ({
    ...baseStyles,
    padding: "0.25rem",
  }),
  singleValue: (baseStyles: any) => ({
    ...baseStyles,
    color: "#e5e7eb",
    margin: 0,
  }),
};
