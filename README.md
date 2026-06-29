# Japanese Training Program - Next.js Static Site

Web tĩnh giới thiệu chương trình đào tạo tiếng Nhật, lấy nội dung từ file Excel `Khung CTDT Ngoại Ngữ - Tiếng Nhật`.

## Chạy local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Build static

```bash
npm run build
```

Do `next.config.mjs` đã đặt `output: 'export'`, kết quả static nằm trong thư mục `out/`, có thể deploy lên GitHub Pages, S3, Cloudflare Pages hoặc Netlify.
