'use client';

import React from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Save, X, DollarSign } from 'lucide-react';

export default function AddExpensePage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المصروفات', href: '/expenses' },
            { label: 'إضافة مصروف جديد', href: '/expenses/add' }
          ]}
        />

        <PageHeader
          title="إضافة مصروف جديد"
          subtitle="إدخال مصروف جديد مع تحديد النوع والمبلغ والتفاصيل"
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              إضافة مصروف جديد
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              هنا سيتم إنشاء نموذج إدخال مصروف جديد مع تحديد نوع المصروف والمبلغ والتاريخ والملاحظات والمرفقات
            </p>
            <div className="flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="w-4 h-4 ml-2" />
                حفظ المصروف
              </Button>
              <Button variant="outline" className="text-gray-600">
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}