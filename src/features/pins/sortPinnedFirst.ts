/** Đưa các phần tử đã ghim lên đầu, giữ nguyên thứ tự tương đối trong từng nhóm. */
export function sortPinnedFirst<T extends { id: string }>(items: T[], pinnedIds: string[]): T[] {
  if (pinnedIds.length === 0) return items;
  const pinnedSet = new Set(pinnedIds);
  const pinned: T[] = [];
  const rest: T[] = [];
  for (const item of items) {
    (pinnedSet.has(item.id) ? pinned : rest).push(item);
  }
  return pinned.concat(rest);
}
