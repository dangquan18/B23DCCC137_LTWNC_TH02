import { TabsRoot } from './Tabs';
import { TabsList } from './TabsList';
import { TabsTab } from './TabsTab';

// Gắn các subcomponent lên Tabs để dùng dạng <Tabs.List>/<Tabs.Tab>
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
});
