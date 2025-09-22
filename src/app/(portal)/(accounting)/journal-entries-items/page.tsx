'use client';

import React from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Search, Filter, FileText, Book } from 'lucide-react';

export default function JournalEntriesItemsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المحاسبة', href: '/accounting' },
            { label: 'عناصر اليومية', href: '/journal-entries-items' }
          ]}
        />

        <PageHeader
          title="عناصر اليومية"
          subtitle="عرض تفصيلي لجميع عناصر وبنود القيود المحاسبية والحركات المالية"
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Book className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              عناصر اليومية
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              هنا ستظهر جميع عناصر وبنود القيود المحاسبية بالتفصيل مع الحسابات المدينة والدائنة والمبالغ والبيانات
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="text-gray-600">
                <Filter className="w-4 h-4 ml-2" />
                فلترة حسب الحساب
              </Button>
              <Button variant="outline" className="text-gray-600">
                <Search className="w-4 h-4 ml-2" />
                البحث في العناصر
              </Button>
              <Button variant="outline" className="text-gray-600">
                <FileText className="w-4 h-4 ml-2" />
                تقرير العناصر
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}