export const ErrorMessageInput = ({
  error,
  className,
  ...props
}: React.ComponentProps<"p"> & {
  error?: string;
}) => { 
  console.log("ErrorMessageInput", error);
    return error ? <p className={`text-sm text-red-500 ${className}`} {...props}>{error}</p> : null;
}