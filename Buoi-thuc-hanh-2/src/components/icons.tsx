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

export function IconPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 17v4.5" />
      <path d="M9 3.5h6l-1 5.5 3.5 3.2V14h-11v-1.8L10 9z" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.5-4.5" />
    </svg>
  );
}

export function IconSun(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </svg>
  );
}

export function IconMoon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
    </svg>
  );
}

export function IconList(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
    </svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20.5h17" />
      <path d="M7 16.5v-5M12 16.5V7M17 16.5v-8" />
    </svg>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z" />
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
