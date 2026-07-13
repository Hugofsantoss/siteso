import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-graphite-900 text-white hover:bg-black border border-graphite-900 hover:border-gold-500",
  secondary:
    "bg-transparent text-graphite-900 border border-graphite-900 hover:bg-graphite-900 hover:text-white",
  ghost:
    "bg-transparent text-white border border-white/60 hover:border-gold-400 hover:text-gold-400",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:cursor-not-allowed disabled:opacity-50";

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
}

interface ButtonAsButton extends CommonProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", children, className = "" } = props;
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (props.href !== undefined) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
      className={styles}
    >
      {children}
    </button>
  );
}
