'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { theme } from '@/lib/theme';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'ابحث...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        placeholder={placeholder}
        style={{ ...theme.typography.body_text, paddingRight: '40px' }}
      />
      <Search
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        size={20}
        color={theme.colors.secondary_blue}
      />
    </div>
  );
}