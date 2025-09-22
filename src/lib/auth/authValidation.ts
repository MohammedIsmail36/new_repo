// 🔍 مخططات التحقق من صحة بيانات المصادقة
// تاريخ الإنشاء: 2025-09-21

import { z } from 'zod';

// =============================================================================
// 🔧 مساعدات التحقق المخصصة
// =============================================================================

// التحقق من قوة كلمة المرور
const passwordValidation = z
  .string()
  .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
  .max(128, 'كلمة المرور لا يجب أن تتجاوز 128 حرف')
  .regex(/^(?=.*[a-z])/, 'يجب أن تحتوي على حرف صغير واحد على الأقل')
  .regex(/^(?=.*[A-Z])/, 'يجب أن تحتوي على حرف كبير واحد على الأقل')
  .regex(/^(?=.*\d)/, 'يجب أن تحتوي على رقم واحد على الأقل')
  .regex(/^(?=.*[@$!%*?&])/, 'يجب أن تحتوي على رمز خاص واحد على الأقل (@$!%*?&)');

// التحقق من اسم المستخدم
const usernameValidation = z
  .string()
  .min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل')
  .max(30, 'اسم المستخدم لا يجب أن يتجاوز 30 حرف')
  .regex(/^[a-zA-Z0-9_]+$/, 'اسم المستخدم يجب أن يحتوي على أحرف وأرقام وشرطة سفلية فقط')
  .refine(val => !val.startsWith('_') && !val.endsWith('_'), {
    message: 'اسم المستخدم لا يجب أن يبدأ أو ينتهي بشرطة سفلية'
  });

// التحقق من البريد الإلكتروني
const emailValidation = z
  .string()
  .email('يرجى إدخال بريد إلكتروني صحيح')
  .max(254, 'البريد الإلكتروني لا يجب أن يتجاوز 254 حرف')
  .toLowerCase()
  .trim();

// التحقق من رقم الهاتف (اختياري)
const phoneValidation = z
  .string()
  .regex(/^[+]?[\d\s\-\(\)]+$/, 'رقم الهاتف غير صحيح')
  .min(10, 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل')
  .max(20, 'رقم الهاتف لا يجب أن يتجاوز 20 رقم')
  .optional()
  .or(z.literal(''));

// التحقق من الاسم
const nameValidation = z
  .string()
  .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
  .max(50, 'الاسم لا يجب أن يتجاوز 50 حرف')
  .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'الاسم يجب أن يحتوي على أحرف عربية أو إنجليزية فقط')
  .trim();

// =============================================================================
// 🔑 مخططات تسجيل الدخول
// =============================================================================

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'يرجى إدخال اسم المستخدم أو البريد الإلكتروني')
    .max(254, 'اسم المستخدم أو البريد الإلكتروني طويل جداً')
    .trim(),
  password: z
    .string()
    .min(1, 'يرجى إدخال كلمة المرور')
    .max(128, 'كلمة المرور طويلة جداً'),
  rememberMe: z.boolean().optional().default(false),
});

export const twoFactorLoginSchema = loginSchema.extend({
  twoFactorCode: z
    .string()
    .min(6, 'رمز المصادقة الثنائية يجب أن يكون 6 أرقام')
    .max(8, 'رمز المصادقة الثنائية لا يجب أن يتجاوز 8 أرقام')
    .regex(/^\d+$/, 'رمز المصادقة الثنائية يجب أن يحتوي على أرقام فقط')
    .optional(),
});

// =============================================================================
// 📝 مخططات التسجيل
// =============================================================================

export const registerSchema = z
  .object({
    username: usernameValidation,
    email: emailValidation,
    firstName: nameValidation,
    lastName: nameValidation,
    password: passwordValidation,
    confirmPassword: z.string().min(1, 'يرجى تأكيد كلمة المرور'),
    phoneNumber: phoneValidation,
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: 'يجب الموافقة على الشروط والأحكام'
    }),
    subscribeToNewsletter: z.boolean().optional().default(false),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'كلمة المرور وتأكيد كلمة المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

// =============================================================================
// 🔄 مخططات استرداد كلمة المرور
// =============================================================================

export const forgotPasswordSchema = z.object({
  email: emailValidation,
});

export const verifyResetTokenSchema = z.object({
  token: z
    .string()
    .min(1, 'رمز الاسترداد مطلوب')
    .max(255, 'رمز الاسترداد غير صحيح'),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'رمز الاسترداد مطلوب'),
    newPassword: passwordValidation,
    confirmPassword: z.string().min(1, 'يرجى تأكيد كلمة المرور الجديدة'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

// =============================================================================
// 🔐 مخططات تغيير كلمة المرور
// =============================================================================

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'يرجى إدخال كلمة المرور الحالية')
      .max(128, 'كلمة المرور الحالية طويلة جداً'),
    newPassword: passwordValidation,
    confirmNewPassword: z.string().min(1, 'يرجى تأكيد كلمة المرور الجديدة'),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين',
    path: ['confirmNewPassword'],
  })
  .refine(data => data.currentPassword !== data.newPassword, {
    message: 'كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور الحالية',
    path: ['newPassword'],
  });

// =============================================================================
// 📧 مخططات البريد الإلكتروني
// =============================================================================

export const emailVerificationSchema = z.object({
  token: z
    .string()
    .min(1, 'رمز التفعيل مطلوب')
    .max(255, 'رمز التفعيل غير صحيح'),
});

export const resendVerificationSchema = z.object({
  email: emailValidation,
});

// =============================================================================
// 👤 مخططات الملف الشخصي
// =============================================================================

export const updateProfileSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  phoneNumber: phoneValidation,
  avatar: z
    .instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت')
    .refine(
      file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'نوع الصورة يجب أن يكون JPEG أو PNG أو WebP'
    )
    .optional(),
});

export const updatePreferencesSchema = z.object({
  language: z.enum(['ar', 'en'], {
    required_error: 'يرجى اختيار اللغة',
  }),
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'يرجى اختيار المظهر',
  }),
  timezone: z.string().min(1, 'يرجى اختيار المنطقة الزمنية'),
  dateFormat: z.string().min(1, 'يرجى اختيار تنسيق التاريخ'),
  currency: z.string().min(1, 'يرجى اختيار العملة'),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
});

// =============================================================================
// 🔐 مخططات المصادقة الثنائية
// =============================================================================

export const setupTwoFactorSchema = z.object({
  password: z.string().min(1, 'يرجى إدخال كلمة المرور الحالية'),
});

export const verifyTwoFactorSchema = z.object({
  code: z
    .string()
    .min(6, 'الرمز يجب أن يكون 6 أرقام')
    .max(8, 'الرمز لا يجب أن يتجاوز 8 أرقام')
    .regex(/^\d+$/, 'الرمز يجب أن يحتوي على أرقام فقط'),
  rememberDevice: z.boolean().optional().default(false),
});

export const disableTwoFactorSchema = z.object({
  password: z.string().min(1, 'يرجى إدخال كلمة المرور الحالية'),
  confirmationCode: z
    .string()
    .min(6, 'رمز التأكيد يجب أن يكون 6 أرقام')
    .max(8, 'رمز التأكيد لا يجب أن يتجاوز 8 أرقام')
    .regex(/^\d+$/, 'رمز التأكيد يجب أن يحتوي على أرقام فقط'),
});

// =============================================================================
// 🛡️ مخططات إدارة المستخدمين (للمدراء)
// =============================================================================

export const createUserSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  firstName: nameValidation,
  lastName: nameValidation,
  phoneNumber: phoneValidation,
  roles: z.array(z.string()).min(1, 'يجب اختيار دور واحد على الأقل'),
  isActive: z.boolean().default(true),
  sendWelcomeEmail: z.boolean().default(true),
});

export const updateUserSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  phoneNumber: phoneValidation,
  roles: z.array(z.string()).min(1, 'يجب اختيار دور واحد على الأقل'),
  isActive: z.boolean(),
});

export const assignRoleSchema = z.object({
  userId: z.string().min(1, 'معرف المستخدم مطلوب'),
  roleIds: z.array(z.string()).min(1, 'يجب اختيار دور واحد على الأقل'),
});

// =============================================================================
// 🏷️ تصدير أنواع البيانات المستنتجة
// =============================================================================

export type LoginFormData = z.infer<typeof loginSchema>;
export type TwoFactorLoginFormData = z.infer<typeof twoFactorLoginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type EmailVerificationFormData = z.infer<typeof emailVerificationSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type UpdatePreferencesFormData = z.infer<typeof updatePreferencesSchema>;
export type SetupTwoFactorFormData = z.infer<typeof setupTwoFactorSchema>;
export type VerifyTwoFactorFormData = z.infer<typeof verifyTwoFactorSchema>;
export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

// =============================================================================
// 🎯 مساعدات إضافية للتحقق
// =============================================================================

// فحص قوة كلمة المرور مع تفاصيل النتيجة
export const checkPasswordStrength = (password: string) => {
  const checks = {
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChars: /[@$!%*?&]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let strength: 'ضعيف' | 'متوسط' | 'قوي' | 'قوي جداً';
  let color: string;

  if (score <= 2) {
    strength = 'ضعيف';
    color = 'text-red-600';
  } else if (score === 3) {
    strength = 'متوسط';
    color = 'text-yellow-600';
  } else if (score === 4) {
    strength = 'قوي';
    color = 'text-blue-600';
  } else {
    strength = 'قوي جداً';
    color = 'text-green-600';
  }

  return {
    score,
    strength,
    color,
    checks,
    percentage: (score / 5) * 100,
  };
};

// التحقق من صحة اسم المستخدم أو البريد الإلكتروني
export const validateUsernameOrEmail = (input: string): 'username' | 'email' | 'invalid' => {
  if (emailValidation.safeParse(input).success) {
    return 'email';
  }

  if (usernameValidation.safeParse(input).success) {
    return 'username';
  }

  return 'invalid';
};

// رسائل خطأ مخصصة باللغة العربية
export const getValidationErrorMessage = (error: z.ZodError): Record<string, string> => {
  const errors: Record<string, string> = {};

  error.errors.forEach((err) => {
    const path = err.path.join('.');
    errors[path] = err.message;
  });

  return errors;
};