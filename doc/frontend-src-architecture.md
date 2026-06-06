# Frontend Src Architecture

Tài liệu này được viết lại theo trạng thái hiện tại của `Frontend/src`.

Mục tiêu:

- Ghi lại architecture thực tế đang có trong source.
- So sánh với architecture đề xuất ban đầu.
- Chỉ ra những điểm đã khác, điểm còn thiếu, và hướng nên chỉnh tiếp.

## 1. Tổng quan hiện tại

Frontend hiện tại là React SPA dùng:

- Vite
- React
- React Router
- Redux Toolkit
- React Redux
- Axios
- Tailwind CSS v4
- CSS variables trong `theme.css`

Entry chính:

```txt
src/main.jsx
  -> Redux Provider
  -> BrowserRouter
  -> App
```

Router hiện tại nằm trực tiếp trong:

```txt
src/App.jsx
```

Store Redux hiện tại nằm trong:

```txt
src/store/
```

Layout hiện tại nằm trong:

```txt
src/components/Layout/
```

Không còn folder `contexts/` trong `src` hiện tại. Auth state đang đi theo Redux, không còn đi theo AuthContext.

## 2. Cấu trúc `src` hiện tại

```txt
src/
  apis/
    Client/
      axiosAccountClient.js
      axiosCusClient.js
    authAccountSystem.js
    authCustomer.js
    car.js

  components/
    Badge/
    Button/
    CardCar/
    Form/
    Inputs/
    Layout/

  config/
    carStatus.js

  hooks/
    AuthCus/
      useCustomerLogin.jsx

  pages/
    authAccountSystem/
      LoginPageSystem.jsx
    authCustomers/
      LoginPage.jsx
      RegisterPage.jsx
    Booking/
      index.jsx
      _id.jsx
    Car/
      index.jsx
      _id.jsx

  store/
    index.js
    slices/
      authSlice.js

  styles/
    globals.css
    theme.css

  utils/
    currency.js

  App.jsx
  main.jsx
```

## 3. Luồng render app

### `main.jsx`

`main.jsx` đang làm đúng vai trò entry point:

```txt
createRoot
  -> StrictMode
  -> Provider store={store}
  -> BrowserRouter
  -> App
```

Điểm này đã khác với giai đoạn trước: Redux Provider hiện đã được bọc vào app.

### `App.jsx`

`App.jsx` đang khai báo route trực tiếp:

```txt
/
  -> PublicLayout
    -> /
    -> /login
    -> /register
```

Route hiện tại:

```txt
/         -> pages/Car/index.jsx
/login    -> pages/authCustomers/LoginPage.jsx
/register -> pages/authCustomers/RegisterPage.jsx
```

Các page `Booking`, `Car/_id`, `authAccountSystem/LoginPageSystem` đã có file nhưng chưa được nối route.

## 4. Architecture theo layer hiện tại

Hiện tại source đang đi theo kiểu:

```txt
Layer-based React Architecture
+ Component-driven UI
+ Redux auth state
```

Có thể gọi ngắn là:

```txt
Layered React SPA with Redux Toolkit
```

Các layer chính:

```txt
main/App layer
  -> khởi tạo Provider, Router, Routes

pages layer
  -> màn hình theo domain

components layer
  -> UI tái sử dụng

hooks layer
  -> logic UI gọi API và dispatch Redux

apis layer
  -> gọi backend qua axios instance

store layer
  -> global client state bằng Redux Toolkit

config/utils/styles layer
  -> constant, helper, theme, global style
```

## 5. Pages layer

### `pages/Car/index.jsx`

Đây đang là page chính cho route `/`.

Vai trò:

- Hiển thị danh sách xe.
- Dùng mock data nội bộ `mockCars`.
- Render danh sách bằng component `CardCar`.

Hiện tại page này chưa gọi API thật.

Luồng:

```txt
CarListPage
  -> mockCars
  -> CardCar
```

### `pages/Car/_id.jsx`

File tồn tại nhưng đang trống.

Dự kiến nên dùng cho trang chi tiết xe, ví dụ:

```txt
/cars/:id
```

### `pages/Booking/index.jsx`

File tồn tại nhưng đang trống.

Dự kiến nên dùng cho danh sách booking hoặc flow đặt xe.

### `pages/Booking/_id.jsx`

File tồn tại nhưng đang trống.

Dự kiến nên dùng cho chi tiết booking.

### `pages/authCustomers/LoginPage.jsx`

Đây là trang login customer.

Luồng hiện tại:

```txt
LoginPage
  -> lấy email/password từ form
  -> useCustomerLogin.login(data)
  -> navigate("/")
```

Trang này dùng:

- `InputWithIcon`
- `InputField`
- `Button`
- `FormCard`
- `FormActions`
- `useCustomerLogin`
- `useNavigate`

### `pages/authCustomers/RegisterPage.jsx`

Đây là UI register customer.

Hiện tại:

- Có form UI.
- Chưa có submit handler.
- Chưa gọi API register.
- Chưa dispatch Redux.
- Chưa validate confirm password.

### `pages/authAccountSystem/LoginPageSystem.jsx`

File tồn tại nhưng đang trống.

Dự kiến dùng cho login admin/account/system.

## 6. Components layer

### `components/Layout`

Hiện tại layout nằm trong `components/Layout`, không nằm trong folder `layouts`.

```txt
components/Layout/
  publicLayout.jsx
  privateLayout.jsx
  AppBar/
  Footer/
```

#### `publicLayout.jsx`

Đang bọc:

```txt
AppBar
Outlet
Footer
```

Đây là public shell cho các route public.

#### `privateLayout.jsx`

File tồn tại nhưng đang trống.

Dự kiến nên dùng cho route cần đăng nhập.

#### `AppBar/index.jsx`

AppBar hiện đã kết nối Redux:

```txt
useSelector(state.auth)
useDispatch(logout)
```

Nếu chưa login:

```txt
Login
Register
```

Nếu đã login:

```txt
avatar button
profile menu
my bookings
logout
```

Logout hiện dispatch Redux action `logout()` rồi redirect về `/login`.

#### `Footer/index.jsx`

Footer là UI tĩnh, gồm:

- Brand
- Link groups
- Newsletter form

Một số link trong footer như `/cars`, `/locations`, `/corporate`, `/contact`, `/help`, `/privacy` hiện chưa có route.

### `components/CardCar`

`CardCar` là card hiển thị xe.

Input:

```txt
car
```

Phụ thuộc:

- `Button`
- `Badge`
- `carStatusLabel`
- `carStatusVariant`
- `formatCurrency`

Hiển thị:

- thumbnail
- status
- title
- brand/model
- year
- transmission
- seat count
- fuel type
- location
- description
- price per day
- Book Now button

Hiện tại `Book Now` chưa có handler hoặc link.

### `components/Button`

Button generic.

Props chính:

```txt
variant
fullWidth
className
children
...props
```

Variant hiện có:

```txt
primary
secondary
ghost
outline
```

### `components/Badge`

Badge generic.

Variant hiện có:

```txt
success
warning
error
```

### `components/Inputs`

Hiện có:

```txt
Inputs/index.jsx
Inputs/InputField.jsx
Inputs/InputWithIcon.jsx
```

`Input` là input base.

`InputField` bọc label và children.

`InputWithIcon` bọc icon Material Symbols ở bên trái input.

### `components/Form`

Hiện có:

```txt
FormCard.jsx
FormActions.jsx
FormSection.jsx
FormRow .jsx
```

Lưu ý: file `FormRow .jsx` có dấu cách trước `.jsx`. Nên đổi lại thành:

```txt
FormRow.jsx
```

để tránh lỗi import khó nhìn và lỗi đường dẫn trên môi trường khác.

## 7. Hooks layer

### `hooks/AuthCus/useCustomerLogin.jsx`

Đây là hook login customer.

Vai trò:

- Quản lý `loading`.
- Quản lý `error`.
- Gọi API customer login.
- Dispatch Redux `loginSuccess`.
- Trả response cho page.

Luồng hiện tại:

```txt
useCustomerLogin.login(formData)
  -> authApi.loginAccountSystem(formData)
  -> dispatch loginSuccess({
       accessToken,
       refreshToken,
       authType: "customer"
     })
```

Điểm đúng:

- Hook đã dùng `useDispatch`.
- Auth state được đưa về Redux.
- Page không tự ghi localStorage nữa.

Điểm cần sửa:

- Tên API `loginAccountSystem` không đúng nghĩa customer.
- Nên đổi thành `loginCustomer`.
- Cần đảm bảo `response.accessToken` đúng với shape backend trả về.

## 8. Store layer

### `store/index.js`

Store hiện tại:

```txt
auth -> authReducer
```

Đã export default store.

### `store/slices/authSlice.js`

Auth slice hiện tại quản lý:

```txt
token
user
authType
isAuthenticated
```

Initial state đọc token từ localStorage:

```txt
customerAccessToken
adminAccessToken
```

Action hiện có:

```txt
loginSuccess
logout
```

`loginSuccess` nhận:

```txt
accessToken
refreshToken
authType
```

Nếu `authType === "customer"`:

- Xóa account token.
- Lưu customer token.

Nếu `authType === "admin"`:

- Xóa customer token.
- Lưu account token.

Điểm cần chú ý lớn:

```txt
initialState đọc adminAccessToken
loginSuccess admin lại ghi accountAccessToken
```

Đây là lệch key.

Bạn nên chọn một naming duy nhất:

```txt
customerAccessToken
customerRefreshToken
accountAccessToken
accountRefreshToken
```

hoặc:

```txt
customerAccessToken
customerRefreshToken
adminAccessToken
adminRefreshToken
```

Không nên đọc `adminAccessToken` nhưng ghi `accountAccessToken`.

## 9. APIs layer

### `apis/Client/axiosCusClient.js`

Axios instance cho customer.

Vai trò:

- Base URL từ `VITE_API_BASE_URL`.
- Gắn `Authorization: Bearer <customerAccessToken>`.
- Khi gặp 401 thì thử refresh token qua `/customer/refresh-token`.
- Nếu refresh fail thì xóa customer token và redirect `/login`.

Response interceptor đang unwrap:

```txt
response -> response.data
```

Nghĩa là API wrapper dùng instance này không nên tiếp tục `return response.data`.

### `apis/Client/axiosAccountClient.js`

Axios instance cho account/admin.

Vai trò:

- Base URL từ `VITE_API_BASE_URL`.
- Gắn `Authorization: Bearer <accountAccessToken>`.
- Nếu 401 thì xóa account token và redirect `/account/login`.

File này chưa có refresh token flow như customer.

### `apis/authCustomer.js`

Đang là API wrapper cho customer auth.

Hiện tại có:

```txt
loginAccountSystem(formData)
logout()
register(formData)
```

Điểm cần sửa:

- Đang import nhầm `axiosAccountClient`.
- Nên import `axiosCusClient`.
- Tên `loginAccountSystem` nên đổi thành `loginCustomer`.
- Đang `return response.data` trong khi axios client có thể đã unwrap data.
- `logout()` đang xóa `CustomerAccessToken`, sai key so với phần còn lại là `customerAccessToken`.

### `apis/authAccountSystem.js`

Đang là API wrapper cho account/admin auth.

Hiện tại import:

```js
import AccountIntance from "./instance/AccountInstance";
```

Nhưng trong `src/apis` hiện tại không thấy folder:

```txt
apis/instance/
```

Trong source hiện tại chỉ có:

```txt
apis/Client/axiosAccountClient.js
```

Vậy file này có khả năng đang import sai đường dẫn. Nên dùng `axiosAccountClient`.

### `apis/car.js`

File hiện tại chưa hoàn thành, chỉ có:

```js
import
```

File này sẽ gây lỗi build nếu được import ở đâu đó.

Hiện tại chưa thấy route/page nào import `apis/car.js`, nhưng vẫn nên hoàn thiện hoặc xóa nếu chưa dùng.

## 10. Config layer

### `config/carStatus.js`

Đang map status xe sang label và badge variant.

```txt
available   -> Available    -> success
rented      -> Rented       -> warning
maintenance -> Maintenance  -> error
```

File này đang được `CardCar` dùng đúng vai trò.

## 11. Utils layer

### `utils/currency.js`

Có helper:

```txt
formatCurrency(value)
```

Format tiền theo:

```txt
vi-VN
VND
maximumFractionDigits: 0
```

File này đang được `CardCar` dùng đúng vai trò.

## 12. Styles layer

### `styles/theme.css`

Đang chứa CSS variables cho:

- brand colors
- background/surface colors
- text colors
- border colors
- semantic colors
- font
- typography
- layout spacing
- radius
- shadow
- dark theme variables

Đây là hướng tốt vì component có thể dùng token thay vì hard-code màu.

### `styles/globals.css`

Đang import:

```css
@import "tailwindcss";
@import "./theme.css";
```

Và setup base:

- box sizing
- body font/background/color
- reset link
- form font inheritance
- image max width

Điểm cần chú ý:

- Một số component vẫn đang hard-code màu như `#191c1e`, `#45464d`, `#0058be`.
- Nếu muốn architecture style sạch hơn, nên dùng CSS variables thống nhất.

## 13. So sánh với architecture ban đầu

Architecture ban đầu trong doc cũ đề xuất:

```txt
Hybrid Layer-based + Component-driven React Architecture
```

Về ý tưởng tổng thể, source hiện tại vẫn đi đúng hướng layer-based + component-driven, nhưng cấu trúc thực tế đã khác khá nhiều.

### 13.1. Khác về folder

Ban đầu đề xuất:

```txt
src/
  apis/
  components/
  config/
  contexts/
  hooks/
  layouts/
  pages/
  routes/
  stores/
  styles/
  types/
  utils/
```

Hiện tại thực tế:

```txt
src/
  apis/
  components/
  config/
  hooks/
  pages/
  store/
  styles/
  utils/
  App.jsx
  main.jsx
```

Khác biệt chính:

- Không có `contexts/`.
- Không có `layouts/`; layout đang nằm trong `components/Layout`.
- Không có `routes/`; route đang nằm trong `App.jsx`.
- Không có `stores/`; hiện dùng `store/` số ít.
- Không có `types/`.
- Có `components/Form`, `components/Inputs`, `components/CardCar` thay vì chia `common/vehicle/layout`.

### 13.2. Khác về state management

Ban đầu doc cũ còn nghiêng về `contexts/AuthContext` hoặc `stores/authStore`.

Hiện tại source đã chọn:

```txt
Redux Toolkit
```

Đây là thay đổi tốt nếu app sẽ có nhiều màn cần auth state.

Nhưng cần thống nhất:

- Redux là nguồn auth state chính.
- Không thêm lại AuthContext nếu không có lý do rõ.
- Token key phải đồng bộ giữa slice, axios và API wrapper.

### 13.3. Khác về routes

Ban đầu đề xuất tách route:

```txt
routes/AppRoutes.jsx
routes/routePaths.js
routes/guards/
```

Hiện tại:

```txt
App.jsx chứa Routes trực tiếp
```

Với app nhỏ thì chấp nhận được.

Khi có thêm:

- booking route
- car detail route
- profile route
- account/admin route
- private route

thì nên tách `routes/`.

### 13.4. Khác về page naming

Ban đầu đề xuất domain lowercase:

```txt
pages/vehicles/
pages/bookings/
pages/auth/
```

Hiện tại:

```txt
pages/Car/
pages/Booking/
pages/authCustomers/
pages/authAccountSystem/
```

Không sai, nhưng nên thống nhất style.

Khuyến nghị:

```txt
pages/cars/
pages/bookings/
pages/authCustomers/
pages/authAccountSystem/
```

hoặc:

```txt
pages/Car/
pages/Booking/
pages/AuthCustomers/
pages/AuthAccountSystem/
```

Quan trọng là đừng trộn lowercase và PascalCase folder cho domain.

### 13.5. Khác về components

Ban đầu đề xuất:

```txt
components/common/
components/layout/
components/vehicle/
```

Hiện tại:

```txt
components/Button/
components/Badge/
components/CardCar/
components/Form/
components/Inputs/
components/Layout/
```

Với project nhỏ, cách hiện tại dễ dùng.

Khi component nhiều hơn, nên chuyển dần thành:

```txt
components/common/Button
components/common/Badge
components/common/Inputs
components/common/Form
components/layout/AppBar
components/layout/Footer
components/vehicle/CardCar
```

### 13.6. Khác về API layer

Ban đầu đề xuất API theo domain rõ:

```txt
authApi.js
vehicleApi.js
bookingApi.js
```

Hiện tại:

```txt
authCustomer.js
authAccountSystem.js
car.js
Client/axiosCusClient.js
Client/axiosAccountClient.js
```

Hướng hiện tại có ưu điểm là tách customer auth và account auth.

Nhưng còn lỗi naming/import:

- `authCustomer` đang dùng account axios.
- `authAccountSystem` import instance không tồn tại.
- `car.js` chưa hoàn chỉnh.

## 14. Các vấn đề architecture hiện tại cần sửa trước

### Mức ưu tiên cao

1. Đồng bộ token key trong `authSlice`, `axiosAccountClient`, `axiosCusClient`, `authCustomer`, `authAccountSystem`.
2. Sửa `authCustomer.js` dùng `axiosCusClient`.
3. Sửa `authAccountSystem.js` dùng đúng `axiosAccountClient`.
4. Sửa `authCustomer.loginAccountSystem` thành `loginCustomer`.
5. Sửa `return response.data` ở API wrapper nếu axios interceptor đã return `response.data`.
6. Hoàn thiện hoặc xóa `apis/car.js` vì file đang dang dở.

### Mức ưu tiên trung bình

1. Tạo route cho `Booking`, `Car/_id`, `LoginPageSystem`.
2. Tạo private route hoặc layout guard cho customer route.
3. Hoàn thiện `privateLayout.jsx`.
4. Hoàn thiện register customer flow.
5. Thêm account/admin login hook riêng.
6. Đổi `FormRow .jsx` thành `FormRow.jsx`.

### Mức ưu tiên thấp

1. Tách `routes/` khi số route tăng.
2. Chuẩn hóa folder naming.
3. Tách component theo `common/layout/vehicle` khi component nhiều.
4. Giảm hard-code màu, dùng CSS variables nhiều hơn.
5. Thêm selectors cho auth slice.

## 15. Hướng architecture nên đi tiếp

Vì source hiện tại đã dùng Redux, hướng nên giữ là:

```txt
React SPA
+ Layer-based folders
+ Redux Toolkit for global state
+ Axios clients by auth domain
+ Component-driven UI
```

Cấu trúc nên tiến hóa dần thành:

```txt
src/
  apis/
    Client/
      axiosCusClient.js
      axiosAccountClient.js
    authCustomer.js
    authAccountSystem.js
    car.js
    booking.js

  components/
    common/
      Badge/
      Button/
      Form/
      Inputs/
    layout/
      AppBar/
      Footer/
    vehicle/
      CardCar/

  config/
    carStatus.js
    routes.js

  hooks/
    AuthCus/
      useCustomerLogin.jsx
      useCustomerRegister.jsx
    AuthAccount/
      useAccountLogin.jsx

  pages/
    cars/
      index.jsx
      _id.jsx
    bookings/
      index.jsx
      _id.jsx
    authCustomers/
      LoginPage.jsx
      RegisterPage.jsx
    authAccountSystem/
      LoginPageSystem.jsx

  routes/
    AppRoutes.jsx
    guards/
      CustomerPrivateRoute.jsx
      AccountPrivateRoute.jsx

  store/
    index.js
    slices/
      authSlice.js

  styles/
    globals.css
    theme.css

  utils/
    currency.js
    storage.js
```

Không cần refactor hết ngay. Nên làm theo thứ tự:

```txt
1. Sửa auth/API/token cho chạy đúng.
2. Nối route còn thiếu.
3. Hoàn thiện register, account login, private route.
4. Sau đó mới dọn folder naming và tách routes.
```

## 16. Kết luận

Architecture ban đầu và source hiện tại vẫn cùng hướng: layer-based và component-driven.

Nhưng source hiện tại đã thay đổi ở các điểm quan trọng:

- Auth chuyển sang Redux Toolkit.
- Không còn Context.
- Layout đặt trong `components/Layout` thay vì `layouts`.
- Routes đặt trực tiếp trong `App.jsx` thay vì folder `routes`.
- Store dùng `store/` số ít.
- API tách customer/account nhưng còn sai import và sai naming.
- Một số file page/API đã tạo nhưng chưa hoàn thiện.

Vì vậy architecture hiện tại chưa sai hướng, nhưng đang ở trạng thái giữa chừng. Việc cần làm trước không phải refactor lớn, mà là đồng bộ auth flow, token key, axios client và route guard để nền app ổn định trước.
