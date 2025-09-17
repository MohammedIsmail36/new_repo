'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { theme } from '@/lib/theme';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-2 mt-4 justify-end">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={theme.components.button.secondary}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      <span style={theme.typography.body_text}>
        صفحة {currentPage} من {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={theme.components.button.secondary}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
    </div>
  );
}