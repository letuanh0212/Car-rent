# Store Frontend

Tài liệu này mô tả folder `Frontend/src/store`, nơi cấu hình Redux store, các slice quản lý state, thunk gọi API bất đồng bộ, và một hook kiểm tra lịch xe.

## Cấu trúc thư mục

```txt
Frontend/src/store
|-- index.js
|-- slices
|   |-- accountSlice.js
|   |-- authSlice.js
|   |-- bookingSlice.js
|   |-- carSlice.js
|   `-- useCarAvailability.js
`-- thunks
    |-- authAccountThunk.js
    `-- bookingThunk.js
```

## `index.js`

File này tạo Redux store bằng `configureStore`.

Reducers đang được đăng ký:

| Key trong store | Reducer |
| --- | --- |
| `auth` | `authSlice` |
| `cars` | `carSlice` |
| `booking` | `bookingSlice` |

State tổng thể có dạng:

```js
{
  auth: {},
  cars: {},
  booking: {}
}
```

Lưu ý: `accountSlice.js` hiện chưa được đưa vào `configureStore`, nên state của slice này chưa sử dụng trong Redux store chính.

## `slices/authSlice.js`

Slice này quản lý trạng thái đăng nhập chung cho cả customer và admin.

### Initial state

```js
{
  token: token || null,
  user: token ? decodeJWT(token) : null,
  authType: "admin" | "customer" | null,
  isAuthenticated: Boolean(token)
}
```

Khi khởi tạo app, slice đọc token từ `localStorage`:

| LocalStorage key | Ý nghĩa |
| --- | --- |
| `customerAccessToken` | Access token của customer |
| `customerRefreshToken` | Refresh token của customer |
| `accountAccessToken` | Access token của admin/account |
| `accountRefreshToken` | Refresh token của admin/account |

Nếu có token, hàm `decodeJWT` sẽ đọc payload JWT bằng `atob` để gán vào `state.user`.

### Reducers

#### `loginSuccess`

Nhận payload:

```js
{
  accessToken,
  refreshToken,
  authType
}
```

Hành vi:

- Gán `state.token = accessToken`.
- Decode token để gán `state.user`.
- Gán `state.authType`.
- Đặt `state.isAuthenticated = true`.
- Nếu `authType === "customer"` thì xóa token admin và lưu token customer.
- Nếu `authType === "admin"` thì xóa token customer và lưu token admin.

#### `logout`

Hành vi:

- Reset `token`, `user`, `authType`.
- Đặt `isAuthenticated = false`.
- Xóa toàn bộ token customer và admin khỏi `localStorage`.

### Nơi đang dùng

Theo code hiện tại, `loginSuccess` được dùng trong:

```txt
Frontend/src/hooks/AuthCus/useCustomerLogin.jsx
```

## `slices/carSlice.js`

Slice này quản lý danh sách xe, xe đang chọn, trạng thái loading/error, và filter tìm kiếm.

### Initial state

```js
{
  cars: [],
  selectedCar: null,
  loading: false,
  error: "",
  filters: {
    keyword: "",
    brand: "",
    priceRange: null
  }
}
```

### Reducers

| Action | Chức năng |
| --- | --- |
| `setCars` | Gán danh sách xe |
| `setSelectedCar` | Gán xe đang được chọn |
| `setCarLoading` | Bật/tắt loading |
| `setCarError` | Gán lỗi |
| `setCarFilters` | Cập nhật một phần filter |
| `clearCarFilters` | Reset filter về mặc định |

Ví dụ state filter:

```js
{
  keyword: "Toyota",
  brand: "Toyota",
  priceRange: [100, 300]
}
```

## `slices/bookingSlice.js`

Slice này quản lý trạng thái tạo booking.

### Initial state

```js
{
  booking: null,
  loading: false,
  error: null
}
```

### Extra reducers

Slice lắng nghe `createBookingThunk` từ `thunks/bookingThunk.js`.

| Trạng thái thunk | Hành vi |
| --- | --- |
| `pending` | `loading = true`, xóa lỗi cũ |
| `fulfilled` | `loading = false`, gán `booking = action.payload` |
| `rejected` | `loading = false`, gán `error = action.payload` |

### Nơi đang dùng

Theo code hiện tại, `createBookingThunk` được dispatch trong:

```txt
Frontend/src/hooks/Booking/useBookingCreate.jsx
```

## `thunks/bookingThunk.js`

File này khai báo thunk:

```js
createBookingThunk
```

Action type:

```txt
bookings/create
```

Luồng xử lý:

1. Nhận `payload` từ component/hook.
2. Gọi `BookingCustomer.createBooking(payload)`.
3. Nếu thành công, return response.
4. Nếu lỗi, reject bằng:
   - `error.response.data`, hoặc
   - `error.message`, hoặc
   - chuỗi `"Create booking failed"`.

API được gọi từ:

```txt
~/apis/customer/bookingCustomer
```

## `slices/useCarAvailability.js`

File này không phải Redux slice, mà là một React hook. Tên file đang nằm trong folder `slices`, nhưng chức năng thực tế là hook kiểm tra xe có còn trống trong khoảng ngày được chọn hay không.

### Input

```js
useCarAvailability({
  carId,
  checkIn,
  checkOut
})
```

### State nội bộ

```js
{
  bookedSlots,
  loading,
  isAvailable,
  message
}
```

### Luồng xử lý

1. Khi có `carId`, hook gọi `bookingApi.checkCarAvailability(carId)`.
2. Dữ liệu trả về được lưu vào `bookedSlots`.
3. Khi `checkIn`, `checkOut`, hoặc `bookedSlots` thay đổi, hook tính lại `isAvailable`.
4. Hàm `isBookingOverlap` trong `~/utils/bookingAvailability.js` được dùng để kiểm tra trùng lịch.

### Giá trị trả về

| Field | Ý nghĩa |
| --- | --- |
| `bookedSlots` | Danh sách khoảng thời gian xe đã được đặt hoặc bảo trì |
| `loading` | Trạng thái đang gọi API |
| `isAvailable` | `true`, `false`, hoặc `null` nếu chưa đủ ngày |
| `message` | Thông báo tương ứng với trạng thái availability |

### Nơi đang dùng

Theo code hiện tại, hook này được import trong:

```txt
Frontend/src/components/Car/BookingWidget.jsx
```

Lưu ý: trong project cũng có file:

```txt
Frontend/src/hooks/Car/useCarAvailability.jsx
```

Nếu hai file này cùng chức năng, nên cân nhắc chỉ giữ một nơi để tránh bị lệch logic.

## `slices/accountSlice.js`

Slice này có vẻ được viết để quản lý đăng nhập/đăng ký/logout cho account system, nhưng hiện chưa được đăng ký vào store chính.

### Initial state

```js
{
  account: null,
  accessToken: localStorage.getItem("accountAccessToken") || null,
  loading: false,
  error: null,
  success: false
}
```

### Reducers

| Action | Chức năng |
| --- | --- |
| `clearAuthError` | Xóa lỗi auth |
| `resetAuthSuccess` | Reset `success` về `false` |

### Extra reducers

Slice này đang xử lý:

| Thunk | Pending | Fulfilled | Rejected |
| --- | --- | --- | --- |
| `loginThunk` | Bật loading, xóa error | Lưu account và access token | Lưu error |
| `registerSystemThunk` | Bật loading, xóa error | Lưu account | Lưu error |
| `logoutThunk` | Không xử lý pending | Reset account/token/loading/error/success | Không xử lý rejected |

## `thunks/authAccountThunk.js`

File này khai báo các thunk cho account/admin auth.

### `loginThunk`

Action type:

```txt
accounts/login
```

Luồng xử lý:

1. Gọi `authAccountSystem.login(data)`.
2. Nếu response có `accessToken`, lưu vào `localStorage.accountAccessToken`.
3. Return response cho reducer.
4. Nếu lỗi, reject bằng error.

### `registerSystemThunk`

Action type:

```txt
accounts/registerSystem
```

Luồng xử lý:

1. Gọi `authAccountSystem.registerSystem(data)`.
2. Return response nếu thành công.
3. Reject bằng error nếu thất bại.

### `logoutThunk`

Action type:

```txt
accounts/logout
```

Luồng xử lý:

1. Gọi `authAccountSystem.logout()`.
2. Return `true`.

## Các điểm cần chú ý trong code hiện tại

### 1. `accountSlice.js` import sai hoặc thiếu file

`accountSlice.js` đang import:

```js
import {
  loginThunk,
  logoutThunk,
  registerSystemThunk,
} from "../thunks/authThunk";
```

Nhưng folder `thunks` hiện chỉ có:

```txt
authAccountThunk.js
bookingThunk.js
```

Nếu không có file `authThunk.js`, import này sẽ lỗi. Có thể cần đổi thành:

```js
from "../thunks/authAccountThunk";
```

### 2. `authAccountThunk.js` import API chưa khớp với cây thư mục hiện tại

`authAccountThunk.js` đang import:

```js
import authAccountSystem from "~/apis/system/authAccountSystem";
```

Nhưng file hiện có là:

```txt
Frontend/src/apis/admin/authAccountSystem.js
```

Có thể cần đổi import thành:

```js
import authAccountSystem from "~/apis/admin/authAccountSystem";
```

### 3. `accountSlice.js` chưa được đưa vào store

`index.js` hiện chưa đăng ký reducer account. Nếu muốn dùng `accountSlice`, cần thêm vào `configureStore`, ví dụ:

```js
import accountReducer from "./slices/accountSlice";

const store = configureStore({
  reducer: {
    auth: autheReducer,
    cars: carReducer,
    booking: bookingReducer,
    account: accountReducer
  }
});
```

### 4. `useCarAvailability.js` đang nằm trong `slices`

File này là React hook, không phải Redux slice. Về tổ chức code, nên chuyển sang:

```txt
Frontend/src/hooks/Car/useCarAvailability.jsx
```

hoặc dùng file hook đã tồn tại ở `Frontend/src/hooks/Car/useCarAvailability.jsx`.

### 5. Có hai hướng auth đang tồn tại

Hiện project có:

- `authSlice.js`: quản lý auth chung bằng `loginSuccess/logout`.
- `accountSlice.js` + `authAccountThunk.js`: quản lý auth account/admin bằng async thunk.

Nên thống nhất rõ:

- Nếu dùng `authSlice.js` làm auth chính, admin login nên dispatch `loginSuccess`.
- Nếu dùng `accountSlice.js` cho admin riêng, cần đăng ký reducer `account` vào store và sửa import thunk/API.

## Tóm tắt luồng chính

### Customer login

```txt
useCustomerLogin.jsx
-> dispatch(loginSuccess)
-> authSlice lưu token/user/authType
-> localStorage lưu customer token
```

### Booking

```txt
useBookingCreate.jsx
-> dispatch(createBookingThunk)
-> BookingCustomer.createBooking(payload)
-> bookingSlice cập nhật loading/booking/error
```

### Kiểm tra xe trống

```txt
BookingWidget.jsx
-> useCarAvailability({ carId, checkIn, checkOut })
-> bookingApi.checkCarAvailability(carId)
-> isBookingOverlap(...)
-> trả về isAvailable và message
```

### Car state

```txt
Component/hook
-> dispatch setCars/setSelectedCar/setCarFilters
-> carSlice cập nhật danh sách xe, xe chọn, filter
```
