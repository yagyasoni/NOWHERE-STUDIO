import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "black" | "white" | "blend";
  icon?: "arrow" | "email";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "black",
  icon = "arrow",
  className = "",
}: Props) {
  const cls = [
    "btn",
    variant === "white" && "is-white",
    variant === "blend" && "is-blend",
    icon === "email" && "is-email",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span>{children}</span>
      {icon === "email" ? (
        <span className="arobase">@</span>
      ) : (
        <span className="arrow-w">
          <span className="line-arrow" />
          <span className="shape-arrow" />
        </span>
      )}
    </>
  );

  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
