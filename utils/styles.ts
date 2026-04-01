export const commonSelectStyles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    minHeight: "auto",
    width: "full",
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

export const commonSelectStyles2 = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    minHeight: "auto",
    width: "100%",
    backgroundColor: "var(--color-bg-primary)",
    borderColor: state.isFocused
      ? "var(--color-primary-500)"
      : "var(--color-border-primary)",
    borderRadius: "0.375rem",

    boxShadow: state.isFocused ? "0 0 0 1px var(--color-primary-500)" : "none",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 400,
    transition: "all 0.2s",
    ":hover": {
      borderColor: state.isFocused
        ? "var(--color-primary-500)"
        : "var(--color-border-primary)",
    },
  }),
  valueContainer: (baseStyles: any) => ({
    ...baseStyles,
    padding: "0.375rem 1rem",
    gap: "0.375rem",
  }),
  input: (baseStyles: any) => ({
    ...baseStyles,
    margin: 0,
    padding: 0,
    color: "var(--color-text-primary, #e5e7eb)",
  }),
  placeholder: (baseStyles: any) => ({
    ...baseStyles,
    color: "var(--color-text-secondary, #9ca3af)",
    margin: 0,
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    fontSize: "0.875rem",
    color: "var(--color-text-primary, #e5e7eb)",
    margin: "2px 0px",
    backgroundColor: state.isSelected
      ? "var(--color-primary-600)"
      : state.isFocused
        ? "var(--color-bg-hover)"
        : "transparent",
    padding: "0.5rem 1rem",
    borderRadius: "0.125rem",
    cursor: "pointer",
    ":active": {
      backgroundColor: "var(--color-primary-500)",
    },
  }),
  dropdownIndicator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    padding: "0 0.75rem",
    color: state.isFocused
      ? "var(--color-text-primary, #e5e7eb)"
      : "var(--color-text-secondary, #9ca3af)",
    ":hover": {
      color: "var(--color-text-primary, #e5e7eb)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: "var(--color-bg-primary-2)",
    border: "1px solid var(--color-border-primary)",
    borderRadius: "0.375rem",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    marginTop: "0.25rem",
    zIndex: 50,
  }),
  menuList: (baseStyles: any) => ({
    ...baseStyles,
    padding: "0.25rem",
  }),
  singleValue: (baseStyles: any) => ({
    ...baseStyles,
    color: "var(--color-text-primary, #e5e7eb)",
    margin: 0,
  }),
};
