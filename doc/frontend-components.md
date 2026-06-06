# Frontend Components

Tai lieu nay mo ta folder `Frontend/src/components`: moi component dung de lam gi, props chinh, dang duoc dung o dau, va cac diem can chu y khi tai su dung/refactor.

## 1. Tong Quan Cau Truc

```txt
Frontend/src/components
|-- Badge/
|-- Banner/
|-- Button/
|-- Car/
|-- Form/
|-- InfoBox/
|-- Inputs/
`-- Layout/
```

Vai tro tong quat:

- `Button`, `Badge`, `Inputs`, `Form`, `InfoBox`: component UI co the tai su dung.
- `Car`: component gan voi domain xe va booking xe.
- `Layout`: khung giao dien public/admin nhu AppBar, Footer, Sidebar.
- `Banner`: hero/banner cho trang danh sach xe.

## 2. Common Components

### `Button/index.jsx`

Component nut dung chung.

Props:

```js
{
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}
```

Variants hien co:

| Variant | Muc dich | Token dang dung |
| --- | --- | --- |
| `primary` | Nut chinh public | `--color-primary`, `--color-on-primary` |
| `secondary` | Nut xanh public | `--color-secondary`, `--color-on-secondary` |
| `admin` | Nut chinh admin | `--color-admin-primary`, `--color-on-admin-primary` |
| `ghost` | Nut phu, nen trong | `--color-text-secondary`, `--color-secondary` |
| `danger` | Nut nguy hiem/logout | `--color-error`, `--color-error-bg` |
| `outline` | Nut vien | `--color-primary` |

Vi du:

```jsx
<Button variant="admin" fullWidth>
  Add New Vehicle
</Button>
```

Dang duoc dung o:

```txt
components/Layout/AppBar
components/Layout/Footer
components/Layout/Sibar
components/Car/index.jsx
components/Car/BookingWidget.jsx
pages/authCustomers/LoginPage.jsx
pages/authCustomers/RegisterPage.jsx
pages/authAccountSystem/LoginPageSystem.jsx
```

Diem can chu y:

- `AppBar` dang truyen `size="compact"` nhung `Button` chua xu ly prop `size`; prop nay se bi day xuong DOM button. Neu can size compact, nen them prop `size` vao `Button`.
- `Button` da dung theme token va Tailwind canonical class.

### `Badge/index.jsx`

Component hien thi status label nho.

Props:

```js
{
  children,
  variant = "success",
  className = ""
}
```

Variants hien co:

```js
success
warning
error
```

Dang duoc dung o:

```txt
components/Car/index.jsx
components/Car/DetailGallery.jsx
```

Diem can chu y:

- `Badge` hien con hardcode mau Tailwind `emerald`, `orange`, `red`.
- Nen doi sang token trong `theme.css`, vi project da co `--color-success`, `--color-warning`, `--color-error` va cac mau nen tuong ung.

### `InfoBox/index.jsx`

Component khung thong tin gom title, icon va content.

Props:

```js
{
  title,
  icon,
  children,
  className = ""
}
```

Dang duoc dung o:

```txt
components/Car/DetailInfo.jsx
components/Car/BookingWidget.jsx
pages/authAccountSystem/LoginPageSystem.jsx
```

Diem can chu y:

- Component co the tai su dung tot cho cac block thong tin.
- Hien con hardcode `border-gray-200`, `bg-white`.
- Nen doi thanh `border-(--color-border)` va `bg-(--color-surface-lowest)`.

## 3. Input Components

### `Inputs/index.jsx`

Input base dung chung.

Props:

```js
{
  className = "",
  ...props
}
```

Vi du:

```jsx
<Input
  type="email"
  placeholder="Email Address"
/>
```

Dang duoc dung o:

```txt
components/Inputs/InputWithIcon.jsx
components/Inputs/DateTimeField.jsx
components/Car/BookingWidget.jsx
components/Layout/Footer/index.jsx
```

Diem can chu y:

- File dang hardcode mau: `#c6c6cd`, `#f2f4f6`, `#191c1e`, `#0058be`.
- Nen doi sang token:

```txt
--color-border
--color-surface-low
--color-text-primary
--color-secondary
```

### `Inputs/InputField.jsx`

Component boc label va field.

Props:

```js
{
  label,
  children
}
```

Dang dung class global:

```txt
field-control
field-control__label
```

Diem can chu y:

- Neu class nay khong nam trong `globals.css` hoac da bi xoa, label/input se mat style.
- Nen chuyen sang Tailwind token truc tiep hoac CSS Module rieng cho input field.

### `Inputs/InputWithIcon.jsx`

Input co icon ben trai.

Props:

```js
{
  icon,
  className = "",
  ...props
}
```

Vi du:

```jsx
<InputWithIcon
  icon="email"
  name="email"
  placeholder="Enter your email"
/>
```

Diem can chu y:

- Icon dang hardcode `text-[#7a7d85]`.
- Nen doi sang `text-(--color-text-muted)`.

### `Inputs/DateTimeField.jsx`

Field datetime-local co label va icon calendar.

Props:

```js
{
  label,
  value,
  onChange,
  min,
  max,
  required = false
}
```

Dang duoc dung o:

```txt
components/Car/BookingWidget.jsx
```

Diem can chu y:

- Component nay da dung theme token cho label va icon.
- `onChange?.(event.target.value)` giup component khong loi neu thieu callback.

## 4. Form Components

### `Form/FormCard.jsx`

Card boc form, co title/subtitle tuy chon.

Props:

```js
{
  title,
  subtitle,
  children,
  className = "",
  ...props
}
```

Dang duoc dung o:

```txt
pages/authCustomers/LoginPage.jsx
pages/authCustomers/RegisterPage.jsx
```

Diem can chu y:

- Hien con hardcode `bg-white`, `text-[#76777d]`.
- Nen doi sang `bg-(--color-surface-lowest)` va `text-(--color-text-muted)`.

### `Form/FormActions.jsx`

Vung chua nut action cuoi form.

Props:

```js
{
  children,
  className = "",
  ...props
}
```

Style hien tai:

```txt
flex items-center justify-end gap-4 border-t border-black/10 pt-6
```

Diem can chu y:

- Nen doi `border-black/10` sang `border-(--color-border)`.

### `Form/FormRow.jsx`

Grid 2 cot responsive cho form.

Props:

```js
{
  children,
  className = "",
  ...props
}
```

Style:

```txt
grid gap-6 md:grid-cols-2
```

Component nay kha on de tai su dung.

### `Form/FormSection.jsx`

Section trong form co title va content.

Props:

```js
{
  title,
  children,
  className = "",
  ...props
}
```

Diem can chu y:

- Hien dung `border-black/10`.
- Nen doi sang theme token.

## 5. Car Components

### `Car/index.jsx` hay `CardCar`

Card hien thi mot xe trong list.

Props:

```js
{
  car
}
```

Du lieu `car` dang dung:

```txt
id
thumbnail
title
status
brand
model
year
transmission
seat_count
fuel_type
location
description
price_per_day
```

Dependency:

```txt
Button
Badge
config/carStatus
utils/currency
```

Dang duoc dung o:

```txt
pages/Car/index.jsx
```

Diem can chu y:

- Component tra `null` neu khong co `car`, tot cho render an toan.
- `Button size="compact"` dang truyen prop `size` nhung `Button` chua xu ly.
- Hien `Book Now` nam trong card, page boc card bang `Link`, nen button co the nam trong link. Neu can action rieng, nen truyen `onBook` hoac de ca card la link va bo button.

### `Car/DetailGallery.jsx`

Gallery anh xe, co anh chinh va thumbnail.

Props:

```js
{
  car
}
```

Luon co fallback image neu xe khong co images/thumbnail.

Dependency:

```txt
Badge
config/carStatus
React useMemo/useState/useEffect
```

Diem can chu y:

- Lint hien bao loi `react-hooks/set-state-in-effect` vi `setActiveImage(images[0])` trong `useEffect`.
- Co the can refactor de active image duoc tinh tu state + images ma khong set state sync trong effect.

### `Car/DetailInfo.jsx`

Hien thong tin chi tiet xe, thong tin owner, thong so ky thuat.

Props:

```js
{
  car
}
```

Du lieu `car` dang dung:

```txt
title
brand
model
year
transmission
fuel_type
seat_count
odometer
location
description
owner_name
owner_phone
```

Dependency:

```txt
InfoBox
```

Diem can chu y:

- `specs` dang nam trong file component. Neu specs nay dung lai o admin/detail khac, co the dua sang `config/carSpecs.js`.
- Mot so text trong owner info dung `text-gray-700`, nen doi sang token.

### `Car/BookingWidget.jsx`

Widget tao booking tren trang chi tiet xe.

Props:

```js
{
  car,
  onSubmit
}
```

State noi bo:

```txt
checkIn
checkOut
returnLocation
```

Dependency:

```txt
Button
Input
InputField
DateTimeField
InfoBox
useSelector
useCarAvailability
utils/currency
utils/date
utils/price
```

Payload submit:

```js
{
  listing_id: car.id,
  start_date: formatBookingDate(checkIn),
  end_date: formatBookingDate(checkOut),
  pickup_location: car.location,
  return_location: returnLocation,
  total_price: priceSummary.total
}
```

Diem can chu y:

- Component doc `state.auth.user` truc tiep bang Redux, nen no khong con la UI thuan props.
- Dang import `useCarAvailability` tu `~/store/slices/useCarAvailability`, trong khi hook dung hon nen nam o `~/hooks/Car/useCarAvailability`.
- Trang detail dang truyen `loading={bookingLoading}` vao `BookingWidget`, nhung component chua nhan/use prop `loading`.
- Status "Available" dang hien co dinh, chua dua vao `isAvailable`.

## 6. Layout Components

### `Layout/AppBar/index.jsx`

Thanh navigation public.

State noi bo:

```txt
open
```

Redux:

```txt
state.auth.user
state.auth.isAuthenticated
dispatch(logout())
```

Route/navigation:

```txt
/
/deals
/about
/login
/register
/profile
/bookings
```

Diem can chu y:

- `navLinkClass` dang khai bao trong component. Neu nav public dung lai, co the dua menu items sang `config/navigation.js`.
- Dropdown profile dung button hardcode thay vi component menu rieng.
- `Button size="compact"` chua duoc `Button` xu ly.

### `Layout/Footer/index.jsx`

Footer public gom brand, link columns va newsletter.

Dependency:

```txt
Link
Button
Input
```

Diem can chu y:

- Con hardcode mau hex: `#c6c6cd`, `#d8dadc`, `#45464d`, `#191c1e`.
- Nen doi sang theme token.
- Link data dang khai bao inline trong JSX, neu footer link tang nhieu nen dua sang config.
- Text copyright hien bi loi encoding: `Â© 2024...`; nen sua thanh `©` neu file dung UTF-8, hoac `&copy;` trong JSX.

### `Layout/Sibar/index.jsx`

Admin sidebar.

Dependency:

```txt
NavLink
useNavigate
useDispatch
Button
logout action
```

Menu items:

```txt
/dashboard
/dashboard/cars
/dashboard/bookings
/dashboard/users
/dashboard/settings
```

Theme token dang dung:

```txt
--color-admin-primary
--color-admin-primary-bg
--color-on-admin-primary
--color-text-secondary
--color-border
--color-surface-lowest
```

Diem can chu y:

- Folder dang dat ten `Sibar`, nen doi thanh `Sidebar` de dung chinh ta.
- `menuItems` co the dua sang `config/navigation.js`.
- Nut `Add New Vehicle` dieu huong `/dashboard/cars/new`; can dam bao route nay ton tai.

### `Layout/privateLayout.jsx`

Layout admin/private hien gom sidebar va outlet.

Dang lam:

```txt
AdminSidebar + Outlet
```

Diem can chu y:

- `AdminSidebar` da la `fixed`, nhung `PrivateLayout` lai boc them `<aside className="w-64...">`. Viec nay co the tao layout thua/lech.
- `privateLayout.jsx` nen dung theme token thay vi `bg-white`, `bg-gray-100`.

### `Layout/publicLayout.jsx`

Layout public gom:

```txt
AppBar
Outlet
Footer
```

Diem can chu y:

- Dang dung class `public-layout` va `main-content`; can kiem tra cac class nay co trong global CSS khong.
- Theo kien truc da ghi trong `frontend-style-architecture.md`, layout co the chuyen ve `src/layouts/` khi project lon hon.

## 7. Banner Component

### `Banner/index.jsx`

Hero banner trang car list.

Dang duoc dung o:

```txt
pages/Car/index.jsx
```

Diem can chu y:

- Anh dang dung path `src/public/Images/banner-1.png`. Voi Vite, asset public nen tham chieu qua `/Images/banner-1.png` neu file nam trong `public`, hoac import tu `src/assets` neu nam trong source.
- `h-105` khong phai spacing mac dinh Tailwind pho bien. Neu build van pass thi project/Tailwind co the chap nhan arbitrary/custom, nhung nen can nhac `h-[420px]` de ro rang.

## 8. Component Dang Duoc Dung Theo Page

### Car list page

```txt
pages/Car/index.jsx
-> Banner
-> CardCar
  -> Badge
  -> Button
```

### Car detail page

```txt
pages/Car/_id.jsx
-> DetailGallery
  -> Badge
-> DetailInfo
  -> InfoBox
-> BookingWidget
  -> DateTimeField
  -> InputField
  -> Input
  -> InfoBox
  -> Button
```

### Customer auth pages

```txt
LoginPage/RegisterPage
-> FormCard
-> InputField
-> InputWithIcon
-> Button
-> FormActions
```

### Public layout

```txt
publicLayout
-> AppBar
  -> Button
-> Outlet
-> Footer
  -> Input
  -> Button
```

### Admin layout

```txt
privateLayout
-> AdminSidebar
  -> Button
-> Outlet
```

## 9. Checklist Refactor Nen Lam Tiep

1. Doi `Sibar` thanh `Sidebar`.
2. Them prop `size` cho `Button` vi nhieu noi dang dung `size="compact"`.
3. Doi `Input`, `Badge`, `InfoBox`, `Footer`, `Form` sang dung theme token thay vi hardcode hex/Tailwind mau.
4. Chuyen `useCarAvailability` ra dung folder `hooks/Car` va sua import trong `BookingWidget`.
5. Dua navigation items sang `config/navigation.js`.
6. Sua `DetailGallery` de het lint `set-state-in-effect`.
7. Kiem tra lai `PrivateLayout` vi sidebar fixed nhung layout van boc them aside.
8. Sua asset path trong `Banner`.

## 10. Nguyen Tac Khi Tao Component Moi

- Component reusable dat trong `components/`.
- Component chi dung cho mot page thi dat trong `pages/<domain>/components/`.
- Component UI nen nhan data qua props, han che goi API truc tiep.
- Style nen dung theme token trong `theme.css`.
- Neu style phuc tap va chi thuoc component do, tao `ComponentName.module.css`.
- Config tinh nhu menu, status, option nen de trong `config/`.
- Logic format/tinh toan nen de trong `utils/`.
