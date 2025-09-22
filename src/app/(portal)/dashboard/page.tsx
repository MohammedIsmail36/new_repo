'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { useGlobalStore } from '@/stores/globalStore';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  Users,
  AlertTriangle,
  Plus,
  ArrowUpRight,
  Calendar,
  Bell
} from 'lucide-react';

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const { notifications } = useGlobalStore();

  useEffect(() => {
    if (!session) router.push('/signin');
  }, [session, router]);

  if (!session) return null;

  // Mock data for demonstration
  const dashboardData = {
    totalSales: { amount: 5000000, change: +12.5, period: 'هذا الشهر' },
    totalPurchases: { amount: 3000000, change: -8.2, period: 'هذا الشهر' },
    accountBalance: { amount: 2000000, change: +5.8, period: 'هذا الشهر' },
    newCustomers: { count: 156, change: +23.4, period: 'هذا الشهر' },
    pendingOrders: 12,
    lowStockItems: 8,
    todaysSales: 145000,
    recentNotifications: [
      { id: 1, message: 'تم إضافة فاتورة جديدة #INV-001', type: 'info', time: 'منذ 5 دقائق' },
      { id: 2, message: 'انخفاض مخزون منتج "لابتوب HP"', type: 'warning', time: 'منذ 15 دقيقة' },
      { id: 3, message: 'تم سداد فاتورة #INV-095', type: 'success', time: 'منذ ساعة' },
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              مرحباً، {session.user?.name || 'المستخدم'}
            </h1>
            <p className="text-secondary mt-2">
              إليك نظرة سريعة على أداء عملك اليوم
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success" dot>
              اليوم: {formatCurrency(dashboardData.todaysSales)}
            </Badge>
            <Button leftIcon={<Plus className="w-4 h-4" />}>
              إضافة فاتورة
            </Button>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales */}
        <Card variant="elevated" hover className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">إجمالي المبيعات</CardTitle>
                <p className="text-xs text-secondary">{dashboardData.totalSales.period}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(dashboardData.totalSales.amount)}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">
                  +{dashboardData.totalSales.change}%
                </Badge>
                <span className="text-xs text-secondary">مقارنة بالشهر الماضي</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Purchases */}
        <Card variant="elevated" hover className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">إجمالي المشتريات</CardTitle>
                <p className="text-xs text-secondary">{dashboardData.totalPurchases.period}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(dashboardData.totalPurchases.amount)}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="warning" size="sm">
                  {dashboardData.totalPurchases.change}%
                </Badge>
                <span className="text-xs text-secondary">مقارنة بالشهر الماضي</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Balance */}
        <Card variant="elevated" hover className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">رصيد الحسابات</CardTitle>
                <p className="text-xs text-secondary">{dashboardData.accountBalance.period}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(dashboardData.accountBalance.amount)}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">
                  +{dashboardData.accountBalance.change}%
                </Badge>
                <span className="text-xs text-secondary">مقارنة بالشهر الماضي</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Customers */}
        <Card variant="elevated" hover className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">عملاء جدد</CardTitle>
                <p className="text-xs text-secondary">{dashboardData.newCustomers.period}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">
                {dashboardData.newCustomers.count}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">
                  +{dashboardData.newCustomers.change}%
                </Badge>
                <span className="text-xs text-secondary">مقارنة بالشهر الماضي</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <ShoppingCart className="w-4 h-4 ml-2" />
                إنشاء فاتورة مبيعات
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Package className="w-4 h-4 ml-2" />
                إضافة منتج جديد
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="w-4 h-4 ml-2" />
                إضافة عميل جديد
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="w-4 h-4 ml-2" />
                عرض التقارير
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              تنبيهات النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-warning-50 rounded-lg">
                <Package className="w-5 h-5 text-warning-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-warning-800">انخفاض المخزون</p>
                  <p className="text-sm text-warning-600">
                    {dashboardData.lowStockItems} منتجات تحتاج إعادة تموين
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary-800">طلبات معلقة</p>
                  <p className="text-sm text-primary-600">
                    {dashboardData.pendingOrders} طلب في انتظار المعالجة
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              الإشعارات الأخيرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-2 hover:bg-secondary-50 rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-success-500' :
                    notification.type === 'warning' ? 'bg-warning-500' : 'bg-primary-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-primary font-medium truncate">
                      {notification.message}
                    </p>
                    <p className="text-xs text-secondary">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}

              <Button variant="ghost" size="sm" className="w-full text-center">
                عرض جميع الإشعارات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Legacy Notifications */}
      {notifications.length > 0 && (
        <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <CardHeader>
            <CardTitle>إشعارات النظام القديم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.map((msg, index) => (
                <div key={index} className="p-3 bg-secondary-50 rounded-lg">
                  <p className="text-sm text-secondary">{msg}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}