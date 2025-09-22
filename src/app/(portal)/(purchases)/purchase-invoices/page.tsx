'use client';

import React from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus, Search, Filter, Package } from 'lucide-react';
import Link from 'next/link';

export default function PurchaseInvoicesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المشتريات', href: '/purchases' },
            { label: 'فواتير المشتريات', href: '/purchase-invoices' }
          ]}
        />

        <PageHeader
          title="فواتير المشتريات"
          subtitle="إدارة وعرض جميع فواتير المشتريات - إنشاء وحفظ الفواتير كمسودة ثم تأكيدها لاحقاً"
          action={
            <Link href="/purchase-invoices/add">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="w-4 h-4 ml-2" />
                إنشاء فاتورة شراء
              </Button>
            </Link>
          }
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              فواتير المشتريات
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              هنا ستظهر جميع فواتير المشتريات مع إمكانيات البحث والفلترة والتصفية حسب الحالة (مسودة، مؤكدة، ملغية)
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
              <Link href="/purchase-invoices/add">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="w-4 h-4 ml-2" />
                  إنشاء فاتورة شراء
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}