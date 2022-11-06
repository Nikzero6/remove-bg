import classnames from "classnames";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const PrimaryButton: React.FC<ButtonProps> = ({
  type,
  children,
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={classnames(
        "block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { PrimaryButton };
