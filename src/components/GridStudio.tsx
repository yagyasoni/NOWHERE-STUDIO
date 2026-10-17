/**
 * The 12-column "label | content" row used across the inner pages:
 * label in columns 1-3, content in columns 5-12. Stacks below 992px.
 */
export default function GridStudio({
  label,
  children,
  className = "",
  reverseOnMobile = false,
}: {
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  reverseOnMobile?: boolean;
}) {
  return (
    <div
      className={`grid-12 max-lg:flex max-lg:gap-[2rem] ${
        reverseOnMobile ? "max-lg:flex-col-reverse" : "max-lg:flex-col"
      } ${className}`}
    >
      <div className="col-span-3">{label && <div className="p-m">{label}</div>}</div>
      <div className="col-start-5 col-end-13">{children}</div>
    </div>
  );
}
