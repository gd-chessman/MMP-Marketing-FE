# Hệ thống Dịch thuật cho Services

## Tổng quan

Hệ thống này cho phép các file service trong dự án hiển thị thông báo lỗi đã được dịch theo ngôn ngữ hiện tại của người dùng.

## Cấu trúc

### 1. File ngôn ngữ (`src/lang/locales/`)

Các file JSON chứa bản dịch cho từng ngôn ngữ:
- `en.json` - Tiếng Anh
- `vi.json` - Tiếng Việt  
- `kr.json` - Tiếng Hàn
- `jp.json` - Tiếng Nhật

### 2. Utility functions (`src/utils/`)

- `errorMessages.ts` - Chứa các utility function để tạo thông báo lỗi đã dịch
- `getCurrentLang.ts` - Lấy ngôn ngữ hiện tại từ localStorage

### 3. Service files đã được cập nhật

- `Web3WalletService.ts`
- `PhantomWalletService.ts`
- `TelegramWalletService.ts`
- `GoogleAuthService.ts`

## Cách sử dụng

### 1. Thêm thông báo lỗi mới

Để thêm thông báo lỗi mới, cần cập nhật cả 4 file ngôn ngữ:

```json
// Trong tất cả file ngôn ngữ (en.json, vi.json, kr.json, jp.json)
{
  "services": {
    "errors": {
      "yourNewErrorKey": "Your error message in respective language"
    }
  }
}
```

### 2. Thêm key mới vào errorMessages.ts

```typescript
export const SERVICE_ERROR_KEYS = {
  // ... existing keys
  YOUR_NEW_ERROR_KEY: 'yourNewErrorKey'
} as const;
```

### 3. Sử dụng trong service

```typescript
import { createLocalizedError, SERVICE_ERROR_KEYS } from '@/utils/errorMessages';
import { getCurrentLang } from '@/utils/getCurrentLang';

// Trong function của service
if (someError) {
  const currentLang = getCurrentLang();
  throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.YOUR_NEW_ERROR_KEY);
}
```

## Các key lỗi hiện có

| Key | Mô tả |
|-----|-------|
| `PHANTOM_NOT_INSTALLED` | Ví Phantom chưa được cài đặt |
| `PHANTOM_NOT_INSTALLED_WITH_LINK` | Ví Phantom chưa được cài đặt (có link) |
| `PHANTOM_NOT_CONNECTED` | Ví Phantom chưa được kết nối |
| `PHANTOM_CONNECTION_REJECTED` | Người dùng từ chối kết nối |
| `PHANTOM_CONNECTION_FAILED` | Kết nối ví Phantom thất bại |
| `PHANTOM_SIGNATURE_REJECTED` | Người dùng từ chối ký |
| `PHANTOM_SIGNATURE_FAILED` | Ký tin nhắn thất bại |
| `PHANTOM_TRANSACTION_REJECTED` | Người dùng từ chối giao dịch |
| `PHANTOM_AUTH_FAILED` | Xác thực ví Phantom thất bại |
| `FAILED_TO_CREATE_TOKEN_ACCOUNT` | Tạo tài khoản token thất bại |
| `ERROR_GET_MY_WALLET` | Lỗi lấy thông tin ví |
| `ERROR_GET_GOOGLE_USER_INFO` | Lỗi lấy thông tin Google |

## Lưu ý

1. Hệ thống sẽ tự động lấy ngôn ngữ từ localStorage
2. Nếu không tìm thấy ngôn ngữ, sẽ mặc định là tiếng Anh
3. Nếu không tìm thấy key dịch, sẽ trả về key gốc
4. Tất cả thông báo lỗi đều được log ra console để debug

## Cập nhật ngôn ngữ

Khi cần thêm ngôn ngữ mới:

1. Tạo file JSON mới trong `src/lang/locales/`
2. Cập nhật `LangCodes` type trong `src/lang/index.ts`
3. Thêm vào `langConfig.listLangs` và `langConfig.langsApp`
4. Cập nhật `getCurrentLang()` function để hỗ trợ ngôn ngữ mới 