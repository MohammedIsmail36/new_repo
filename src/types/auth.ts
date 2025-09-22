// 🔐 أنواع بيانات المصادقة والمستخدمين
// تاريخ الإنشاء: 2025-09-21

import { DefaultSession } from 'next-auth';

// =============================================================================
// 👤 المستخدم والملف الشخصي
// =============================================================================

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  phoneNumber?: string;
  isActive: boolean;
  isVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;

  // معلومات الشركة/المؤسسة
  company?: {
    id: string;
    name: string;
    role: string;
  };

  // الأدوار والصلاحيات
  roles: UserRole[];
  permissions: string[];

  // الإعدادات الشخصية
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: 'ar' | 'en';
  theme: 'light' | 'dark' | 'system';
  timezone: string;
  dateFormat: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

// =============================================================================
// 🛡️ الأدوار والصلاحيات
// =============================================================================

export type UserRoleType =
  | 'super_admin'    // مدير النظام الرئيسي
  | 'admin'          // مدير
  | 'manager'        // مدير قسم
  | 'accountant'     // محاسب
  | 'cashier'        // أمين صندوق
  | 'sales_rep'      // مندوب مبيعات
  | 'viewer'         // مشاهد فقط
  | 'user';          // مستخدم عادي

export interface UserRole {
  id: string;
  name: UserRoleType;
  displayName: string;
  description?: string;
  permissions: Permission[];
  isActive: boolean;
  createdAt: Date;
}

export interface Permission {
  id: string;
  module: string;     // مثل: 'accounts', 'sales', 'inventory'
  action: string;     // مثل: 'create', 'read', 'update', 'delete'
  resource?: string;  // مثل: 'invoices', 'products', 'reports'
  description: string;
}

// =============================================================================
// 🔑 المصادقة والجلسات
// =============================================================================

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  agreeToTerms: boolean;
  subscribeToNewsletter?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    tokens: {
      access: string;
      refresh: string;
      expiresIn: number;
    };
  };
  errors?: Record<string, string[]>;
}

export interface RefreshTokenResponse {
  access: string;
  expiresIn: number;
}

// =============================================================================
// 🔄 استرداد كلمة المرور
// =============================================================================

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyResetTokenRequest {
  token: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
  data?: {
    resetToken?: string;
    expiresIn?: number;
  };
}

// =============================================================================
// 📧 تفعيل البريد الإلكتروني
// =============================================================================

export interface EmailVerificationRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

// =============================================================================
// 🔐 تغيير كلمة المرور
// =============================================================================

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// =============================================================================
// 📱 المصادقة الثنائية (2FA)
// =============================================================================

export interface TwoFactorSetupResponse {
  qrCode: string;
  secretKey: string;
  backupCodes: string[];
}

export interface TwoFactorVerifyRequest {
  code: string;
  rememberDevice?: boolean;
}

export interface TwoFactorLoginRequest extends LoginCredentials {
  twoFactorCode?: string;
}

// =============================================================================
// 📊 إدارة الجلسات
// =============================================================================

export interface UserSession {
  id: string;
  userId: string;
  deviceInfo: {
    userAgent: string;
    ip: string;
    location?: string;
    deviceType: 'mobile' | 'tablet' | 'desktop';
  };
  isActive: boolean;
  isCurrent: boolean;
  createdAt: Date;
  lastActivity: Date;
  expiresAt: Date;
}

// =============================================================================
// 📋 سجل النشاط
// =============================================================================

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

// =============================================================================
// ⚠️ أخطاء المصادقة
// =============================================================================

export type AuthErrorType =
  | 'INVALID_CREDENTIALS'
  | 'USER_NOT_FOUND'
  | 'USER_INACTIVE'
  | 'EMAIL_NOT_VERIFIED'
  | 'ACCOUNT_LOCKED'
  | 'PASSWORD_EXPIRED'
  | 'TWO_FACTOR_REQUIRED'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED'
  | 'PERMISSION_DENIED'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR';

export interface AuthError {
  type: AuthErrorType;
  message: string;
  details?: Record<string, unknown>;
}

// =============================================================================
// 🏪 إعدادات النظام
// =============================================================================

export interface AuthConfig {
  enableRegistration: boolean;
  enablePasswordReset: boolean;
  enableTwoFactor: boolean;
  enableSocialLogin: boolean;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  sessionTimeout: number; // بالدقائق
  maxLoginAttempts: number;
  lockoutDuration: number; // بالدقائق
}

// =============================================================================
// 🎭 توسيع NextAuth Types
// =============================================================================

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User;
    tokens: {
      access: string;
      refresh: string;
      expiresIn: number;
    };
  }

  interface JWT {
    user: User;
    access: string;
    refresh: string;
    expiresIn: number;
  }
}

// =============================================================================
// 📡 حالة المصادقة في التطبيق
// =============================================================================

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  tokens: {
    access: string | null;
    refresh: string | null;
    expiresIn: number | null;
  };
  permissions: string[];
  roles: UserRoleType[];
}

// =============================================================================
// 🔧 مساعدات النوع
// =============================================================================

export type LoginFormData = LoginCredentials;
export type RegisterFormData = RegisterData;
export type ForgotPasswordFormData = ForgotPasswordRequest;
export type ResetPasswordFormData = ResetPasswordRequest;
export type ChangePasswordFormData = ChangePasswordRequest;

// للتحقق من الصلاحيات
export type PermissionCheck = {
  module: string;
  action: string;
  resource?: string;
};

// للمسارات المحمية
export type ProtectedRouteConfig = {
  path: string;
  requiredPermissions?: PermissionCheck[];
  requiredRoles?: UserRoleType[];
  redirectTo?: string;
};