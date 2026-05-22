# Luong login customer trong frontend

Tai lieu nay mo ta luong login customer hien tai trong `Frontend/src`, vai tro cua hook, Redux, Context, va cach nen xu ly khi co 2 trang login rieng: customer login va account/admin login.

## 1. Cac file lien quan

- `src/pages/authCustomers/LoginPage.jsx`: man hinh login customer.
- `src/hooks/AuthCus/useCustomerLogin.jsx`: custom hook goi API login va quan ly `loading`, `error`.
- `src/apis/authCustomer.js`: API wrapper cho customer auth.
- `src/apis/Client/axiosCusClient.js`: axios instance cho request customer, tu dong gan token va refresh token.
- `src/store/slices/authSlice.js`: Redux slice luu trang thai dang nhap.
- `src/contexts/AuthContext.jsx`: Context auth doc token tu localStorage va logout.
- `src/App.jsx`: dinh nghia route `/login`, `/register`, `/`.
- `src/main.jsx`: render app, hien tai chua boc Redux Provider va chua boc AuthProvider.

## 2. Luong login customer hien tai

Khi user vao `/login`, component `LoginPage.jsx` render form email/password.

Khi submit form:

```jsx
const formData = new FormData(e.target);
const data = {
  email: formData.get("email"),
  password: formData.get("password"),
};

await login(data);
navigate("/");
```

`login` o day duoc lay tu hook:

```jsx
const { login, loading, error } = useCustomerLogin();
```

Trong `useCustomerLogin.jsx`, ham `login(formData)` lam cac viec:

1. set `loading = true`.
2. xoa loi cu bang `setError("")`.
3. goi API:

```jsx
const response = await authApi.loginAccountSystem(formData);
```

4. luu access token vao localStorage:

```jsx
localStorage.setItem("CustomerAccessToken", response.accessToken);
```

5. return response cho page.
6. neu loi thi set `error`, throw loi ra ngoai.
7. cuoi cung set `loading = false`.

Sau khi login thanh cong, `LoginPage.jsx` chuyen ve `/`.

## 3. Vai tro cua hook

Hook `useCustomerLogin` nen duoc hieu la tang UI logic cho rieng login customer.

Hook nen phu trach:

- Nhan `email/password` tu page.
- Goi API login customer.
- Quan ly `loading`.
- Quan ly `error`.
- Tra ket qua login cho page.
- Neu dung Redux, hook co the dispatch `loginSuccess`.

Hook khong nen bi nham voi API. API chi nen goi HTTP request, con hook la noi ket noi API voi UI.

Dang hien tai hook co diem can sua:

```jsx
const response = await authApi.loginAccountSystem(formData);
```

Ten method nay khong dung nghia vi dang login customer nhung lai ten `loginAccountSystem`. Nen doi thanh:

```jsx
const response = await authApi.loginCustomer(formData);
```

Trong `authCustomer.js` cung nen doi method tu `loginAccountSystem` thanh `loginCustomer`.

## 4. Vai tro cua Redux

Redux nen la noi luu auth state dung chung toan app, vi nhieu component can biet user da login chua.

Vi du:

- Header/AppBar hien nut Logout hay Login.
- Private route chan user chua login.
- Booking page yeu cau customer login.
- Profile page can token/user.

`authSlice.js` hien tai dang luu:

```js
const initialState = {
  token: token || null,
  isAuthenticated: Boolean(token),
};
```

Va co 2 action:

- `loginSuccess(token)`: luu token vao Redux va localStorage.
- `logout()`: xoa token khoi Redux va localStorage.

Neu da dung Redux thi flow nen la:

```jsx
const dispatch = useDispatch();

const response = await authApi.loginCustomer(data);
dispatch(loginSuccess(response.accessToken));
```

Page login sau do chi can:

```jsx
await login(data);
navigate("/");
```

## 5. Van de hien tai can chu y

Code hien tai co mot so diem chua thong nhat:

### 5.1. Sai key localStorage

`AuthContext.jsx` doc:

```js
localStorage.getItem("customerAccessToken");
```

`axiosCusClient.js` cung doc:

```js
localStorage.getItem("customerAccessToken");
```

Nhung `useCustomerLogin.jsx` va `authSlice.js` lai ghi:

```js
localStorage.setItem("CustomerAccessToken", token);
```

Khac nhau chu hoa chu thuong:

- `customerAccessToken`
- `CustomerAccessToken`

Day la loi quan trong. Login co the thanh cong nhung axios khong lay duoc token de gan vao header.

Nen thong nhat dung:

```js
customerAccessToken
customerRefreshToken
accountAccessToken
accountRefreshToken
```

### 5.2. `authCustomer.js` import sai axios instance

Hien tai:

```js
import customerInstance from "./Client/axiosAccountClient";
```

Nhung day la API customer nen nen dung:

```js
import customerInstance from "./Client/axiosCusClient";
```

Neu dung `axiosAccountClient`, request customer se bi gan token account/admin, redirect loi ve `/account/login`, khong dung vai tro customer.

### 5.3. Axios response dang bi unwrap 2 lan

Trong `axiosCusClient.js`:

```js
interceptors.response.use((response) => response.data)
```

Nghia la khi goi:

```js
const response = await customerInstance.post(...)
```

thi `response` da la `response.data` roi.

Nhung trong `authCustomer.js` lai return:

```js
return response.data;
```

Co kha nang bi sai thanh `undefined`.

Neu axios interceptor da return `response.data`, API wrapper nen viet:

```js
const response = await customerInstance.post("/customer/login", formData);
return response;
```

### 5.4. Redux store chua duoc export va chua boc Provider

`src/store/index.js` hien tai tao store nhung chua export:

```js
const store = configureStore(...)
```

Nen them:

```js
export default store;
```

Va trong `main.jsx`, neu dung Redux thi can:

```jsx
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

```
### 5.5. AuthContext chua duoc dung dung cach

`AuthContext.jsx` co tao `AuthProvider`, nhung `main.jsx` chua boc:

```jsx
<AuthProvider>
  <App />
</AuthProvider>
```

Ngoai ra file `useAuth.js` dang import:

```js
import { AuthContext } from "./AuthContext";
```

Nhung `AuthContext.jsx` hien tai chi:

```js
const AuthContext = createContext(null);
```

khong export `AuthContext`. Neu muon dung `useAuth`, can export:

```js
export const AuthContext = createContext(null);
```

Tuy nhien nen chon mot trong hai cach: Redux hoac Context. Khong nen dung ca hai cho cung mot auth state neu chua co ly do ro rang.

## 6. Nen dung Redux hay Context?

Voi project nay da co `@reduxjs/toolkit` va `authSlice.js`, nen dung Redux lam auth state chinh.

Khuyen nghi:

- Redux quan ly `token`, `user`, `role/authType`, `isAuthenticated`.
- Hook login goi API roi dispatch action.
- Axios doc token tu localStorage de gan header.
- Logout dispatch Redux action va xoa localStorage.
- Khong can `AuthContext` nua, hoac chi giu Context neu bo Redux.

Neu dung Redux thi flow nen nhu sau:

```txt
LoginPage
  -> useCustomerLogin.login(data)
    -> authCustomer.loginCustomer(data)
      -> POST /customer/login
    -> luu customerAccessToken vao localStorage
    -> dispatch customerLoginSuccess(...)
  -> navigate("/")
```

## 7. Cach nen xu ly neu co 2 trang login rieng

Neu app co 2 trang login:

- `/login`: customer login.
- `/account/login`: account/admin/staff login.

Thi khong nen dung chung lung tung token key va axios instance.

Nen tach ro:

```txt
Customer login:
  route: /login
  API: /customer/login
  axios: axiosCusClient
  access token key: customerAccessToken
  refresh token key: customerRefreshToken
  redirect khi 401: /login

Account/Admin login:
  route: /account/login
  API: /account/login
  axios: axiosAccountClient
  access token key: accountAccessToken
  refresh token key: accountRefreshToken
  redirect khi 401: /account/login
```

### Option A: Dung 2 hook rieng

Nen tao:

```txt
src/hooks/AuthCus/useCustomerLogin.jsx
src/hooks/AuthAccount/useAccountLogin.jsx
```

Customer hook:

```jsx
const response = await authCustomer.loginCustomer(data);
dispatch(customerLoginSuccess(response.data || response));
```

Account hook:

```jsx
const response = await authAccountSystem.login(data);
dispatch(accountLoginSuccess(response.data || response));
```

Cach nay de doc, it nham role, phu hop khi co 2 form login rieng.

### Option B: Dung 1 hook chung co tham so `authType`

Co the tao:

```jsx
useLogin("customer")
useLogin("account")
```

Nhung cach nay chi nen dung khi 2 luong login giong nhau gan nhu hoan toan. Neu endpoint, token, redirect, payload, role khac nhau thi nen tach hook rieng.

Voi code hien tai, nen chon Option A.

## 8. Redux slice nen thiet ke nhu nao cho 2 login

Nen luu ro auth type:

```js
const initialState = {
  user: null,
  authType: null, // "customer" | "account" | null
  customerToken: localStorage.getItem("customerAccessToken"),
  accountToken: localStorage.getItem("accountAccessToken"),
  isAuthenticated: Boolean(
    localStorage.getItem("customerAccessToken") ||
    localStorage.getItem("accountAccessToken")
  ),
};
```

Reducers nen tach:

```js
customerLoginSuccess(state, action) {
  state.customerToken = action.payload.accessToken;
  state.authType = "customer";
  state.isAuthenticated = true;
  localStorage.setItem("customerAccessToken", action.payload.accessToken);
  localStorage.setItem("customerRefreshToken", action.payload.refreshToken);
}

accountLoginSuccess(state, action) {
  state.accountToken = action.payload.accessToken;
  state.authType = "account";
  state.isAuthenticated = true;
  localStorage.setItem("accountAccessToken", action.payload.accessToken);
  localStorage.setItem("accountRefreshToken", action.payload.refreshToken);
}

logout(state) {
  state.user = null;
  state.authType = null;
  state.customerToken = null;
  state.accountToken = null;
  state.isAuthenticated = false;
  localStorage.removeItem("customerAccessToken");
  localStorage.removeItem("customerRefreshToken");
  localStorage.removeItem("accountAccessToken");
  localStorage.removeItem("accountRefreshToken");
}
```

Neu customer va account co the dang nhap dong thoi trong cung browser thi can suy nghi ky hon. Thong thuong nen chi cho mot auth session active tai mot thoi diem de tranh UI bi nham role.

## 9. Private route nen tach theo role

Nen co route guard rieng:

```txt
CustomerPrivateRoute:
  cho phep khi co customerAccessToken
  neu chua co -> redirect /login

AccountPrivateRoute:
  cho phep khi co accountAccessToken
  neu chua co -> redirect /account/login
```

Vi du:

```jsx
function CustomerPrivateRoute() {
  const token = useSelector((state) => state.auth.customerToken);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function AccountPrivateRoute() {
  const token = useSelector((state) => state.auth.accountToken);
  return token ? <Outlet /> : <Navigate to="/account/login" replace />;
}
```

Sau do trong `App.jsx`:

```jsx
<Route element={<PublicLayout />}>
  <Route path="/" element={<Car />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
</Route>

<Route element={<CustomerPrivateRoute />}>
  <Route path="/booking" element={<BookingPage />} />
</Route>

<Route path="/account/login" element={<AccountLoginPage />} />

<Route element={<AccountPrivateRoute />}>
  <Route path="/account/dashboard" element={<DashboardPage />} />
</Route>
```

## 10. Luong login customer nen sua thanh final

Nen sua theo thu tu:

1. Doi `authCustomer.js` dung `axiosCusClient`.
2. Doi ten method `loginAccountSystem` thanh `loginCustomer`.
3. Thong nhat localStorage key la `customerAccessToken`.
4. Neu API tra refresh token, luu them `customerRefreshToken`.
5. Export Redux store va boc `<Provider>` trong `main.jsx`.
6. Trong hook, sau khi login thanh cong thi dispatch Redux action.
7. Page login chi xu ly submit va navigate, khong tu xu ly token.

Flow sau khi sua:

```txt
User submit /login
  -> LoginPage lay email/password
  -> useCustomerLogin.login(data)
  -> authCustomer.loginCustomer(data)
  -> axiosCusClient POST /customer/login
  -> backend tra accessToken/refreshToken/user
  -> hook dispatch customerLoginSuccess
  -> Redux luu state, localStorage luu token
  -> LoginPage navigate("/")
  -> request sau do tu dong co Authorization: Bearer customerAccessToken
```

## 11. Ket luan ngan gon

Hien tai login customer da co form, hook, API wrapper va Redux slice, nhung chua noi voi nhau hoan chinh. Loi lon nhat la token key khong thong nhat, customer API dang import nham axios account, Redux Provider chua duoc boc vao app, va AuthContext/Redux dang bi trung vai tro.

Neu co 2 trang login rieng, nen tach customer va account thanh 2 hook, 2 API wrapper, 2 axios instance, 2 token key va 2 route guard rieng. Redux nen la noi quan ly auth state trung tam, con hook chi lam cau noi giua page login va API/Redux.
