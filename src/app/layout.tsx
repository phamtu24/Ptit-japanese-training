import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CTĐT Tiếng Nhật PTIT KS26',
  description: 'Website tĩnh giới thiệu chương trình đào tạo tiếng Nhật cho sinh viên CNTT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
