# Short Videos Data API Backend

## 1. Giới thiệu

Đây là dự án API Backend được xây dựng bằng **NestJS** nhằm quản lý và cung cấp dữ liệu short videos từ các nguồn bên ngoài (Google Sheet và API bên thứ ba). Dự án bao gồm các module chính:
- **Fetch Info Data**: Lấy thông tin người dùng từ Google Sheet và lưu vào file JSON.
- **Fetch Shorts Data**: Thu thập dữ liệu short videos từ API bên ngoài và lưu vào cơ sở dữ liệu.
- **Expose APIs**: Cung cấp các endpoint RESTful để client truy vấn dữ liệu short videos.

## 2. Yêu cầu hệ thống

- **Node.js**: v16.x hoặc cao hơn.
- **npm** hoặc **yarn**: Để quản lý package.
- **Cơ sở dữ liệu**: MySQL hoặc MongoDB (tùy cấu hình).
- **Google Cloud Credentials**: Service Account để truy cập Google Sheet API.
- **API Keys**: Key cho API bên ngoài (API A và API B).

## 3. Cài đặt

### 3.1. Clone repository
```bash
git clone <repository-url>
cd short-videos-data-api
```

### 3.2. Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### 3.3. Cấu hình biến môi trường
Tạo file `.env` trong thư mục gốc dựa trên mẫu `.env.example`:
```plaintext
# Database (MySQL hoặc MongoDB)
DATABASE_URL=mysql://user:password@localhost:3306/short_videos_db
# hoặc
# DATABASE_URL=mongodb://localhost:27017/short_videos_db

# Google Sheet API
GOOGLE_SHEET_ID=<your-sheet-id>
GOOGLE_APPLICATION_CREDENTIALS=<path-to-service-account-json>

# External APIs
API_SECRET_KEY=<your-api-key>
API_URL=<api-endpoint>

# Application
PORT=3000
NODE_ENV=development
```

### 3.4. Khởi động dự án
- **Chế độ development**:
  ```bash
  npm run start:dev
  # hoặc
  yarn start:dev
  ```
- **Chế độ production**:
  ```bash
  npm run build
  npm run start:prod
  # hoặc
  yarn build
  yarn start:prod
  ```

## 4. Cấu trúc thư mục

```plaintext
src/
├── modules/
│   ├── info-data/              # Module lấy dữ liệu từ Google Sheet
│   ├── shorts-data/            # Module xử lý dữ liệu short videos
│   ├── api/                    # Module cung cấp RESTful APIs
├── common/                     # Config, DTO, entities, helpers
├── app.module.ts               # Module gốc
├── main.ts                     # Entry point
```

## 5. Các lệnh hữu ích

- **Kiểm tra code**:
  ```bash
  npm run lint
  ```
- **Chạy unit tests**:
  ```bash
  npm run test
  ```
- **Chạy integration tests**:
  ```bash
  npm run test:e2e
  ```

## 6. API Documentation

API được tài liệu hóa bằng **Swagger**. Truy cập tại:
```
http://localhost:3000/api
```

Các endpoint chính:
- `GET /shorts`: Lấy danh sách short videos (phân trang).
- `GET /shorts/by-tags`: Lấy short videos theo tags.
- `GET /shorts/search`: Tìm kiếm short videos theo description.

## 7. Hướng dẫn phát triển

### 7.1. Công nghệ sử dụng
- **Framework**: NestJS (TypeScript).
- **Database**: TypeORM (MySQL) hoặc Mongoose (MongoDB).
- **Google Sheet API**: `@googleapis/sheets`.
- **Scheduler**: `@nestjs/schedule` (cron job mỗi giờ).
- **HTTP Client**: `@nestjs/axios`.
- **API Documentation**: `@nestjs/swagger`.

### 7.2. Quy trình làm việc
1. Tạo branch mới cho tính năng hoặc bugfix:
   ```bash
   git checkout -b feature/<tên-tính-năng>
   ```
2. Commit code theo chuẩn Conventional Commits:
   ```bash
   git commit -m "feat: add fetch info data module"
   ```
3. Push và tạo Pull Request (PR) lên GitHub/GitLab.
4. Đảm bảo tất cả test pass trước khi merge.
