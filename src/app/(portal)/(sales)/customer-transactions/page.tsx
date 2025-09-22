'use client';

import React from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Search, Filter, TrendingUp, Users } from 'lucide-react';

export default function CustomerTransactionsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المبيعات', href: '/sales' },
            { label: 'حركة العملاء', href: '/customer-transactions' }
          ]}
        />

        <PageHeader
          title="حركة العملاء"
          subtitle="عرض تفصيلي لجميع معاملات وحركات العملاء والمديونيات والمدفوعات"
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              حركة العملاء
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              هنا ستظهر جميع حركات العملاء من فواتير ومدفوعات ومديونيات مع إمكانية البحث والفلترة حسب العميل والفترة الزمنية
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="text-gray-600">
                <Filter className="w-4 h-4 ml-2" />
                فلترة حسب العميل
              </Button>
              <Button variant="outline" className="text-gray-600">
                <Search className="w-4 h-4 ml-2" />
                البحث في الحركات
              </Button>
              <Button variant="outline" className="text-gray-600">
                <Users className="w-4 h-4 ml-2" />
                كشف حساب عميل
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}