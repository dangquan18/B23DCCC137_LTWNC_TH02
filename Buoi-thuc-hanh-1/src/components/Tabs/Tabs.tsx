import type { ReactNode } from 'react';
import { TabsProvider } from './TabsContext';

interface TabsRootProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  children: ReactNode;
  className?: string;
}

/**
 * Compound Component pattern (Buổi 2): Tabs không tự vẽ danh sách tab,
 * mà chia sẻ state (tab đang chọn) cho các component con qua context,
 * cho phép người dùng tự do sắp xếp <Tabs.List>/<Tabs.Tab> bên trong.
 */
function TabsRoot<T extends string>({ value, onChange, children, className }: TabsRootProps<T>) {
  return (
    <TabsProvider value={value} onChange={onChange}>
      <div className={className}>{children}</div>
    </TabsProvider>
  );
}

export { TabsRoot };
