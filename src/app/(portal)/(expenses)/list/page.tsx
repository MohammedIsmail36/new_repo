'use client';

import React from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus, Search, Filter, Receipt, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ExpenseListPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المصروفات', href: '/expenses' },
            { label: 'قائمة المصروفات', href: '/expenses/list' }
          ]}
        />

        <PageHeader
          title="قائمة المصروفات"
          subtitle="عرض جميع المصروفات المسجلة مع إمكانيات البحث والفلترة والتقارير"
          action={
            <Link href="/expenses/add">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Plus className="w-4 h-4 ml-2" />
                إضافة مصروف جديد
              </Button>
            </Link>
          }
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Receipt className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              قائمة المصروفات
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              هنا ستظهر جميع المصروفات المسجلة مع تفاصيل النوع والمبلغ والتاريخ والحالة مع إمكانيات متقدمة للبحث والفلترة
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="text-gray-600">
                <Filter className="w-4 h-4 ml-2" />
                فلترة حسب النوع
              </Button>
              <Button variant="outline" className="text-gray-600">
                <Search className="w-4 h-4 ml-2" />
                البحث
              </Button>
              <Button variant="outline" className="text-gray-600">
                <FileText className="w-4 h-4 ml-2" />
                تقرير المصروفات
              </Button>
              <Link href="/expenses/add">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة مصروف جديد
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}