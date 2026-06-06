# Frontend Style Architecture

Tai lieu nay dung de thong nhat cach to chuc CSS/style cho frontend LuxeDrive khi project lon dan. Muc tieu la giu `globals.css` gon, tach style theo dung ownership, va tranh viec component/page phu thuoc lan nhau qua class global.

## 1. Nguyen Tac Nen Theo

- `theme.css` chi chua design token.
- `globals.css` chi chua reset, base style, va utility that su dung chung toan app.
- Component reusable nen co style gan voi component do.
- Page nen co style rieng cho layout cua page do.
- Config, mapping, formatter, business logic khong de trong CSS.
- Neu mot class chi phuc vu mot component/page, khong nen de lau trong `globals.css`.

## 2. Vai Tro Tung Nhom File

### `styles/theme.css`

Dung cho token thiet ke:

```css
:root {
  --color-primary: #000000;
  --color-secondary: #0058be;
  --color-background: #f7f9fb;
  --color-surface-lowest: #ffffff;
  --color-border: #c6c6cd;

  --font-main: "Inter", sans-serif;

  --container-max: 1280px;
  --gutter: 24px;
  --margin-desktop: 32px;
  --margin-mobile: 16px;

  --radius-md: 8px;
  --radius-xl: 16px;
}
```

Khong nen de style component trong `theme.css`.

Khong nen:

```css
.car-card {
  ...
}
```

Ly do: `theme.css` la noi dinh nghia he thong thiet ke, khong phai noi khai bao UI cu the.

### `styles/globals.css`

Chi nen giu nhung thu that su global:

```css
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--font-main);
  background: var(--color-background);
  color: var(--color-text-primary);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}
```

Co the giu utility layout dung chung:

```css
.app-container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding-inline: var(--margin-desktop);
}
```

Nhung khong nen de qua nhieu class rieng cua page/component trong `globals.css` khi project lon:

```css
.car-card {}
.booking-card {}
.login-page {}
.vehicle-gallery {}
```

Cac class nay nen duoc tach ve component/page tuong ung.

## 3. Component Style

Component reusable nen tu quan style cua no.

Vi du voi input:

```txt
src/components/Inputs/
  Input.jsx
  Input.module.css
  InputField.jsx
  InputWithIcon.jsx
```

`Input.module.css`:

```css
.input {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  background: var(--color-surface-low);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.input:focus {
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 2px rgba(0, 88, 190, 0.16);
}
```

`Input.jsx`:

```jsx
import styles from "./Input.module.css";

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={[styles.input, className].join(" ")}
      {...props}
    />
  );
}
```

Loi ich:

- Class khong bi trung ten voi page/component khac.
- Xoa component thi biet CSS nao can xoa.
- Team lam song song it anh huong nhau hon.
- Component de test va reuse hon.

## 4. Page Style

Style chi phuc vu mot page nen de canh page.

Vi du login:

```txt
src/pages/authCustomers/
  LoginPage.jsx
  LoginPage.module.css
```

`LoginPage.module.css`:

```css
.page {
  min-height: calc(100vh - 64px);
  display: grid;
  place-items: center;
  padding: 96px 16px;
}

.form {
  width: min(100%, 420px);
  padding: 32px;
  background: var(--color-surface-lowest);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.title {
  margin: 0 0 24px;
}
```

`LoginPage.jsx`:

```jsx
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <section className={styles.page}>
      <form className={styles.form}>
        <h1 className={styles.title}>Login</h1>
      </form>
    </section>
  );
}
```

Quy tac:

- Layout rieng cua login nam o `LoginPage.module.css`.
- Input/Button van dung component reusable.
- Khong day `.login-page`, `.login-page__form` vao `globals.css` neu chi login dung.

## 5. Layout Style

Layout dung chung nhu AppBar/Footer/PublicLayout co the de trong component layout.

De xuat:

```txt
src/components/Layout/
  AppBar/
    index.jsx
    AppBar.module.css
  Footer/
    index.jsx
    Footer.module.css

src/layouts/
  publicLayout.jsx
```

`publicLayout.jsx` chi nen compose:

```txt
AppBar + Outlet + Footer
```

Khong nen nhung logic/page content vao layout.

## 6. Config Va Utils Khong Thuoc CSS

Nhung thu sau khong nen de trong `globals.css`:

- `statusLabel`
- `statusClass`
- `formatCurrency`
- route path
- menu navigation
- filter options

Nen tach:

```txt
src/config/
  carStatus.js
  navigation.js
  routes.js

src/utils/
  currency.js
  date.js
```

Vi du `config/carStatus.js`:

```js
export const carStatusLabel = {
  available: "Available",
  rented: "Rented",
  maintenance: "Maintenance",
};

export const carStatusClass = {
  available: "badge-success",
  rented: "badge-warning",
  maintenance: "badge-error",
};
```

Vi du `utils/currency.js`:

```js
export function formatCurrency(value, currency = "VND", locale = "vi-VN") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
```

CSS chi nen giu class thuc su:

```css
.badge-success {}
.badge-warning {}
.badge-error {}
```

JS se quyet dinh status nao dung class nao.

## 7. Ap Dung Cho Project Hien Tai

Project hien tai dang boc mockup HTML sang React, nen viec `globals.css` dang co nhieu class la chap nhan duoc trong giai doan dau.

Nhung nen tach dan theo thu tu sau.

### Buoc 1: Giu `theme.css` nhu token source

Giu cac bien:

- color
- typography
- spacing
- radius
- shadow
- container

Khong them component class vao `theme.css`.

### Buoc 2: Lam gon `globals.css`

Giu lai:

- reset
- body/html/base element
- `.app-container`
- typography utility neu dung toan app
- mot vai utility rat chung

Nen chuan bi tach dan:

- `.car-card`
- `.booking-card`
- `.input-with-icon`
- `.login-page`
- `.vehicle-gallery`
- `.luxe-footer`
- `.luxe-navbar`

### Buoc 3: Tach component co kha nang reuse

Nen tach som:

```txt
components/Buttom -> components/common/Button
components/Inputs -> components/common/Input
components/CardCar -> components/vehicle/CardCar
components/Layout/AppBar
components/Layout/Footer
```

Moi component nen co:

```txt
index.jsx
ComponentName.module.css
```

### Buoc 4: Tach page style

Voi car list:

```txt
pages/Car/
  index.jsx
  CarListPage.module.css
```

Voi login:

```txt
pages/authCustomers/
  LoginPage.jsx
  LoginPage.module.css
```

Voi booking:

```txt
pages/Booking/
  index.jsx
  BookingPage.module.css
```

## 8. Khi Nao Dung Global, Khi Nao Dung Module

Dung `globals.css` khi:

- selector ap dung toan app
- reset browser
- base element
- utility dung o rat nhieu noi
- class khong thuoc rieng mot component/page

Dung CSS Module khi:

- class chi phuc vu mot component
- class chi phuc vu mot page
- UI co nhieu state rieng
- component co kha nang reuse
- can tranh trung ten class

Dung `theme.css` khi:

- khai bao token
- khai bao dark theme token
- khai bao scale chung cua design system

## 9. Quy Tac Ngan Gon

```txt
theme.css = token
globals.css = reset + base + utility chung
component.module.css = style cua component
page.module.css = layout cua page
config = mapping/data config
utils = logic helper
```

## 10. Ket Luan

Voi project nho, de nhieu class trong `globals.css` giup lam nhanh.

Voi project lon, `globals.css` qua lon se gay kho maintain:

- kho biet class nao con dung
- de trung ten
- sua mot noi anh huong nhieu page
- component kho reuse
- team de conflict CSS

Huong tot nhat cho LuxeDrive la di tung buoc:

```txt
Khong can refactor het ngay.
Component nao bat dau on dinh thi tach CSS module.
Page nao co layout rieng thi tach page module.
Logic va formatter dua ve config/utils.
```

## 11. Chuc Nang Cua Cac Folder Trong `src`

Day la vai tro de xuat cho tung folder trong `Frontend/src`. Muc tieu la moi folder co mot trach nhiem ro rang, tranh de logic, UI, API va style bi tron vao nhau.

### `main.jsx`

Entry point cua React app.

Trach nhiem:

- Tao React root bang `createRoot`.
- Boc app bang provider cap cao nhu `BrowserRouter`, `StrictMode`, `ThemeProvider`, `AuthProvider` neu co.
- Import CSS global mot lan, vi du `globals.css`.

Khong nen:

- Khai bao route chi tiet.
- Viet UI page.
- Goi API truc tiep.

### `App.jsx`

Root component cua app.

Trach nhiem:

- Gan router chinh hoac goi `AppRoutes`.
- Boc cac provider cap app neu khong de o `main.jsx`.
- Giu vai tro dieu phoi tong, khong nen chua nhieu UI chi tiet.

Voi project hien tai, co the de route trong `App.jsx` khi con it route. Khi route nhieu hon, nen tach sang folder `routes/` hoac `router/`.

### `apis/`

Chua cac ham giao tiep voi backend.

Trach nhiem:

- Cau hinh HTTP client.
- Gom cac API theo domain.
- Khong chua UI.
- Khong chua state React.

De xuat:

```txt
apis/
  client.js
  authApi.js
  carApi.js
  bookingApi.js
  customerApi.js
```

Vi du:

```js
export function getCars(params) {
  return client.get("/cars", { params });
}
```

### `assets/`

Chua static assets cua frontend.

Trach nhiem:

- Anh local.
- Logo.
- Icon custom.
- Font local neu co.
- File media dung trong UI.

De xuat:

```txt
assets/
  images/
  icons/
  logos/
```

Khong nen de file code logic trong `assets/`.

### `components/`

Chua reusable UI components.

Trach nhiem:

- Component dung lai o nhieu page.
- Component khong phu thuoc route cu the.
- Nhan du lieu qua props.
- Khong tu goi API neu khong that su can.

De xuat chia nho:

```txt
components/
  common/
    Button/
    Input/
    Badge/
    Modal/
  Layout/
    AppBar/
    Footer/
  vehicle/
    CardCar/
    VehicleGallery/
    BookingCard/
```

Vi du:

- `Button`: nut dung chung.
- `Input`: input dung chung.
- `CardCar`: card hien thi mot xe.
- `AppBar`: thanh dieu huong.
- `Footer`: footer dung chung.

Khong nen:

- Dat page vao `components/`.
- De logic routing vao component UI.
- De mock data lon trong component reusable.

### `config/`

Chua config tinh cua app.

Trach nhiem:

- Route path.
- Navigation items.
- Status mapping.
- Filter options.
- App constants.

De xuat:

```txt
config/
  routes.js
  navigation.js
  carStatus.js
  vehicleFilters.js
```

Vi du:

```js
export const publicNavigation = [
  { label: "Browse Cars", path: "/" },
  { label: "Deals", path: "/deals" },
  { label: "About", path: "/about" },
];
```

Khong nen:

- Goi API trong `config`.
- De React component trong `config`.

### `contexts/`

Chua React Context providers.

Trach nhiem:

- Quan ly state cap app can chia se qua nhieu page/component.
- Vi du auth, theme, locale.

De xuat:

```txt
contexts/
  AuthContext.jsx
  ThemeContext.jsx
  LocaleContext.jsx
```

Chi nen dung context cho state that su can global. Khong nen dua moi local state vao context.

### `hooks/`

Chua custom hooks.

Trach nhiem:

- Dong goi logic React co the dung lai.
- Goi API thong qua `apis/`.
- Xu ly state, effect, debounce, computed data.

De xuat:

```txt
hooks/
  useCars.js
  useCarDetail.js
  useBookingPrice.js
  useDebounce.js
  useAuth.js
```

Vi du:

```js
export function useCars(filters) {
  // fetch cars, loading, error
}
```

Khong nen:

- Render JSX phuc tap trong hook.
- Viet style trong hook.

### `layouts/`

Chua page shell/layout.

Trach nhiem:

- Compose cac vung lon cua app.
- Vi du `AppBar + Outlet + Footer`.
- Tach public/private/admin layout.

De xuat:

```txt
layouts/
  publicLayout.jsx
  privateLayout.jsx
  adminLayout.jsx
```

`publicLayout.jsx` nen lam:

```txt
AppBar
main Outlet
Footer
```

Khong nen:

- Viet body cua page trong layout.
- Goi API cua page trong layout.
- Nhet `CardCar`, `LoginForm`, `BookingForm` truc tiep vao layout.

Luu y: Neu dang de `publicLayout.jsx` trong `components/Layout/`, nen can nhac dua ve `src/layouts/` de dung vai tro layer.

### `pages/`

Chua cac page theo route.

Trach nhiem:

- Moi file/folder page tuong ung voi mot man hinh route.
- Lay data thong qua hook/API.
- Compose cac component thanh page hoan chinh.
- Chua layout rieng cua page neu can.

De xuat theo domain:

```txt
pages/
  Car/
    index.jsx      // car list
    _id.jsx        // car detail
  Booking/
    index.jsx
    _id.jsx
  authCustomers/
    LoginPage.jsx
    RegisterPage.jsx
```

Quy tac:

- Component chi dung trong mot page co the de trong `pages/<domain>/components/`.
- Component dung nhieu page thi dua len `components/`.

Vi du:

- `CardCar` dung nhieu noi -> `components/vehicle/CardCar`.
- `CarListToolbar` chi dung Car list -> `pages/Car/components/CarListToolbar.jsx`.

### `redux/`

Chua global state neu project dung Redux.

Trach nhiem:

- Store Redux.
- Slice theo domain.
- Async thunk/query neu dung Redux Toolkit.

De xuat:

```txt
redux/
  store.js
  slices/
    authSlice.js
    carFilterSlice.js
    bookingSlice.js
```

Khong nen dua tat ca state vao Redux.

Nen de local state neu:

- Toggle modal rieng mot component.
- Active tab rieng mot page.
- Input form tam thoi.

Nen dua vao Redux/context neu:

- Nhieu page can dung chung.
- Can giu state khi doi route.
- La state nghiep vu quan trong nhu auth user, booking draft.

### `styles/`

Chua CSS global va design token.

Trach nhiem:

- `theme.css`: token.
- `globals.css`: reset, base, utility chung.
- Tai lieu design system neu can.

De xuat:

```txt
styles/
  theme.css
  globals.css
  typography.css
  layout.css
```

Khong nen de tat ca component/page CSS vao day khi project lon. Nen tach dan sang CSS Module canh component/page.

### `types/`

Chua type/model dung chung.

Du an hien tai dang dung JSX, nhung van co the dung folder nay de chuan bi migrate TypeScript hoac ghi JSDoc type.

De xuat:

```txt
types/
  car.js
  booking.js
  customer.js
  api.js
```

Neu sau nay dung TypeScript:

```txt
types/
  car.ts
  booking.ts
  customer.ts
  api.ts
```

Vi du model nen co:

```txt
Car
Booking
Customer
ApiResponse
Pagination
```

### `utils/`

Chua helper thuan logic.

Trach nhiem:

- Format currency.
- Format date.
- Tinh ngay thue.
- Normalize data.
- Local storage helper.

De xuat:

```txt
utils/
  currency.js
  date.js
  booking.js
  storage.js
```

Vi du:

```js
formatCurrency(1500000)
daysBetween(startDate, endDate)
calculateBookingTotal(pricePerDay, days)
```

Khong nen:

- Render JSX trong utils.
- Dung React hook trong utils.
- Goi API trong utils.

## 12. Flow Chuan Tu App Xuong Component

Flow nen ro nhu sau:

```txt
main.jsx
  -> App.jsx
    -> Routes
      -> PublicLayout
        -> AppBar
        -> Outlet
          -> Page
            -> Components
        -> Footer
```

Vi du voi trang danh sach xe:

```txt
main.jsx
  -> App.jsx
    -> route "/"
      -> publicLayout.jsx
        -> pages/Car/index.jsx
          -> components/CardCar/index.jsx
```

Vai tro tung tang:

- `App.jsx`: route tree hoac goi router.
- `publicLayout.jsx`: khung public page.
- `pages/Car/index.jsx`: body cua trang danh sach xe.
- `components/CardCar/index.jsx`: card hien thi mot xe.
- `utils/currency.js`: format tien.
- `config/carStatus.js`: mapping status.

## 13. Quy Tac Dat File Theo Ownership

Khi khong biet dat file o dau, hoi 3 cau:

1. File nay co phai mot man hinh route khong?
   - Co -> `pages/`

2. File nay co phai component dung lai khong?
   - Co -> `components/`

3. File nay co phai logic/helper khong lien quan UI khong?
   - Co -> `utils/`

4. File nay co phai config tinh khong?
   - Co -> `config/`

5. File nay co phai style cua rieng mot component/page khong?
   - Co -> de canh component/page bang CSS Module.

6. File nay co phai style global/token khong?
   - Co -> `styles/`
