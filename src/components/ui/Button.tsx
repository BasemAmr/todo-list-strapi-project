import React, { ButtonHTMLAttributes } from "react"
import { Loader } from "lucide-react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { VariantProps, cva } from "class-variance-authority"

const cn = (...inputs: (string | undefined)[]) => twMerge(clsx(inputs))

const buttonVariants = cva(
  "w-full font-medium text-white rounded-md focus:outline-none focus:ring",
  {
    variants: {
      variant: {
        primary: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-200",
        secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-200",
        danger: "bg-red-600 hover:bg-red-700 focus:ring-red-200",
        success: "bg-green-600 hover:bg-green-700 focus:ring-green-200",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  isLoading = false,
  variant,
  size,
  className,
  ...rest
}) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
      type={type}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <Loader size={20} className="mr-2 inline animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button