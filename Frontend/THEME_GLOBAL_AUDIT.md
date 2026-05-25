# Frontend Theme & Global CSS Audit

Ngay kiem tra: 2026-05-25

## Ket luan nhanh

Frontend da co global CSS va theme token trung tam:

- `src/styles/globals.css` import Tailwind va `theme.css`.
- `src/styles/theme.css` khai bao CSS variables cho mau sac, typography, layout, radius, shadow.
- `src/main.jsx` da import `globals.css`, nen global style dang duoc apply cho toan app.

Trang thai sau khi fix:

- `src/main.jsx` da chi import `globals.css`; `theme.css` duoc import qua `globals.css`.
- Cac component/page trong checklist da duoc doi sang theme token.
- Scan mau hard-code chi con `components/Banner/index.jsx` dung overlay anh hero `bg-black/45` va chu `text-white`, day la truong hop co chu y de dam bao tuong phan tren anh.
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

`theme.css` da duoc go duplicate import. Nen tiep tuc giu `globals.css` la entry duy nhat cho global style, vi `globals.css` da import `theme.css`.

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
- `components/Inputs/index.jsx`
- `components/Inputs/InputWithIcon.jsx`
- `components/Layout/Footer/index.jsx`
- `components/Form/FormCard.jsx`
- `components/Form/FormActions.jsx`
- `components/Form/FormSection.jsx`
- `components/Badge/index.jsx`
- `components/Layout/privateLayout.jsx`

#### Da fix hard-code mau / da dong bo theme

- `components/Inputs/index.jsx`
  - Da doi sang `--color-border`, `--color-surface-low`, `--color-text-primary`, `--color-secondary`.

- `components/Inputs/InputWithIcon.jsx`
  - Da doi sang `text-(--color-text-muted)`.

- `components/Layout/Footer/index.jsx`
  - Da doi sang border/surface/text token.

- `components/Form/FormCard.jsx`
  - Da doi sang `bg-(--color-surface-lowest)` va `text-(--color-text-muted)`.

- `components/Form/FormActions.jsx`
  - Da doi sang `border-(--color-border)`.

- `components/Form/FormSection.jsx`
  - Da doi sang `border-(--color-border)`.

- `components/Badge/index.jsx`
  - Da map sang semantic token: warning/error/success.

- `components/Banner/index.jsx`
  - Dang dung `bg-black/45`, `text-white`.
  - Day co the chap nhan vi la overlay hero image, nhung neu muon theme hoa thi nen dung `--color-primary` / `--color-on-primary`.

- `components/Layout/privateLayout.jsx`
  - Da doi sang `--color-surface-lowest` va `--color-surface`.

- `components/Car/BookingWidget.jsx`
  - Da doi sang `--color-text-secondary`, `--color-success`, `--color-error`.

- `components/Car/DetailInfo.jsx`
  - Da doi sang `--color-text-secondary`.

#### Khong can theme truc tiep / wrapper only

- `components/Form/FormRow.jsx`
- `components/Inputs/InputField.jsx`
- `components/Layout/publicLayout.jsx`
- `components/Table/index.js` neu file nay chi export placeholder/logic.

### `src/pages`

#### Da dung theme token tot

- `pages/Booking/index.jsx`
  - Dung CSS variables bang cu phap `bg-[var(--color-surface)]`, `text-[var(--color-text-primary)]`, `shadow-[var(--shadow-lg)]`.

- `pages/authCustomers/Profile.jsx`
- `pages/authAccountSystem/LoginPageSystem.jsx`
- `pages/Car/index.jsx`
- `pages/Car/_id.jsx`
- `pages/DashBoard/index.jsx`

#### Con hard-code mau / chua dong bo theme

- `pages/authCustomers/LoginPage.jsx`
  - Da doi sang `bg-(--color-background)` va `text-(--color-error)`.

- `pages/authCustomers/RegisterPage.jsx`
  - Da doi sang `bg-(--color-background)`.

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

1. Done: Xoa duplicate import `~/styles/theme.css` trong `src/main.jsx`.
2. Done: Doi hard-code mau trong input components:
   - `components/Inputs/index.jsx`
   - `components/Inputs/InputWithIcon.jsx`
3. Done: Doi hard-code mau trong form/layout:
   - `components/Form/FormCard.jsx`
   - `components/Form/FormActions.jsx`
   - `components/Form/FormSection.jsx`
   - `components/Layout/Footer/index.jsx`
   - `components/Layout/privateLayout.jsx`
4. Done: Doi hard-code mau trong auth pages:
   - `pages/authCustomers/LoginPage.jsx`
   - `pages/authCustomers/RegisterPage.jsx`
5. Done: Chuan hoa semantic color:
   - `components/Badge/index.jsx`
   - error text trong login/booking widget.
6. Pending: Neu can dark mode that su, them theme toggle/set `data-theme`.

## Tong ket

Global va theme da duoc setup va cac diem lech chinh trong input, form, footer, auth pages, badge va text semantic/error da duoc fix. Phan con lai dang co chu y la `Banner` dung overlay den va chu trang tren anh hero de dam bao contrast.
