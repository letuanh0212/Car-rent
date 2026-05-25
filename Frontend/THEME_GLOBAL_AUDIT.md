# Frontend Theme & Global CSS Audit

Ngay kiem tra: 2026-05-25

## Ket luan nhanh

Frontend da co global CSS va theme token trung tam:

- `src/styles/globals.css` import Tailwind va `theme.css`.
- `src/styles/theme.css` khai bao CSS variables cho mau sac, typography, layout, radius, shadow.
- `src/main.jsx` da import `globals.css`, nen global style dang duoc apply cho toan app.

Tuy nhien code chua dong bo hoan toan:

- `src/main.jsx` import `theme.css` lan nua trong khi `globals.css` da import roi.
- Nhieu component/page da dung token theme, nhung van con hard-code mau bang `#...`, `text-red-*`, `text-gray-*`, `bg-white`, `bg-black`.
- Dark theme da co token `:root[data-theme="dark"]`, nhung chua thay logic toggle/set `data-theme`.

## Global CSS

### Dang co

File: `src/styles/globals.css`

- Import Tailwind: `@import "tailwindcss";`
- Import theme token: `@import "./theme.css";`
- Reset co ban: `box-sizing`, `scroll-behavior`, body margin, font, background, text color.
- Body dung:
  - `font-family: var(--font-main)`
  - `background: var(--color-background)`
  - `color: var(--color-text-primary)`

### Diem can chinh

File: `src/main.jsx`

```js
import "./styles/globals.css";
import "~/styles/theme.css";
```

`theme.css` dang bi import duplicate. Nen giu `globals.css` la entry duy nhat cho global style, vi `globals.css` da import `theme.css`.

## Theme Token

File: `src/styles/theme.css`

Nhom token dang co:

- Brand: `--color-primary`, `--color-secondary`, `--color-on-primary`, `--color-on-secondary`
- Admin: `--color-admin-primary`, `--color-admin-primary-bg`, ...
- Background/surface: `--color-background`, `--color-surface`, `--color-surface-lowest`, ...
- Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
- Border: `--color-border`, `--color-border-strong`
- Semantic: success, warning, error
- Font, typography, layout, radius, shadow
- Dark mode tokens under `:root[data-theme="dark"]`

## Folder Audit

### `src/components`

#### Da dung theme token tot

- `components/Button/index.jsx`
- `components/InfoBox/index.jsx`
- `components/Car/index.jsx`
- `components/Car/DetailGallery.jsx`
- `components/Car/DetailInfo.jsx` mostly
- `components/Car/BookingWidget.jsx` mostly
- `components/Inputs/DateTimeField.jsx`
- `components/Layout/AppBar/index.jsx`
- `components/Layout/Sibar/index.jsx`

#### Con hard-code mau / chua dong bo theme

- `components/Inputs/index.jsx`
  - Dang dung `border-[#c6c6cd]`, `bg-[#f2f4f6]`, `text-[#191c1e]`, `focus:border-[#0058be]`.
  - Nen doi sang `--color-border`, `--color-surface-low`, `--color-text-primary`, `--color-secondary`.

- `components/Inputs/InputWithIcon.jsx`
  - Dang dung `text-[#7a7d85]`.
  - Nen doi sang `text-(--color-text-muted)`.

- `components/Layout/Footer/index.jsx`
  - Dang dung nhieu mau hard-code: `#c6c6cd`, `#d8dadc`, `#45464d`, `#191c1e`, `text-black`.
  - Nen doi sang border/surface/text token.

- `components/Form/FormCard.jsx`
  - Dang dung `bg-white`, `text-[#76777d]`.
  - Nen doi sang `bg-(--color-surface-lowest)` va `text-(--color-text-muted)`.

- `components/Form/FormActions.jsx`
  - Dang dung `border-black/10`.
  - Nen doi sang `border-(--color-border)`.

- `components/Form/FormSection.jsx`
  - Dang dung `border-black/10`.
  - Nen doi sang `border-(--color-border)`.

- `components/Badge/index.jsx`
  - Dang dung Tailwind color literal: `bg-orange-100`, `text-orange-700`, `bg-red-100`, `text-red-700`.
  - Nen map sang semantic token: warning/error/success.

- `components/Banner/index.jsx`
  - Dang dung `bg-black/45`, `text-white`.
  - Day co the chap nhan vi la overlay hero image, nhung neu muon theme hoa thi nen dung `--color-primary` / `--color-on-primary`.

- `components/Layout/privateLayout.jsx`
  - Dang dung `bg-white`, `bg-gray-100`.
  - Nen doi sang `--color-surface-lowest` va `--color-surface`.

- `components/Car/BookingWidget.jsx`
  - Con `text-gray-700`, `text-red-600`.
  - Nen doi sang `--color-text-secondary` va `--color-error`.

- `components/Car/DetailInfo.jsx`
  - Con `text-gray-700`.
  - Nen doi sang `--color-text-secondary`.

#### Khong can theme truc tiep / wrapper only

- `components/Form/FormRow.jsx`
- `components/Inputs/InputField.jsx`
- `components/Layout/publicLayout.jsx`
- `components/Table/index.js` neu file nay chi export placeholder/logic.

### `src/pages`

#### Da dung theme token tot

- `pages/Booking/index.jsx`
  - Dung CSS variables bang cu phap `bg-[var(--color-...)]`, `text-[var(--color-...)]`, `shadow-[var(--shadow-...)]`.

- `pages/authCustomers/Profile.jsx`
- `pages/authAccountSystem/LoginPageSystem.jsx`
- `pages/Car/index.jsx`
- `pages/Car/_id.jsx`
- `pages/DashBoard/index.jsx`

#### Con hard-code mau / chua dong bo theme

- `pages/authCustomers/LoginPage.jsx`
  - Dang dung `bg-[#f5f5f7]`, `text-red-500`.
  - Nen doi sang `bg-(--color-background)` va `text-(--color-error)`.

- `pages/authCustomers/RegisterPage.jsx`
  - Dang dung `bg-[#f5f5f7]`.
  - Nen doi sang `bg-(--color-background)`.

#### Can doc them neu tiep tuc chuan hoa

- `pages/Booking/_id.jsx`
- `pages/DashBoard/Booking.jsx`
- `pages/DashBoard/Car.jsx`
- `pages/DashBoard/Customer.jsx`
- `pages/Rating/index.jsx`

Cac file nay khong xuat hien trong ket qua scan token/hard-code chinh, kha nang la dang dung component con, placeholder, hoac chua co style dang ke.

### `src/styles`

- `theme.css`: source of truth cho token.
- `globals.css`: global entry dung cho app.

Khuyen nghi:

- Chi import `globals.css` tai `main.jsx`.
- De `globals.css` import `theme.css`.
- Neu dung dark theme, can them logic set `document.documentElement.dataset.theme = "dark"` hoac toggle tu state/localStorage.

### `src/apis`, `src/hooks`, `src/store`, `src/utils`, `src/config`

Cac folder nay chu yeu la data fetching, state, constants, utility. Khong bat buoc phai dung theme/global truc tiep.

Ket qua scan khong thay nhu cau theme truc tiep trong cac folder nay.

## Chuan nen dung tiep

Nen thong nhat mot kieu token trong Tailwind class:

```jsx
className="bg-(--color-surface-lowest) text-(--color-text-primary)"
```

Hoac:

```jsx
className="bg-[var(--color-surface-lowest)] text-[var(--color-text-primary)]"
```

Hien project dang dung ca hai kieu. Ca hai deu dung duoc, nhung nen chon mot kieu de codebase de doc hon. Vi phan lon component dang dung `bg-(--color-...)`, nen nen uu tien kieu do.

## Checklist uu tien sua

1. Xoa duplicate import `~/styles/theme.css` trong `src/main.jsx`.
2. Doi hard-code mau trong input components:
   - `components/Inputs/index.jsx`
   - `components/Inputs/InputWithIcon.jsx`
3. Doi hard-code mau trong form/layout:
   - `components/Form/FormCard.jsx`
   - `components/Form/FormActions.jsx`
   - `components/Form/FormSection.jsx`
   - `components/Layout/Footer/index.jsx`
   - `components/Layout/privateLayout.jsx`
4. Doi hard-code mau trong auth pages:
   - `pages/authCustomers/LoginPage.jsx`
   - `pages/authCustomers/RegisterPage.jsx`
5. Chuan hoa semantic color:
   - `components/Badge/index.jsx`
   - error text trong login/booking widget.
6. Neu can dark mode that su, them theme toggle/set `data-theme`.

## Tong ket

Global va theme da duoc setup va dang duoc dung o nhieu UI chinh. Tuy nhien chua phai tat ca component/page da theo theme. Cac diem con lech tap trung o input, form, footer, auth pages, badge va mot so text semantic/error.
