export const Link = ({ className, ...props }: any) => {
  return <a className={`block ${className}`} {...props} />;
};
