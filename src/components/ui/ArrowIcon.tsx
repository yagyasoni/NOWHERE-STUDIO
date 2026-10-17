export default function ArrowIcon({ className = "arrow-icon" }: { className?: string }) {
  return (
    <svg className={className} width="24" height="12" viewBox="-8 -1 26 14" fill="none" aria-hidden>
      <path d="M-7 6H16" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.5 0.5L16 6L10.5 11.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function SmallArrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M0 5H12" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 1L12 5L8 9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
