'use client';

import React from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus, Search, Filter, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function PurchaseReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المشتريات', href: '/purchases' },
            { label: 'مردودات المشتريات', href: '/purchase-returns' }
          ]}
        />

        <PageHeader
          title="مردودات المشتريات"
          subtitle="إدارة وعرض جميع مردودات المشتريات والمرتجعات للموردين"
          action={
            <Link href="/purchase-returns/add">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Plus className="w-4 h-4 ml-2" />
                إضافة مردود جديد
              </Button>
            </Link>
          }
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <RotateCcw className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              مردودات المشتريات
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              هنا ستظهر جميع مردودات المشتريات والمرتجعات للموردين مع تفاصيل الأسباب والمبالغ المستردة
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
              <Link href="/purchase-returns/add">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة مردود جديد
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}