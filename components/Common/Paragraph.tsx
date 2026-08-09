export const Paragraph = ({ className, innerText }: any) => {
  return (
    <p
      className={`text-[11px] mr font-semibold uppercase tracking-[0.18em] ${className}`}
    >
      {innerText}
    </p>
  );
};
