# Hướng dẫn dựng frontend lớn từ đầu

Tài liệu này mô tả cách bắt đầu một frontend lớn kiểu `move-fe` khi đã có Figma design. Mục tiêu là dựng hệ thống trước, rồi mới lắp từng màn hình, để tránh mỗi page một style, mỗi người một cách gọi API.

## Thứ tự ưu tiên

1. Bóc Figma thành design system.
2. Dựng app shell: provider, router, layout, sidebar, guard.
3. Dựng token theme và global style.
4. Dựng component nền dùng lại.
5. Dựng API layer và type.
6. Dựng route/menu/permission config.
7. Làm từng feature theo lát dọc end-to-end.
8. Ghi convention sớm để agent/dev sau không phá style.

Không nên bắt đầu bằng việc code từng màn Figma riêng lẻ. Với app lớn, nếu không có system trước thì về sau sẽ rất dễ lặp component, hard-code màu, và tách logic sai chỗ.

## Cấu trúc folder nên có

Một admin frontend lớn nên có cấu trúc gần như sau:

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

Ý nghĩa từng folder:

- `apis/`: hàm gọi backend, chia theo domain nghiệp vụ.
- `components/`: component dùng lại, không gắn với một page cụ thể.
- `config/`: menu, access rule, constant app-level.
- `contexts/`: React Provider cấp app như theme, locale, tenant.
- `hooks/`: custom hook dùng lại.
- `layouts/`: shell lớn như private layout, auth layout, sidebar, topbar.
- `pages/`: màn hình theo feature/domain.
- `routes/`: router, lazy route, guard, redirect.
- `stores/`: client state bằng Zustand hoặc store tương đương.
- `styles/`: theme token, global CSS, style wrapper dùng chung.
- `types/`: TypeScript type/interface dùng chung.
- `utils/`: helper thuần logic, không phụ thuộc UI.

Nguyên tắc: folder phản ánh responsibility, không phản ánh việc "file nào tiện tay để đâu".

## Bóc Figma thành design system

Trước khi code nhiều page, cần đọc Figma để lấy ra các thành phần nền:

- Màu brand, màu nền, màu chữ, màu border, màu semantic.
- Typography: font, size, weight, line-height.
- Spacing scale.
- Border radius.
- Shadow/elevation.
- Button variants.
- Input/select/date picker/table/modal/card states.
- Sidebar/topbar/content layout.
- Responsive behavior.
- Light/dark mode nếu có.

Sau đó chuyển các giá trị này thành token trong CSS:

```css
:root {
    --brand: #e72878;
    --bg-page: #ffffff;
    --bg-elevated: #ffffff;
    --text-primary: #0f0f0f;
    --text-secondary: rgba(15, 15, 15, 0.72);
    --surface-border: rgba(15, 15, 15, 0.12);
    --card-shadow: 0 14px 34px rgba(15, 15, 15, 0.08);
}

:root[data-theme="dark"] {
    --bg-page: #0f0f0f;
    --bg-elevated: #151515;
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.76);
    --surface-border: rgba(255, 255, 255, 0.16);
}
```

Page/component sau đó dùng `var(...)` thay vì hard-code màu:

```css
.example-card {
    background: var(--bg-elevated);
    color: var(--text-primary);
    border: 1px solid var(--surface-border);
}
```

## Dựng app shell trước

Nên làm các file nền trước khi làm page nghiệp vụ:

- `main.tsx`: mount app, setup default của library nếu có.
- `App.tsx`: bọc provider, config UI library, import CSS global.
- `contexts/theme-context.tsx`: quản lý light/dark mode nếu app có theme.
- `routes/`: khai báo route, lazy load, auth guard.
- `layouts/private/`: private shell, sidebar, content area.
- `config/sider-options/`: menu source theo role/permission.

Mục tiêu của giai đoạn này là có app chạy được với login/private layout/route guard, trước khi có đầy đủ page.

## Theme và global style

Nên tách rõ:

- `styles/theme.css`: token màu, light/dark, global visual style, override UI library theo theme.
- `App.css`: import Tailwind và rule kỹ thuật app-wide không thuộc palette/theme.
- CSS cục bộ của page/component: chỉ dùng khi style thật sự local, vẫn phải dùng token.

Không thêm màu mới vào page nếu đã có token tương đương. Nếu bắt buộc thêm token mới, thêm cả light và dark.

## Component nền cần có sớm

Nên dựng các component lặp lại nhiều trước:

- Button wrappers.
- Form item wrapper.
- Input/password/search conventions.
- Table wrapper.
- Page toolbar hoặc page header.
- Status tag.
- Empty state.
- Confirm modal.
- Upload/import component nếu nghiệp vụ cần.
- Permission-aware action button nếu app có RBAC.

Component nền không nên chứa logic nghiệp vụ nặng. Ví dụ `ITable` chỉ nên lo table behavior, pagination, empty state, scroll; page sẽ lo column và data.

## API layer

`apis/` chỉ nên lo giao tiếp backend:

```txt
apis/
  client.ts
  auth.ts
  user.ts
  booking.ts
  warranty.ts
```

Mỗi module nên biết:

- endpoint nào;
- method nào;
- params/body nào;
- response type nào.

Không để route, sidebar, component layout trong `apis/`. Page sẽ dùng API thông qua React Query hoặc hook tương đương.

Ví dụ:

```ts
export const getUsers = (params: UserListParams) => {
    return apiClient.get<PageResponse<User>>("/users", { params });
};
```

## Routes, menu và permission

`routes/` quyết định URL nào render page nào. `config/sider-options/` quyết định item nào xuất hiện trong sidebar. Nếu app có RBAC, mỗi route/menu nên có rule rõ ràng:

```ts
{
    key: "users",
    label: "Người dùng",
    path: "/users",
    roles: ["admin", "super_admin"],
    permission: "user.read",
}
```

Không hard-code menu trong sidebar component. Sidebar chỉ nên đọc config, filter theo role/permission, và render UI.

## State management

Nên chia theo loại state:

- Server state: dùng React Query.
- Client state dùng chung: dùng Zustand trong `stores/`.
- Provider-level state: dùng React Context trong `contexts/`.
- Local UI state: để trong component/page.

Ví dụ:

- Danh sách booking từ backend: React Query.
- User/session/cache UI dùng chung: Zustand.
- Theme mode, locale, tenant provider: Context.
- Modal open/close trong một page: local state.

Không dùng Context cho mọi thứ. Context hợp với state cần Provider và cần bọc quanh cây React. Zustand hợp với client state dùng chung nhưng không cần Provider.

## Làm feature theo lát dọc

Sau khi shell và component nền ổn, làm từng feature theo lát dọc:

1. Thêm type.
2. Thêm API function.
3. Thêm React Query hook nếu cần.
4. Thêm route.
5. Thêm menu item và permission.
6. Làm page list.
7. Làm form create/edit/detail.
8. Xử lý loading, empty, error, permission denied.
9. Kiểm tra light/dark và responsive.

Làm end-to-end từng feature sẽ tốt hơn làm hết UI trước rồi mới nối API.

## Checklist khi thêm page mới

- Page đi qua layout chung, không tự dựng shell riêng.
- Dùng token theme thay vì hard-code màu.
- Dùng component wrapper có sẵn nếu phù hợp.
- API nằm trong `apis/`, không viết inline trong page.
- Route nằm trong `routes/`.
- Sidebar item nằm trong config menu.
- Permission/role được khai báo rõ.
- Loading, empty, error state có xử lý.
- Light/dark đọc được.
- Mobile/responsive không vỡ layout.

## Tài liệu convention

Nên viết convention sớm, ngay cả khi app còn ít page. Tài liệu nên trả lời các câu hỏi:

- Thêm màu ở đâu?
- Thêm route ở đâu?
- Thêm menu ở đâu?
- Thêm API ở đâu?
- Khi nào dùng Context?
- Khi nào dùng Zustand?
- Khi nào dùng React Query?
- Page mới nên theo structure nào?
- Component nào bắt buộc ưu tiên dùng lại?
- Dark mode cần check những gì?

Với frontend lớn, convention không phải phần phụ. Nó là cách giữ cho codebase không vỡ thành nhiều phong cách riêng lẻ.

