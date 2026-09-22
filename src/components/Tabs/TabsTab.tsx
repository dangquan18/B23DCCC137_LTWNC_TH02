import type { ReactNode } from 'react';
import { useTabsContext } from './TabsContext';

interface TabsTabProps<T extends string> {
  value: T;
  children: ReactNode;
  count?: number;
}

export function TabsTab<T extends string>({ value, children, count }: TabsTabProps<T>) {
  const { value: active, onChange } = useTabsContext<T>();
  const isActive = active === value;

  return (
    <button
      type="button"
      className={`tabs-tab${isActive ? ' tabs-tab--active' : ''}`}
      aria-pressed={isActive}
      onClick={() => onChange(value)}
    >
      {children}
      {typeof count === 'number' && <span className="tabs-tab__count">{count}</span>}
    </button>
  );
}
