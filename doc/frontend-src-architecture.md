# Frontend Source Architecture

Dựa trên 3 mockup:

- `mocup/home.html`
- `mocup/car_rent.html`
- `mocup/carDtail.html`

Frontend nên đi theo hướng **Hybrid Layer-based + Component-driven React Architecture**.

Nghĩa là:

- Chia folder theo layer trách nhiệm.
- UI dùng component tái sử dụng.
- Page chia theo domain nghiệp vụ.
- Layout tách khỏi page.
- Config, API, state, hook, utility tách riêng.

## Source Structure

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

## Ý Nghĩa Từng Folder

### `apis/`

Chứa hàm gọi backend, chia theo domain nghiệp vụ.

Với dự án LuxeDrive, folder này nên chứa:

```txt
apis/
  client.js
  authApi.js
  vehicleApi.js
  bookingApi.js
  customerApi.js
  reviewApi.js
  favoriteApi.js
  notificationApi.js
```

Ý nghĩa:

- `client.js`: cấu hình Axios instance, base URL, token, refresh token.
- `authApi.js`: login, register, logout, refresh token.
- `vehicleApi.js`: lấy danh sách xe, chi tiết xe, loại xe, ảnh xe.
- `bookingApi.js`: tạo booking, tính giá thuê, lịch sử booking.
- `customerApi.js`: thông tin profile khách hàng.
- `reviewApi.js`: đánh giá xe.
- `favoriteApi.js`: lưu xe yêu thích.
- `notificationApi.js`: thông báo người dùng.

Ví dụ domain từ mockup:

- Trang `home.html` cần API lấy featured cars.
- Trang `car_rent.html` cần API lấy danh sách xe và filter.
- Trang `carDtail.html` cần API lấy chi tiết xe, gallery, recommendation, booking price.

### `components/`

Chứa component dùng lại, không gắn với một page cụ thể.

Nên tổ chức theo component-driven:

```txt
components/
  common/
    Breadcrumbs/
    Badge/
    Button/
    FormField/
    IconButton/
    PriceText/
  layout/
    LuxeNavbar/
    LuxeFooter/
  vehicle/
    CarCard/
    VehicleGallery/
    VehicleSpecs/
    BookingCard/
    RecommendationCard/
    FilterPanel/
    SearchFleetForm/
```

Ý nghĩa:

- `common/`: UI generic dùng ở nhiều nơi.
- `layout/`: navbar, footer, navigation UI.
- `vehicle/`: component dùng lại trong domain xe.

Component lấy ra từ mockup:

- `LuxeNavbar`: xuất hiện ở cả 3 trang.
- `LuxeFooter`: xuất hiện ở cả 3 trang.
- `Breadcrumbs`: xuất hiện ở trang chi tiết xe.
- `CarCard`: xuất hiện ở home featured cars và fleet listing.
- `SearchFleetForm`: xuất hiện ở home.
- `FilterPanel`: phù hợp với trang `car_rent.html`.
- `VehicleGallery`: xuất hiện ở trang chi tiết xe.
- `VehicleSpecs`: engine, transmission, year, fuel type, seats, horsepower.
- `BookingCard`: widget đặt xe bên phải trang detail.
- `RecommendationCard`: phần "You might also like".

Mỗi component reusable nên có dạng:

```txt
CarCard/
  CarCard.jsx
  index.js
```

Khi cần mở rộng production:

```txt
CarCard/
  CarCard.jsx
  CarCard.module.css
  CarCard.test.jsx
  index.js
```

### `config/`

Chứa menu, access rule, constant app-level.

Nên có:

```txt
config/
  api/
    endpoints.js
    index.js
  navigation.js
  routes.js
  vehicleFilters.js
  luxeDriveCatalog.js
```

Ý nghĩa:

- `api/endpoints.js`: base URL, endpoint path.
- `navigation.js`: menu Browse Cars, Deals, About.
- `routes.js`: path route dùng chung.
- `vehicleFilters.js`: option filter như brand, type, fuel, transmission, price.
- `luxeDriveCatalog.js`: mock data hoặc config tạm khi chưa nối backend.

Từ mockup có các config rõ:

- Navigation: `Browse Cars`, `Deals`, `About`.
- Filter xe: brand/model, start date, end date, fuel type, seat count.
- Route: `/`, `/car-rent`, `/car-detail`.

### `contexts/`

Chứa React Provider cấp app như theme, locale, tenant.

Nên có:

```txt
contexts/
  AuthContext.jsx
  ThemeContext.jsx
  LocaleContext.jsx
```

Ý nghĩa:

- `AuthContext.jsx`: trạng thái đăng nhập, user hiện tại, role.
- `ThemeContext.jsx`: light/dark theme nếu app cần đổi theme.
- `LocaleContext.jsx`: ngôn ngữ, tiền tệ, format ngày.

Với LuxeDrive, `AuthContext` phù hợp vì navbar có `Login`, `Register`, sau này cần đổi thành avatar/user menu.

### `hooks/`

Chứa custom hook dùng lại.

Nên có:

```txt
hooks/
  useAuth.js
  useVehicles.js
  useVehicleDetail.js
  useBookingPrice.js
  useDebounce.js
  useScrollHeader.js
```

Ý nghĩa:

- `useAuth.js`: lấy user, login state, logout.
- `useVehicles.js`: lấy danh sách xe theo filter.
- `useVehicleDetail.js`: lấy chi tiết xe theo id.
- `useBookingPrice.js`: tính số ngày thuê, subtotal, fee, total.
- `useDebounce.js`: debounce keyword search.
- `useScrollHeader.js`: xử lý navbar đổi shadow khi scroll như trong `home.html`.

Logic từ mockup nên đưa vào hook:

- Tính giá thuê theo ngày trong detail page.
- Đổi ảnh gallery active.
- Search/filter xe.
- Navbar shadow khi scroll.

### `layouts/`

Chứa shell lớn như public layout, private layout, auth layout, sidebar, topbar.

Nên có:

```txt
layouts/
  PublicLayout.jsx
  PrivateLayout.jsx
  AuthLayout.jsx
  AdminLayout.jsx
  MainLayouts.jsx
```

Ý nghĩa:

- `PublicLayout.jsx`: layout cho home, fleet, car detail. Gồm navbar, outlet, footer.
- `PrivateLayout.jsx`: layout cho user đã đăng nhập.
- `AuthLayout.jsx`: layout cho login/register.
- `AdminLayout.jsx`: layout dashboard admin.
- `MainLayouts.jsx`: file alias hoặc layout tổng nếu dự án đang dùng tên này.

Với 3 mockup hiện tại, layout chính là:

```txt
PublicLayout
  LuxeNavbar
  Outlet
  LuxeFooter
```

Header/Footer không nên đặt trực tiếp trong `layouts/`. Chúng là reusable UI shell component, nên để trong:

```txt
components/layout/
  LuxeNavbar/
  LuxeFooter/
```

### `pages/`

Chứa màn hình theo feature/domain.

Nên có:

```txt
pages/
  home/
    HomePage.jsx
    components/
      HeroSearch.jsx
      FeaturedCars.jsx
      RegisterCta.jsx
  vehicles/
    VehicleListPage.jsx
    VehicleDetailPage.jsx
    components/
      VehicleListToolbar.jsx
      VehicleResultSummary.jsx
  bookings/
    BookingPage.jsx
    BookingHistoryPage.jsx
  auth/
    LoginPage.jsx
    RegisterPage.jsx
  profile/
    ProfilePage.jsx
```

Mapping từ mockup:

- `home.html` -> `pages/home/HomePage.jsx`
- `car_rent.html` -> `pages/vehicles/VehicleListPage.jsx`
- `carDtail.html` -> `pages/vehicles/VehicleDetailPage.jsx`

Quy tắc:

- Component chỉ dùng riêng cho một page thì để trong `pages/<domain>/components/`.
- Component dùng lại nhiều page thì đưa lên `components/`.

Ví dụ:

- `HeroSearch` chỉ dùng home -> `pages/home/components/HeroSearch.jsx`
- `CarCard` dùng ở home và vehicle list -> `components/vehicle/CarCard/`
- `BookingCard` dùng ở vehicle detail và có thể booking flow -> `components/vehicle/BookingCard/`

### `routes/`

Chứa router, lazy route, guard, redirect.

Nên có:

```txt
routes/
  AppRoutes.jsx
  routePaths.js
  guards/
    PrivateRoute.jsx
    AdminRoute.jsx
```

Ý nghĩa:

- `AppRoutes.jsx`: khai báo toàn bộ route.
- `routePaths.js`: constant path.
- `PrivateRoute.jsx`: guard user đã đăng nhập.
- `AdminRoute.jsx`: guard admin.

Route nên map như sau:

```txt
/             -> HomePage
/car-rent     -> VehicleListPage
/car-detail   -> VehicleDetailPage
/login        -> LoginPage
/register     -> RegisterPage
/profile      -> ProfilePage
/bookings     -> BookingHistoryPage
```

Với production nên dùng dynamic route:

```txt
/vehicles
/vehicles/:vehicleId
```

Thay cho:

```txt
/car-rent
/car-detail
```

### `stores/`

Chứa client state bằng Zustand hoặc store tương đương.

Nên có:

```txt
stores/
  authStore.js
  vehicleFilterStore.js
  bookingStore.js
  favoriteStore.js
```

Ý nghĩa:

- `authStore.js`: access token, user, role.
- `vehicleFilterStore.js`: keyword, date range, fuel type, seats, price range.
- `bookingStore.js`: booking draft, pickup/dropoff date, total price.
- `favoriteStore.js`: danh sách xe yêu thích.

Không phải state nào cũng đưa vào store.

Nên để local state nếu:

- Active image trong gallery.
- Input tạm trong form.
- Toggle nhỏ trong một component.

Nên đưa vào store nếu:

- Nhiều page cùng dùng.
- Cần giữ state khi chuyển route.
- Là trạng thái nghiệp vụ quan trọng.

### `styles/`

Chứa theme token, global CSS, style wrapper dùng chung.

Nên có:

```txt
styles/
  globals.css
  theme.css
  layout.css
  components.css
  DESIGN_SYSTEM.md
```

Ý nghĩa:

- `globals.css`: reset, body, base class.
- `theme.css`: CSS variables cho màu, spacing, typography.
- `layout.css`: container, grid, shell.
- `components.css`: class dùng chung cho button, badge, input, card.
- `DESIGN_SYSTEM.md`: ghi lại token và rule thiết kế.

Token lấy từ mockup:

- Font: `Inter`.
- Container max: `1280px`.
- Desktop margin: `32px`.
- Mobile margin: `16px`.
- Gutter: `24px`.
- Primary: black.
- Secondary: blue `#0058be`.
- Background: `#f7f9fb`.
- Surface: white/light gray.
- Border radius: `8px`, `12px`, full.

Các class UI có thể chuẩn hóa:

```txt
btn
btn-primary
btn-secondary
btn-outline
badge
input
app-container
headline-xl
headline-lg
headline-md
body-lg
body-md
```

### `types/`

Chứa TypeScript type/interface dùng chung.

Dự án hiện tại đang dùng JSX, nhưng vẫn nên có folder này để chuẩn bị migrate TypeScript.

Nên có:

```txt
types/
  auth.js
  vehicle.js
  booking.js
  api.js
```

Nếu dùng TypeScript sau này:

```txt
types/
  auth.ts
  vehicle.ts
  booking.ts
  api.ts
```

Các type chính:

```txt
Vehicle
VehicleImage
VehicleSpec
Booking
Customer
Review
ApiResponse
RouteConfig
NavigationItem
```

Ví dụ `Vehicle` nên có:

```txt
id
name
brand
model
year
category
pricePerDay
rating
reviewCount
fuelType
transmission
seatCount
images
features
status
```

### `utils/`

Chứa helper thuần logic, không phụ thuộc UI.

Nên có:

```txt
utils/
  date.js
  currency.js
  booking.js
  vehicle.js
  storage.js
```

Ý nghĩa:

- `date.js`: format date, tính số ngày thuê.
- `currency.js`: format VND/USD.
- `booking.js`: calculate subtotal, fees, total.
- `vehicle.js`: map status, normalize specs.
- `storage.js`: đọc/ghi token localStorage an toàn.

Logic từ mockup nên đưa vào utils:

```txt
daysBetween(startDate, endDate)
calculateBookingTotal(pricePerDay, startDate, endDate, fees)
formatCurrency(amount)
getVehicleImageAlt(vehicle)
```

## Cấu Trúc Đề Xuất Cụ Thể Cho LuxeDrive

```txt
src/
  apis/
    client.js
    authApi.js
    vehicleApi.js
    bookingApi.js

  components/
    common/
      Breadcrumbs/
      Badge/
      Button/
      FormField/
      IconButton/
    layout/
      LuxeNavbar/
      LuxeFooter/
    vehicle/
      CarCard/
      FilterPanel/
      SearchFleetForm/
      VehicleGallery/
      VehicleSpecs/
      BookingCard/
      RecommendationCard/

  config/
    api/
      endpoints.js
      index.js
    navigation.js
    routes.js
    vehicleFilters.js
    luxeDriveCatalog.js

  contexts/
    AuthContext.jsx
    ThemeContext.jsx

  hooks/
    useAuth.js
    useVehicles.js
    useVehicleDetail.js
    useBookingPrice.js
    useScrollHeader.js

  layouts/
    PublicLayout.jsx
    AuthLayout.jsx
    PrivateLayout.jsx
    AdminLayout.jsx

  pages/
    home/
      HomePage.jsx
      components/
        HeroSearch.jsx
        FeaturedCars.jsx
        RegisterCta.jsx
    vehicles/
      VehicleListPage.jsx
      VehicleDetailPage.jsx
      components/
        VehicleListToolbar.jsx
        VehicleResultSummary.jsx
    auth/
      LoginPage.jsx
      RegisterPage.jsx
    bookings/
      BookingHistoryPage.jsx
    profile/
      ProfilePage.jsx

  routes/
    AppRoutes.jsx
    routePaths.js
    guards/
      PrivateRoute.jsx
      AdminRoute.jsx

  stores/
    authStore.js
    vehicleFilterStore.js
    bookingStore.js
    favoriteStore.js

  styles/
    globals.css
    theme.css
    DESIGN_SYSTEM.md

  types/
    auth.js
    vehicle.js
    booking.js
    api.js

  utils/
    date.js
    currency.js
    booking.js
    storage.js
```

## Mapping Mockup Sang React

### `home.html`

Nên tách thành:

```txt
pages/home/HomePage.jsx
pages/home/components/HeroSearch.jsx
pages/home/components/FeaturedCars.jsx
pages/home/components/RegisterCta.jsx
components/vehicle/CarCard/
components/layout/LuxeNavbar/
components/layout/LuxeFooter/
```

### `car_rent.html`

Nên tách thành:

```txt
pages/vehicles/VehicleListPage.jsx
pages/vehicles/components/VehicleListToolbar.jsx
pages/vehicles/components/VehicleResultSummary.jsx
components/vehicle/SearchFleetForm/
components/vehicle/FilterPanel/
components/vehicle/CarCard/
components/common/Badge/
```

### `carDtail.html`

Nên tách thành:

```txt
pages/vehicles/VehicleDetailPage.jsx
components/common/Breadcrumbs/
components/vehicle/VehicleGallery/
components/vehicle/VehicleSpecs/
components/vehicle/BookingCard/
components/vehicle/RecommendationCard/
components/vehicle/CarCard/
utils/booking.js
utils/date.js
```

## Quy Tắc Đặt Component

Đặt trong `components/` nếu:

- Dùng lại ở nhiều page.
- Không phụ thuộc route cụ thể.
- Có props rõ ràng.
- Có thể test độc lập.

Đặt trong `pages/<domain>/components/` nếu:

- Chỉ phục vụ một page.
- Gắn chặt với layout của page đó.
- Không có nhu cầu dùng lại.

Ví dụ:

- `CarCard` -> `components/vehicle/CarCard/`
- `HeroSearch` -> `pages/home/components/HeroSearch.jsx`
- `BookingCard` -> `components/vehicle/BookingCard/`
- `VehicleListToolbar` -> `pages/vehicles/components/VehicleListToolbar.jsx`

## Kết Luận

Structure này phù hợp với:

- React SPA.
- Booking system.
- Car rental frontend.
- SaaS/dashboard nhỏ và vừa.
- Startup production frontend.

Tên architecture phù hợp nhất:

```txt
Hybrid Layer-based + Component-driven React Architecture
```

Hoặc ngắn hơn:

```txt
Scalable Layered React SPA Architecture
```
