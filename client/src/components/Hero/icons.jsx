export function LogoMark() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-md border-2 border-[#C2441C] bg-white/5 text-sm font-black text-white shadow-[0_0_20px_rgba(194,68,28,0.35)]">
      M
    </span>
  );
}

export function ShieldIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 5.5 5.4v5.3c0 4.2 2.7 7.9 6.5 9.3 3.8-1.4 6.5-5.1 6.5-9.3V5.4L12 3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.8 11.6 2.1 2.1 4.4-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 12.4a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.8 20c.8-3.4 3.4-5.3 7.2-5.3s6.4 1.9 7.2 5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function GearIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.1 3h3.8l.6 2.5c.5.2 1 .5 1.4.8l2.4-.8 1.9 3.2-1.9 1.7c.1.5.1 1.1 0 1.6l1.9 1.7-1.9 3.2-2.4-.8c-.4.3-.9.6-1.4.8l-.6 2.5h-3.8l-.6-2.5c-.5-.2-1-.5-1.4-.8l-2.4.8-1.9-3.2L5.7 12c-.1-.5-.1-1.1 0-1.6L3.8 8.7l1.9-3.2 2.4.8c.4-.3.9-.6 1.4-.8L10.1 3Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function TruckIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 6.2h10.4v9.4H3.5V6.2Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M13.9 9.4h3.8l2.8 3.2v3h-6.6V9.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M7.2 18.3a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM17.4 18.3a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5.5h14v14H5v-14Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3.5v4M16 3.5v4M5 9h14M8.5 12.5h1.2M11.4 12.5h1.2M14.3 12.5h1.2M8.5 15.4h1.2M11.4 15.4h1.2M14.3 15.4h1.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MachinesIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18.5V9.2h5.2v9.3H4ZM9.2 18.5V5.5h5.6v13H9.2ZM14.8 18.5v-7.2H20v7.2h-5.2Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6.6 12.4h.1M12 8.6h.1M17.4 14.3h.1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function GroupIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9.5 11.8a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8ZM16.5 12.2a2.8 2.8 0 1 0 0-5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.6 19.2c.7-3.2 2.8-5 5.9-5s5.2 1.8 5.9 5M14.8 14.5c2.8.2 4.7 1.8 5.6 4.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronIcon({ direction = "right", className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MouseIcon({ className = "h-7 w-7" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="3" width="10" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function FactorySilhouette() {
  return (
    <svg className="h-full w-full text-black/25" viewBox="0 0 900 260" fill="currentColor" aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 230h40v-70h32v70h30V132h44v98h34V94h42v136h36V150h62v80h34V70h34v160h42V110h42v120h48V145h65v85h43V98h34v132h37V52h35v178h44v-62h80v62h70v30H0v-30Z" />
      <path d="M210 88h70l14 142h-98L210 88ZM642 60h70l12 170h-94L642 60Z" opacity=".5" />
    </svg>
  );
}

export function GearOutline({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none" aria-hidden="true">
      <path d="m78 9 24 1 6 21c5 2 9 4 13 7l21-6 14 20-14 17c2 5 3 10 3 15l18 12-8 23-22-1c-3 4-7 8-12 11l2 22-23 8-13-19c-5 0-10-1-15-3l-17 14-20-14 6-21c-3-4-5-9-7-14l-21-6-1-24 20-8c1-5 3-10 6-14L31 47l13-20 22 4c4-3 8-6 13-7L78 9Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="90" cy="85" r="29" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
