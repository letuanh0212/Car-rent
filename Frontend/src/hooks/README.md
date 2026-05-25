# Hooks Frontend

Tài liệu này mô tả folder `Frontend/src/hooks`, nơi chứa các custom React hook dùng để gom logic gọi API, dispatch Redux, đọc state Redux, và xử lý form/action cho UI.

## Cấu trúc thư mục

```txt
Frontend/src/hooks
|-- AuthAcc
|   `-- accountLogin.jsx
|-- AuthCus
|   `-- useCustomerLogin.jsx
|-- Booking
|   `-- useBookingCreate.jsx
`-- Car
    |-- useCarAvailability.jsx
    |-- useCarDetail.jsx
    `-- useCars.jsx
```

## `AuthCus/useCustomerLogin.jsx`

Hook này xử lý đăng nhập customer.

### Import chính

```js
import authApi from "~/apis/customer/authCustomer";
import { loginSuccess } from "~/store/slices/authSlice";
```

### State nội bộ

```js
{
  loading,
  error
}
```

### Hàm trả về

```js
login(formData)
```

### Luồng xử lý

1. Component gọi `login(data)`.
2. Hook bật `loading = true` và xóa lỗi cũ.
3. Gọi `authApi.loginAccountSystem(formData)`.
4. Nếu thành công, dispatch `loginSuccess`.
5. `authSlice` lưu `accessToken`, `refreshToken`, `authType: "customer"` vào Redux và `localStorage`.
6. Hook return response.
7. Nếu lỗi, hook set `error` và throw lại lỗi cho component xử lý.
8. Cuối cùng tắt loading.

### Return

```js
{
  login,
  loading,
  error
}
```

### Nơi đang dùng

```txt
Frontend/src/pages/authCustomers/LoginPage.jsx
```

Trong `LoginPage.jsx`, sau khi `await login(data)` thành công thì navigate về `/`.

## `AuthAcc/accountLogin.jsx`

File này hiện đang rỗng.

Có thể dùng file này để viết hook đăng nhập admin/account sau này. Nếu viết theo pattern hiện tại, hook có thể:

- Gọi API từ `~/apis/admin/authAccountSystem`.
- Dispatch `loginSuccess({ accessToken, refreshToken, authType: "admin" })` nếu muốn dùng chung `authSlice`.
- Hoặc dispatch `loginThunk` nếu quyết định dùng `accountSlice` riêng.

## `Booking/useBookingCreate.jsx`

Hook này bọc logic tạo booking qua Redux thunk.

### Import chính

```js
import { useDispatch, useSelector } from "react-redux";
import { createBookingThunk } from "~/store/thunks/bookingThunk.js";
```

### State đọc từ Redux

```js
const bookingState = useSelector((state) => state.booking);
```

State này đến từ `bookingSlice`:

```js
{
  booking,
  loading,
  error
}
```

### Hàm trả về

```js
submitBooking(data)
```

### Luồng xử lý

1. Component gọi `submitBooking(data)`.
2. Hook dispatch `createBookingThunk(data)`.
3. Nếu thunk fulfilled, return:

```js
{
  success: true,
  data: result.payload
}
```

4. Nếu thunk rejected, return:

```js
{
  success: false,
  error: result.payload || result.error?.message
}
```

### Return

```js
{
  ...bookingState,
  submitBooking
}
```

### Nơi đang dùng

```txt
Frontend/src/pages/Car/_id.jsx
```

Trong page chi tiết xe, hook được dùng để lấy `submitBooking` và `bookingLoading`, sau đó truyền logic submit xuống `BookingWidget`.

## `Car/useCars.jsx`

Hook này lấy danh sách xe và lưu vào Redux `cars` state.

### Import chính

```js
import carApi from "~/apis/customer/carCustomer";
import {
  setCars,
  setCarLoading,
  setCarError,
} from "~/store/slices/carSlice";
```

### State đọc từ Redux

```js
const { cars, loading, error } = useSelector((state) => state.cars);
```

### Hàm nội bộ

```js
fetchCars()
```

### Luồng xử lý

1. Khi component mount, `useEffect` gọi `fetchCars()`.
2. Hook dispatch `setCarLoading(true)`.
3. Hook xóa lỗi cũ bằng `setCarError("")`.
4. Gọi `carApi.getCarList()`.
5. Nếu thành công, dispatch `setCars(response)`.
6. Nếu lỗi, dispatch `setCarError(...)`.
7. Cuối cùng dispatch `setCarLoading(false)`.

### Return

```js
{
  cars,
  loading,
  error,
  refetch
}
```

`refetch` chính là `fetchCars`, dùng khi component muốn tải lại danh sách xe.

### Nơi đang dùng

```txt
Frontend/src/pages/Car/index.jsx
```

Lưu ý: page hiện import hook với tên `carApi`:

```js
import carApi from "~/hooks/Car/useCars";
const { cars, loading, error } = carApi();
```

Code vẫn chạy vì default import có thể đặt tên tùy ý, nhưng nên đổi tên thành `useCars` cho dễ đọc:

```js
import useCars from "~/hooks/Car/useCars";
const { cars, loading, error } = useCars();
```

## `Car/useCarDetail.jsx`

Hook này lấy chi tiết một xe theo `carId` và lưu vào Redux `selectedCar`.

### Input

```js
useCarDetail(carId)
```

### Import chính

```js
import carApi from "~/apis/customer/carCustomer";
import {
  setSelectedCar,
  setCarLoading,
  setCarError,
} from "~/store/slices/carSlice";
```

### State đọc từ Redux

```js
const { selectedCar, loading, error } = useSelector((state) => state.cars);
```

### Luồng xử lý

1. Nếu không có `carId`, hook không gọi API.
2. Khi có `carId`, hook bật loading và xóa error.
3. Gọi `carApi.getCarDetails(carId)`.
4. Nếu component vẫn còn mounted, dispatch `setSelectedCar(response)`.
5. Nếu lỗi, dispatch `setCarError(...)`.
6. Cuối cùng tắt loading.
7. Hook dùng biến `isMounted` để tránh update state sau khi component unmount.

### Return

```js
{
  car: selectedCar,
  loading,
  error
}
```

### Nơi đang dùng

```txt
Frontend/src/pages/Car/_id.jsx
```

Lưu ý: page hiện import hook với tên `carDetailApi`:

```js
import carDetailApi from "~/hooks/Car/useCarDetail";
const { car } = carDetailApi(id);
```

Nên đổi tên import thành `useCarDetail` để đúng convention hook:

```js
import useCarDetail from "~/hooks/Car/useCarDetail";
const { car } = useCarDetail(id);
```

## `Car/useCarAvailability.jsx`

Hook này kiểm tra xe có trống trong khoảng ngày `checkIn` - `checkOut` hay không.

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
  loading
}
```

### Import chính

```js
import bookingApi from "~/apis/customer/bookingCustomer";
import { isBookingOverlap } from "~/utils/bookingAvailability.js";
```

### Luồng xử lý

1. Nếu không có `carId`, hook không gọi API.
2. Khi có `carId`, hook bật loading.
3. Gọi API lấy danh sách booking của xe.
4. Gán dữ liệu vào `bookedSlots`.
5. Khi `checkIn`, `checkOut`, hoặc `bookedSlots` thay đổi, hook tính lại `isAvailable`.
6. Nếu thiếu ngày, `isAvailable = null`.
7. Nếu `checkOut <= checkIn`, `isAvailable = false`.
8. Nếu có overlap theo `isBookingOverlap`, `isAvailable = false`.
9. Nếu không trùng lịch, `isAvailable = true`.

### Return

```js
{
  bookedSlots,
  loading,
  isAvailable,
  message
}
```

### Message

| Điều kiện | Message |
| --- | --- |
| `isAvailable === null` | `""` |
| `isAvailable === true` | `"This time range is available."` |
| `isAvailable === false` | `"This car is already booked or in maintenance time."` |

### Điểm cần chú ý

Trong hook này đang gọi:

```js
bookingApi.getBookingsByListingId(carId)
```

Nhưng trong file API hiện tại:

```txt
Frontend/src/apis/customer/bookingCustomer.js
```

chưa có method `getBookingsByListingId`. File API hiện có:

```js
createBooking(data)
getBookingDetails(bookingId)
checkCarAvailability(carId, startDate, endDate)
```

Vì vậy hook này có thể lỗi runtime nếu được dùng trực tiếp. Có hai hướng sửa:

1. Thêm method `getBookingsByListingId` vào `bookingCustomer.js`.
2. Đổi hook sang dùng method đang có là `checkCarAvailability(carId, startDate, endDate)`.

### Nơi đang dùng

Hiện `BookingWidget.jsx` không import hook này, mà đang import bản khác trong store:

```js
import useCarAvailability from "~/store/slices/useCarAvailability";
```

File đó nằm tại:

```txt
Frontend/src/store/slices/useCarAvailability.js
```

Điều này gây trùng logic vì project đang có hai hook availability:

```txt
Frontend/src/hooks/Car/useCarAvailability.jsx
Frontend/src/store/slices/useCarAvailability.js
```

Nên thống nhất chỉ dùng một file hook, tốt nhất là file trong:

```txt
Frontend/src/hooks/Car/useCarAvailability.jsx
```

và sửa import trong `BookingWidget.jsx`.

## Luồng tổng quát

### Customer login

```txt
LoginPage.jsx
-> useCustomerLogin()
-> authCustomer.loginAccountSystem(data)
-> dispatch(loginSuccess)
-> authSlice lưu token/user/authType
-> navigate("/")
```

### List xe

```txt
Car/index.jsx
-> useCars()
-> carCustomer.getCarList()
-> dispatch(setCars)
-> render danh sách xe
```

### Chi tiết xe

```txt
Car/_id.jsx
-> useCarDetail(id)
-> carCustomer.getCarDetails(id)
-> dispatch(setSelectedCar)
-> render DetailGallery, DetailInfo, BookingWidget
```

### Tạo booking

```txt
Car/_id.jsx
-> useBooking()
-> submitBooking(payload)
-> dispatch(createBookingThunk)
-> BookingCustomer.createBooking(payload)
-> bookingSlice cập nhật booking/loading/error
```

### Kiểm tra xe trống

```txt
BookingWidget.jsx
-> useCarAvailability({ carId, checkIn, checkOut })
-> lấy danh sách booking của xe
-> isBookingOverlap(...)
-> trả về isAvailable/message
```

## Các điểm nên sửa để code rõ hơn

### 1. Đổi tên import hook đúng convention

Hiện có:

```js
import carApi from "~/hooks/Car/useCars";
import carDetailApi from "~/hooks/Car/useCarDetail";
```

Nên đổi thành:

```js
import useCars from "~/hooks/Car/useCars";
import useCarDetail from "~/hooks/Car/useCarDetail";
```

### 2. Xóa hoặc gom duplicate `useCarAvailability`

Hiện có hai file cùng chức năng:

```txt
Frontend/src/hooks/Car/useCarAvailability.jsx
Frontend/src/store/slices/useCarAvailability.js
```

Nên giữ hook trong `hooks/Car` và không để React hook trong folder `store/slices`.

### 3. Sửa API method trong `useCarAvailability.jsx`

Nếu dùng file hook trong `hooks/Car`, cần sửa method:

```js
bookingApi.getBookingsByListingId(carId)
```

vì method này chưa tồn tại trong `bookingCustomer.js`.

### 4. Hoàn thiện `AuthAcc/accountLogin.jsx`

File này đang rỗng. Nếu app có login admin/account, nên viết hook riêng hoặc xóa file nếu chưa dùng.

### 5. Kiểm tra key localStorage logout customer

Trong `authSlice`, customer token được lưu bằng key:

```txt
customerAccessToken
customerRefreshToken
```

Nhưng `authCustomer.logout()` đang xóa:

```txt
CustomerAccessToken
```

Chữ hoa/thường khác nhau, nên logout qua API helper này có thể không xóa đúng token.
