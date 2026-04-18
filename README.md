# Digital Profile

Đây là website profile tĩnh. Để có một link công khai (`public link`) mà mọi người khác có thể xem được, bạn cần đưa toàn bộ thư mục này lên một dịch vụ hosting.

## Tùy chọn đề xuất

### 1. GitHub Pages
1. Tạo repo trên GitHub.
2. Mở terminal trong thư mục `Digital Profile`.
3. Chạy:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
4. Vào trang repo trên GitHub, chọn `Settings` → `Pages`.
5. Chọn branch `main` và thư mục `/root`, rồi lưu.
6. GitHub sẽ cung cấp link công khai dạng: `https://<username>.github.io/<repo>/`.

### 2. Netlify
1. Đăng ký/đăng nhập Netlify tại https://www.netlify.com.
2. Tạo site mới và chọn deploy từ Git.
3. Kết nối với repo GitHub của bạn.
4. Chọn branch `main` và deploy.
5. Netlify cung cấp link công khai dạng: `https://<site-name>.netlify.app`.

## Lưu ý
- `index.html` phải là file gốc.
- Link `window.location.href` trong trang sẽ là link public sau khi deploy.
- Không thể có link public chỉ bằng các file local trên máy tính.
