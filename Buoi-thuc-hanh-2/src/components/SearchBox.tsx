import { IconSearch } from './icons';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className="search-box">
      <IconSearch width={16} height={16} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm theo tên bài tập hoặc môn học..."
        aria-label="Tìm kiếm bài tập"
      />
    </label>
  );
}
