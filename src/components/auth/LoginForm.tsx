'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

// UI Components
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useToast, toast } from '@/components/ui/Toast';

// Validation
import { loginSchema, type LoginFormData, validateUsernameOrEmail } from '@/lib/auth/authValidation';

// Types
import type { AuthError } from '@/types/auth';

interface LoginFormProps {
  onSuccess?: (user: any) => void;
  onError?: (error: AuthError) => void;
  redirectTo?: string;
  className?: string;
}

export default function LoginForm({
  onSuccess,
  onError,
  redirectTo = '/dashboard',
  className
}: LoginFormProps) {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);

  // Hooks
  const router = useRouter();
  const { showToast } = useToast();

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid, isDirty }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false
    }
  });

  // Watch form values
  const username = watch('username');
  const password = watch('password');

  // Determine input type (email or username)
  const inputType = username ? validateUsernameOrEmail(username) : 'invalid';

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    if (isLocked) {
      showToast(toast.error(
        'الحساب مؤقتاً',
        `يرجى المحاولة مرة أخرى خلال ${lockoutTime} دقيقة`,
        5000
      ));
      return;
    }

    setIsLoading(true);
    clearErrors();

    try {
      // محاولة تسجيل الدخول
      const result = await signIn('credentials', {
        username: data.username.trim(),
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        // معالجة الأخطاء
        handleLoginError(result.error);
        setLoginAttempts(prev => prev + 1);

        // قفل الحساب بعد 5 محاولات فاشلة
        if (loginAttempts >= 4) {
          setIsLocked(true);
          setLockoutTime(15); // 15 دقيقة

          showToast(toast.error(
            'تم قفل الحساب مؤقتاً',
            'تم تجاوز عدد محاولات تسجيل الدخول المسموحة. يرجى المحاولة مرة أخرى خلال 15 دقيقة.',
            8000
          ));

          // إزالة القفل بعد 15 دقيقة
          setTimeout(() => {
            setIsLocked(false);
            setLockoutTime(null);
            setLoginAttempts(0);
          }, 15 * 60 * 1000);

          return;
        }
      } else if (result?.ok) {
        // نجح تسجيل الدخول
        showToast(toast.success(
          'تم تسجيل الدخول بنجاح',
          'مرحباً بك مرة أخرى!',
          3000
        ));

        // Reset attempts on success
        setLoginAttempts(0);

        // Call success callback
        onSuccess?.(result);

        // Redirect
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('Login error:', error);

      const authError: AuthError = {
        type: 'NETWORK_ERROR',
        message: 'حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى.',
      };

      onError?.(authError);

      showToast(toast.error(
        'خطأ في الاتصال',
        'تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.',
        5000
      ));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login errors
  const handleLoginError = (error: string) => {
    switch (error) {
      case 'CredentialsSignin':
        setError('password', {
          type: 'manual',
          message: 'اسم المستخدم أو كلمة المرور غير صحيحة'
        });
        showToast(toast.error(
          'بيانات دخول غير صحيحة',
          'يرجى التحقق من اسم المستخدم وكلمة المرور والمحاولة مرة أخرى.',
          4000
        ));
        break;

      case 'USER_NOT_FOUND':
        setError('username', {
          type: 'manual',
          message: 'المستخدم غير موجود'
        });
        break;

      case 'USER_INACTIVE':
        showToast(toast.error(
          'الحساب غير نشط',
          'تم إلغاء تفعيل حسابك. يرجى الاتصال بالدعم الفني.',
          6000
        ));
        break;

      case 'EMAIL_NOT_VERIFIED':
        showToast(toast.error(
          'البريد الإلكتروني غير مفعل',
          'يرجى تفعيل بريدك الإلكتروني أولاً.',
          5000
        ));
        break;

      default:
        showToast(toast.error(
          'خطأ غير معروف',
          'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
          4000
        ));
    }
  };

  return (
    <Card className={`py-12 px-6 w-full ${className}`}>
      <CardHeader className="space-y-4 pb-6">
        <CardTitle className="text-xl font-semibold text-center text-gray-900">
          تسجيل الدخول
        </CardTitle>

        {/* تنبيه محاولات الدخول */}
        {loginAttempts > 0 && loginAttempts < 5 && (
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning-600" />
              <span className="text-sm text-warning-800">
                محاولة فاشلة {loginAttempts} من 5. {5 - loginAttempts} محاولات متبقية.
              </span>
            </div>
          </div>
        )}

        {/* تنبيه القفل */}
        {isLocked && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-800">
                تم قفل الحساب مؤقتاً. يرجى المحاولة مرة أخرى خلال {lockoutTime} دقيقة.
              </span>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* حقل اسم المستخدم/البريد الإلكتروني */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              اسم المستخدم أو البريد الإلكتروني
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Mail className={`w-5 h-5 ${
                  inputType === 'email' ? 'text-blue-500' :
                  inputType === 'username' ? 'text-green-500' : 'text-gray-400'
                }`} />
              </div>
              <Input
                {...register('username')}
                type="text"
                placeholder="username or email@company.com"
                className={`pr-10 ${errors.username ? 'border-red-500' : ''}`}
                disabled={isLoading || isLocked}
                autoComplete="username"
                dir="ltr"
              />

              {/* مؤشر نوع الإدخال */}
              {username && inputType !== 'invalid' && (
                <div className="absolute inset-y-0 right-0 p-3 flex items-center">
                  <Badge
                    variant={inputType === 'email' ? 'primary' : 'success'}
                    size="xs"
                  >
                    {inputType === 'email' ? 'بريد' : 'مستخدم'}
                  </Badge>
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

          {/* حقل كلمة المرور */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`w-full px-4 py-2 pr-10 border border-gray-300 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-400 ${errors.password ? 'border-red-500' : ''}`}
                disabled={isLoading || isLocked}
                autoComplete="current-password"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading || isLocked}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* تذكرني ونسيت كلمة المرور */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                {...register('rememberMe')}
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-offset-0"
                disabled={isLoading || isLocked}
              />
              <label htmlFor="rememberMe" className="mr-2 text-sm text-gray-700">
                تذكرني
              </label>
            </div>

            <button
              type="button"
              onClick={() => {
                showToast(toast.info(
                  'قريباً',
                  'ميزة استرداد كلمة المرور ستكون متاحة قريباً',
                  3000
                ));
              }}
              className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          {/* زر تسجيل الدخول */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || !isDirty || isLoading || isLocked}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                جاري تسجيل الدخول...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 ml-2" />
                تسجيل الدخول
              </>
            )}
          </Button>
        </form>
      </CardContent>

    </Card>
  );
}