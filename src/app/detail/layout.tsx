import React from 'react';
import DashboardLayout from '@/layouts/dashboard-layout';
import ProtectedRoute from '@/components/auth/protected-route';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
