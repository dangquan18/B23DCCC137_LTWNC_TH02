import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M16 2.5v4M8 2.5v4M3 9.5h18" />
    </svg>
  );
}

export function IconBook(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4.5A2 2 0 0 1 6 3h13.5A1.5 1.5 0 0 1 21 4.5v14a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2Z" />
      <path d="M4 19.5A2 2 0 0 1 6 17.5h14" />
    </svg>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6.5h16M9.5 6.5V4.7A1.2 1.2 0 0 1 10.7 3.5h2.6a1.2 1.2 0 0 1 1.2 1.2v1.8M18.5 6.5 17.8 19a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5.5 6.5" />
      <path d="M10 10.5v6M14 10.5v6" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 9v4.5M12 17h.01" />
      <path d="M10.6 3.9 2.9 18a2 2 0 0 0 1.75 3h14.7a2 2 0 0 0 1.75-3L13.4 3.9a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

export function IconCheckCircle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.3 2.4 2.4 4.8-5.2" />
    </svg>
  );
}

export function IconListChecks(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m3.5 6 1.5 1.5L8 4.5M3.5 13l1.5 1.5L8 11.5M3.5 20l1.5 1.5L8 18.5" />
      <path d="M12 6h9M12 13h9M12 20h9" />
    </svg>
  );
}

export function IconGraduationCap(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m2 8 10-5 10 5-10 5-10-5Z" />
      <path d="M6 10.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5" />
      <path d="M22 8v6" />
    </svg>
  );
}

export function IconInbox(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12.5h5l1.7 2.5h4.6l1.7-2.5h5" />
      <path d="M5.5 5h13l2.5 7.5v7A1.5 1.5 0 0 1 19.5 21h-15A1.5 1.5 0 0 1 3 19.5v-7Z" />
    </svg>
  );
}
