export const ErrorMessageInput = ({
  error,
  className,
  ...props
}: React.ComponentProps<"p"> & {
  error?: string;
}) => { 
    return error ? <p className={`text-sm text-red-500 ${className}`} {...props}>{error}</p> : null;
}