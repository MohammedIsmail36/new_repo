'use client';

import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus, Award } from 'lucide-react';

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full max-w-full mx-auto p-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المخزون', href: '/inventory' },
            { label: 'العلامات التجارية', href: '/inventory/brands' }
          ]}
        />

        <PageHeader
          title="العلامات التجارية"
          subtitle="إدارة العلامات التجارية للمنتجات"
          action={
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="w-4 h-4 ml-2" />
              إضافة علامة تجارية جديدة
            </Button>
          }
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              العلامات التجارية
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              إدارة العلامات التجارية وربطها بالمنتجات المختلفة
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="w-4 h-4 ml-2" />
              إضافة علامة تجارية جديدة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}