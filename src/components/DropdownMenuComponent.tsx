"use client";

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { theme } from '@/lib/theme';

interface DropdownMenuItem {
  label: string;
  onClick: () => void;
}

interface DropdownMenuComponentProps {
  items: DropdownMenuItem[];
}

export default function DropdownMenuComponent({ items }: DropdownMenuComponentProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          style={{ color: theme.colors.text_light }}
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[120px] bg-white rounded-md shadow-lg p-1"
          style={{ backgroundColor: theme.colors.white, border: `1px solid ${theme.colors.border}` }}
          sideOffset={5}
        >
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              className="px-2 py-1 text-sm hover:bg-blue-50 cursor-pointer rounded"
              style={{ color: theme.colors.text_light }}
              onSelect={item.onClick}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}