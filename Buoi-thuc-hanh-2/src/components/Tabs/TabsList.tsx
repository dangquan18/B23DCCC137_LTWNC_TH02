import type { ReactNode } from 'react';

export function TabsList({ children }: { children: ReactNode }) {
  return <div className="tabs-list">{children}</div>;
}
