'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function JournalEntriesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المحاسبة', href: '/accounting' },
            { label: 'القيود المحاسبية', href: '/accounting/journal-entries' }
          ]}
        />

        <PageHeader
          title="القيود المحاسبية"
          subtitle="إدارة وعرض جميع القيود المحاسبية"
          action={
            <Link href="/accounting/journal-entries/add">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 ml-2" />
                إضافة قيد جديد
              </Button>
            </Link>
          }
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              قائمة القيود المحاسبية
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              ستظهر هنا جميع القيود المحاسبية مع إمكانيات البحث والفلترة المتقدمة
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="text-gray-600">
                <Filter className="w-4 h-4 ml-2" />
                الفلاتر
              </Button>
              <Link href="/accounting/journal-entries/add">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة قيد جديد
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}