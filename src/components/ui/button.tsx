import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonStyle = {
  variant?: "primary" | "secondary";
  className?: string;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "border-transparent bg-accent text-surface hover:bg-primary",
  secondary: "border-accent bg-surface text-primary hover:bg-lavender",
};

function buttonClass({ variant = "primary", className = "" }: ButtonStyle) {
  return `${base} ${variants[variant]} ${className}`;
}

export function Button({
  variant,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & ButtonStyle) {
  return (
    <button
      {...props}
      type={type}
      className={buttonClass({ variant, className })}
    />
  );
}

export function ButtonLink({
  variant,
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonStyle) {
  return <Link {...props} className={buttonClass({ variant, className })} />;
}
