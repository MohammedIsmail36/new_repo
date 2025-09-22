'use client';

import React from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus, Search, Filter, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function ExpenseTypesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المصروفات', href: '/expenses' },
            { label: 'أنواع المصروفات', href: '/expense-types' }
          ]}
        />

        <PageHeader
          title="أنواع المصروفات"
          subtitle="إدارة وتصنيف أنواع المصروفات المختلفة في الشركة"
          action={
            <Link href="/expense-types/add">
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                <Plus className="w-4 h-4 ml-2" />
                إضافة نوع جديد
              </Button>
            </Link>
          }
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              أنواع المصروفات
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              هنا ستظهر جميع أنواع المصروفات مثل (إيجار، كهرباء، رواتب، مواصلات، صيانة) مع إمكانية التصنيف والتنظيم
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="text-gray-600">
                <Filter className="w-4 h-4 ml-2" />
                الفلاتر
              </Button>
              <Button variant="outline" className="text-gray-600">
                <Search className="w-4 h-4 ml-2" />
                البحث
              </Button>
              <Link href="/expense-types/add">
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة نوع جديد
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}