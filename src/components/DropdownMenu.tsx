'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { theme } from '@/lib/theme';

interface DropdownMenuProps {
  items: { label: string; onClick: () => void }[];
}

export default function DropdownMenuComponent({ items }: DropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button style={{ ...theme.components.icon_button }}>
          <MoreHorizontal size={20} color={theme.components.icon_button.iconColor} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item, index) => (
          <DropdownMenuItem key={index} onClick={item.onClick} style={theme.typography.body_text}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}