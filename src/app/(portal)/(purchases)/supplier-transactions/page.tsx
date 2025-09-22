'use client';

import React from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Search, Filter, TrendingDown, Truck } from 'lucide-react';

export default function SupplierTransactionsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المشتريات', href: '/purchases' },
            { label: 'حركة الموردين', href: '/supplier-transactions' }
          ]}
        />

        <PageHeader
          title="حركة الموردين"
          subtitle="عرض تفصيلي لجميع معاملات وحركات الموردين والمديونيات والمدفوعات"
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <TrendingDown className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              حركة الموردين
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              هنا ستظهر جميع حركات الموردين من فواتير ومدفوعات ومديونيات مع إمكانية البحث والفلترة حسب المورد والفترة الزمنية
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="text-gray-600">
                <Filter className="w-4 h-4 ml-2" />
                فلترة حسب المورد
              </Button>
              <Button variant="outline" className="text-gray-600">
                <Search className="w-4 h-4 ml-2" />
                البحث في الحركات
              </Button>
              <Button variant="outline" className="text-gray-600">
                <Truck className="w-4 h-4 ml-2" />
                كشف حساب مورد
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}