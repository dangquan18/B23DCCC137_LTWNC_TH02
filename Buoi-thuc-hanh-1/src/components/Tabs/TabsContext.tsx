import { createContext, useContext } from 'react';

interface TabsContextValue<T extends string> {
  value: T;
  onChange: (value: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabsContext = createContext<TabsContextValue<any> | null>(null);

export function TabsProvider<T extends string>({
  value,
  onChange,
  children,
}: TabsContextValue<T> & { children: React.ReactNode }) {
  return <TabsContext.Provider value={{ value, onChange }}>{children}</TabsContext.Provider>;
}

export function useTabsContext<T extends string>(): TabsContextValue<T> {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('Tabs.* components phải được đặt bên trong <Tabs>');
  }
  return ctx as TabsContextValue<T>;
}
