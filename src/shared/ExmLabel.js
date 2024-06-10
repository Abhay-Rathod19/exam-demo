export const ExmLabel = ({ children, ...props }) => {
  return (
    <label className="d-block" {...props}>
      {children}
    </label>
  );
};
