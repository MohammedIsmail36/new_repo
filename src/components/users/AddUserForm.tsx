'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Loader2,
  Check,
  Shield,
  Users,
  Settings
} from 'lucide-react';

// UI Components
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { useToast, toast } from '@/components/ui/Toast';

// Validation
import {
  registerSchema,
  type RegisterFormData,
  checkPasswordStrength,
  validateUsernameOrEmail
} from '@/lib/auth/authValidation';

// Types
import type { AuthError } from '@/types/auth';

interface AddUserFormProps {
  onSuccess?: (user: any) => void;
  onError?: (error: AuthError) => void;
  isAdminPanel?: boolean;
}

// User roles and permissions
const userRoles = [
  { value: 'user', label: 'مستخدم عادي', description: 'صلاحيات أساسية للعرض والتصفح', color: 'bg-gray-50 text-gray-700 border-gray-200' },
  { value: 'employee', label: 'موظف', description: 'صلاحيات إدخال البيانات والتعديل', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'manager', label: 'مدير', description: 'صلاحيات إدارية وموافقات', color: 'bg-green-50 text-green-700 border-green-200' },
  { value: 'admin', label: 'مدير النظام', description: 'صلاحيات كاملة', color: 'bg-orange-50 text-orange-700 border-orange-200' }
];

const departments = [
  { value: 'sales', label: 'المبيعات' },
  { value: 'accounting', label: 'المحاسبة' },
  { value: 'hr', label: 'الموارد البشرية' },
  { value: 'it', label: 'تقنية المعلومات' },
  { value: 'management', label: 'الإدارة العليا' }
];

export default function AddUserForm({
  onSuccess,
  onError,
  isAdminPanel = false
}: AddUserFormProps) {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [autoGeneratePassword, setAutoGeneratePassword] = useState(true);

  // Hooks
  const { showToast } = useToast();

  // Form setup with additional admin fields
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isValid, isDirty }
  } = useForm<RegisterFormData & { role: string; department: string; notes: string }>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      role: 'user',
      department: 'sales',
      notes: '',
      agreeToTerms: true, // Auto-agree for admin creation
      subscribeToNewsletter: false
    }
  });

  // Watch form values
  const username = watch('username');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const selectedRole = watch('role');

  // Password strength check
  const passwordStrength = password && !autoGeneratePassword ? checkPasswordStrength(password) : null;

  // Generate random password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const length = 12;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setValue('password', result);
    setValue('confirmPassword', result);
    setAutoGeneratePassword(false);
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    clearErrors();

    try {
      // محاكاة إرسال البيانات إلى API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // محاكاة نجاح إضافة المستخدم
      const success = Math.random() > 0.2; // 80% نسبة نجاح

      if (success) {
        showToast(toast.success(
          'تم إنشاء المستخدم بنجاح',
          `تم إنشاء حساب ${data.firstName} ${data.lastName} وإرسال بيانات تسجيل الدخول إلى بريده الإلكتروني`,
          5000
        ));

        onSuccess?.(data);
      } else {
        // محاكاة أخطاء مختلفة
        const errorType = Math.random();
        if (errorType > 0.7) {
          setError('username', {
            type: 'manual',
            message: 'اسم المستخدم مستخدم بالفعل'
          });
        } else if (errorType > 0.4) {
          setError('email', {
            type: 'manual',
            message: 'البريد الإلكتروني مسجل بالفعل'
          });
        } else {
          throw new Error('خطأ في الخادم');
        }
      }
    } catch (error) {
      console.error('Add user error:', error);

      const authError: AuthError = {
        type: 'SERVER_ERROR',
        message: 'حدث خطأ أثناء إنشاء المستخدم. يرجى المحاولة مرة أخرى.',
      };

      onError?.(authError);

      showToast(toast.error(
        'فشل في إنشاء المستخدم',
        'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
        5000
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* معلومات شخصية */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">المعلومات الشخصية</h3>
          </div>

          {/* الاسم الأول واسم العائلة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الاسم الأول <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  {...register('firstName')}
                  type="text"
                  placeholder="أحمد"
                  className={`pr-10 ${errors.firstName ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                  autoComplete="given-name"
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                اسم العائلة <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  {...register('lastName')}
                  type="text"
                  placeholder="محمد"
                  className={`pr-10 ${errors.lastName ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                  autoComplete="family-name"
                />
              </div>
              {errors.lastName && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* اسم المستخدم والبريد الإلكتروني */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                اسم المستخدم <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  {...register('username')}
                  type="text"
                  placeholder="ahmed_mohamed"
                  className={`pr-10 pl-10 ${errors.username ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                  autoComplete="username"
                  dir="ltr"
                />
                {username && validateUsernameOrEmail(username) === 'username' && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
              {errors.username && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="ahmed@example.com"
                  className={`pr-10 pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                  autoComplete="email"
                  dir="ltr"
                />
                {email && validateUsernameOrEmail(email) === 'email' && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* رقم الهاتف */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              رقم الهاتف <span className="text-gray-400">(اختياري)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Phone className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                {...register('phoneNumber')}
                type="tel"
                placeholder="+966 50 123 4567"
                className={`pr-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="tel"
                dir="ltr"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* الصلاحيات والدور */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">الصلاحيات والدور الوظيفي</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* دور المستخدم */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                دور المستخدم <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('role')}
                placeholder="اختر دور المستخدم"
                options={userRoles.map(role => ({
                  value: role.value,
                  label: role.label
                }))}
                disabled={isLoading}
              />

              {selectedRole && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={userRoles.find(r => r.value === selectedRole)?.color}>
                      {userRoles.find(r => r.value === selectedRole)?.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {userRoles.find(r => r.value === selectedRole)?.description}
                  </p>
                </div>
              )}
            </div>

            {/* القسم */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                القسم <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('department')}
                placeholder="اختر القسم"
                options={departments}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* كلمة المرور */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">كلمة المرور</h3>
          </div>

          {/* خيار إنشاء كلمة مرور تلقائية */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="autoPassword"
                checked={autoGeneratePassword}
                onChange={(e) => setAutoGeneratePassword(e.target.checked)}
                className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                disabled={isLoading}
              />
              <label htmlFor="autoPassword" className="text-sm font-medium text-gray-700">
                إنشاء كلمة مرور تلقائياً وإرسالها للمستخدم عبر البريد الإلكتروني
              </label>
            </div>
          </div>

          {!autoGeneratePassword && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generatePassword}
                  disabled={isLoading}
                >
                  <Lock className="w-4 h-4 ml-2" />
                  إنشاء كلمة مرور قوية
                </Button>
              </div>

              {/* كلمة المرور */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  كلمة المرور <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={`w-full px-4 py-2 pr-10 border border-gray-300 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-400 ${errors.password ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    autoComplete="new-password"
                    dir="ltr"
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* مؤشر قوة كلمة المرور */}
                {password && passwordStrength && (passwordFocused || password.length > 0) && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">قوة كلمة المرور:</span>
                      <span className={`text-sm font-medium ${passwordStrength.color}`}>
                        {passwordStrength.strength}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.percentage <= 40 ? 'bg-red-500' :
                          passwordStrength.percentage <= 60 ? 'bg-yellow-500' :
                          passwordStrength.percentage <= 80 ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength.percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ملاحظات */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">معلومات إضافية</h3>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ملاحظات <span className="text-gray-400">(اختياري)</span>
            </label>
            <textarea
              {...register('notes')}
              placeholder="أي ملاحظات أو تعليمات خاصة بالمستخدم..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-400 resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* أزرار العمل */}
        <div className="flex items-center justify-end pt-8 border-t border-gray-100 gap-4">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => window.history.back()}
            >
              إلغاء
            </Button>

            <Button
              type="submit"
              disabled={!isValid || isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                  جاري إنشاء الحساب...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 ml-2" />
                  إنشاء المستخدم
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}