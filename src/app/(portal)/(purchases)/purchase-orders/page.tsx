'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus, ShoppingBag } from 'lucide-react';

export default function PurchaseOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المشتريات', href: '/purchases' },
            { label: 'أوامر الشراء', href: '/purchases/purchase-orders' }
          ]}
        />

        <PageHeader
          title="أوامر الشراء"
          subtitle="إدارة وتتبع جميع أوامر الشراء"
          action={
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="w-4 h-4 ml-2" />
              إضافة أمر شراء جديد
            </Button>
          }
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              أوامر الشراء
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              ستظهر هنا جميع أوامر الشراء مع إمكانية تتبع حالتها ومراحل التنفيذ
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="w-4 h-4 ml-2" />
              إضافة أمر شراء جديد
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}