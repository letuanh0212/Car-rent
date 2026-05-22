# Luong Create Booking o Frontend

Tai lieu nay tong hop luong tao booking trong `Frontend/src`, dua tren code hien tai.

## 1. Diem bat dau tren UI

Nguoi dung vao trang chi tiet xe:

- Route: `Frontend/src/App.jsx`
- Component page: `Frontend/src/pages/Car/_id.jsx`
- Widget dat xe: `Frontend/src/components/Car/BookingWidget.jsx`

Trong `CarDetailPage`, id xe duoc lay tu URL bang `useParams()`, sau do goi `carDetailApi(id)` de lay thong tin xe:

```jsx
const { id } = useParams();
const { car } = carDetailApi(id);
```

Xe sau khi lay duoc se duoc truyen vao:

```jsx
<BookingWidget car={car} />
```

## 2. BookingWidget tao payload booking

File: `Frontend/src/components/Car/BookingWidget.jsx`

State noi bo cua widget:

- `checkIn`: ngay gio nhan xe, mac dinh la hom nay luc 10:00.
- `checkOut`: ngay gio tra xe, mac dinh la ngay mai luc 10:00.
- `returnLocation`: dia diem tra xe do nguoi dung nhap.

Widget lay them thong tin customer tu Redux auth:

```jsx
const { user } = useSelector((state) => state.auth);
```

Thong tin nay hien thi trong block `Information`, gom:

- `user.full_name`
- `user.phone`

Khi nguoi dung submit form, `handleSubmit` tao payload:

```js
{
  listing_id: car.id,
  start_date: formatBookingDate(checkIn),
  end_date: formatBookingDate(checkOut),
  pickup_location: car.location,
  return_location: returnLocation,
  total_price: priceSummary.total,
}
```

Sau do widget goi:

```jsx
onSubmit?.(payload)
```

Nghia la `BookingWidget` chi chuan bi payload. Viec goi API tao booking phai do component cha truyen vao qua prop `onSubmit`.

## 3. Kiem tra availability truoc khi tao booking

File dang duoc `BookingWidget` import:

- `Frontend/src/store/slices/useCarAvailability.js`

Widget goi:

```jsx
const { isAvailable, message: availabilityMessage } = useCarAvailability({
  carId: car?.id,
  checkIn,
  checkOut,
});
```

Neu `isAvailable === false`, submit bi chan:

```js
alert(availabilityMessage);
return;
```

Hook availability hien tai:

1. Goi `bookingApi.checkCarAvailability(carId)`.
2. Luu danh sach slot da bi book vao `bookedSlots`.
3. Dung `isBookingOverlap()` de so sanh khoang ngay gio nguoi dung chon voi cac booking cu.
4. Neu co overlap thi tra `isAvailable = false`, nguoc lai la `true`.

Logic overlap nam o:

- `Frontend/src/utils/bookingAvailability.js.js`

Quy tac hien tai:

- Moi booking cu duoc cong them `MAINTENANCE_DAYS`.
- `MAINTENANCE_DAYS = 1`, khai bao trong `Frontend/src/config/booking.constants.js`.
- Neu booking moi giao voi khoang `[slot.start_date, slot.end_date + 1 ngay]` thi bi xem la khong kha dung.

## 4. Tinh ngay va gia tien

Ngay gio mac dinh nam o:

- `Frontend/src/utils/date.js`

Ham `getDateValue(offsetDays = 0)`:

- Lay ngay hien tai.
- Cong them `offsetDays`.
- Set gio mac dinh theo config: `10:00`.
- Tra ve format phu hop input `datetime-local`: `YYYY-MM-DDTHH:mm`.

Ham `formatBookingDate(dateValue)`:

- Chuyen `YYYY-MM-DDTHH:mm` thanh `YYYY-MM-DD HH:mm:00`.
- Format nay duoc gui trong payload booking.

Gia tien nam o:

- `Frontend/src/utils/price.js`

`calculateBookingPrice()`:

- Goi `calculateRentalDays(checkIn, checkOut)`.
- `subtotal = days * pricePerDay`.
- `total = subtotal`.

Hien tai chua co phi dich vu, giam gia, thue, deposit.

## 5. Hook tao booking du kien

File:

- `Frontend/src/hooks/Booking/useBookingCreate.jsx`

Hook nay du kien boc Redux booking state va dispatch action tao booking:

```jsx
const bookingState = useSelector((state) => state.booking);

const createBooking = (data) => {
  dispatch(createBookingThunk(data));
};
```

Return:

```js
{
  ...bookingState,
  createBooking,
}
```

Theo thiet ke nay, component cha nen dung:

```jsx
const { createBooking, loading, error } = useBooking();

<BookingWidget car={car} onSubmit={createBooking} />
```

## 6. Redux thunk tao booking

File:

- `Frontend/src/store/thunks/bookingThunk.js`

Y dinh dung `createAsyncThunk` de goi API:

```js
BookingCustomer.createBooking(data)
```

Luong dung mong doi:

1. Component goi `createBooking(payload)`.
2. Hook dispatch `createBookingThunk(payload)`.
3. Thunk goi `BookingCustomer.createBooking(payload)`.
4. Redux slice nhan `pending`, `fulfilled`, `rejected`.
5. UI doc `loading`, `error`, `createdBooking` tu Redux state.

## 7. API tao booking

File:

- `Frontend/src/apis/customer/bookingCustomer.js`

API method:

```js
async createBooking(data) {
  const response = await CusInstance.post("/bookings", data);
  return response.data;
}
```

Endpoint frontend dang goi:

```txt
POST /bookings
```

Axios customer client nam o:

- `Frontend/src/apis/Client/axiosCusClient.js`

Client nay:

- Dung `baseURL = import.meta.env.VITE_API_BASE_URL`.
- Gan `Authorization: Bearer <customerAccessToken>` neu token ton tai.
- Tu refresh token khi gap HTTP 401.
- Neu refresh fail thi xoa token va redirect ve `/login`.

## 8. Trang thai Redux booking du kien

File:

- `Frontend/src/store/slices/bookingSlice.js`

Slice hien tai lang nghe 3 trang thai:

- `createdBooking.pending`
- `createdBooking.fulfilled`
- `createdBooking.rejected`

Trang thai du kien nen co:

- `loading`: dang tao booking.
- `error`: loi tao booking.
- `booking` hoac `createdBooking`: booking vua tao thanh cong.

## 9. Luong day du mong doi

```txt
User vao /cars/:id
  -> CarDetailPage lay car detail
  -> render BookingWidget
  -> user chon check-in, check-out, return location
  -> useCarAvailability kiem tra xe co kha dung khong
  -> BookingWidget tinh total_price
  -> user bam Rent This Car
  -> BookingWidget tao payload
  -> onSubmit(payload)
  -> useBooking.createBooking(payload)
  -> dispatch(createBookingThunk(payload))
  -> BookingCustomer.createBooking(payload)
  -> POST /bookings
  -> Redux bookingSlice cap nhat loading/error/result
  -> UI hien thi thanh cong hoac loi
```

## 10. Cac diem dang bi dut trong code hien tai

### 10.1. `BookingWidget` chua duoc noi voi tao booking

Trong `Frontend/src/pages/Car/_id.jsx`:

```jsx
<BookingWidget car={car} />
```

Dang thieu prop `onSubmit`, nen khi bam `Rent This Car`, payload duoc tao nhung khong co API nao duoc goi.

Can noi voi `useBooking()`:

```jsx
const { createBooking } = useBooking();

<BookingWidget car={car} onSubmit={createBooking} />
```

### 10.2. Ten thunk khong khop

`useBookingCreate.jsx` import:

```js
createBookingThunk
```

Nhung `bookingThunk.js` hien tai lai export:

```js
getAllCarsThunk
```

Va slice import:

```js
createdBooking
```

Can thong nhat mot ten, vi du:

```js
export const createBookingThunk = createAsyncThunk(
  "booking/create",
  async (data, thunkAPI) => { ... }
);
```

Sau do slice import dung `createBookingThunk`.

### 10.3. Thunk chua truyen data vao API

Code hien tai:

```js
const response = await BookingCustomer.createBooking();
```

Can truyen payload:

```js
const response = await BookingCustomer.createBooking(data);
```

### 10.4. API booking import nham axios instance

Trong `Frontend/src/apis/customer/bookingCustomer.js`:

```js
import CusInstance from '~/apis/customer/bookingCustomer';
```

Day la import chinh no, gay vong lap import. Can import customer axios client:

```js
import CusInstance from "~/apis/Client/axiosCusClient";
```

### 10.5. Response axios dang bi boc 2 lan

`axiosCusClient.js` response interceptor tra ve:

```js
(response) => response.data
```

Vi vay trong `bookingCustomer.js`, `CusInstance.post(...)` da tra ve body data roi.

Neu API method tiep tuc:

```js
return response.data;
```

thi co the bi sai shape. Nen can thong nhat:

```js
const response = await CusInstance.post("/bookings", data);
return response;
```

### 10.6. Booking reducer chua gan vao store

Trong `Frontend/src/store/index.js` hien tai chi co:

```js
auth: autheReducer,
cars: carReducer,
```

`useBookingCreate.jsx` lai doc:

```js
state.booking
```

Can import va gan booking reducer:

```js
import bookingReducer from "./slices/bookingSlice";

const store = configureStore({
  reducer: {
    auth: autheReducer,
    cars: carReducer,
    booking: bookingReducer,
  },
});
```

### 10.7. `store/index.js` dang co syntax loi

File hien tai co dong import bi dang do:

```js
import 
```

Dong nay se lam app build fail.

### 10.8. `bookingSlice.js` dang dat ten slice/state la cars

Trong `bookingSlice.js`:

```js
const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    loading: false,
    error: null,
  },
});
```

Voi booking, nen doi thanh:

```js
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    booking: null,
    loading: false,
    error: null,
  },
});
```

### 10.9. Availability hook dang co 2 ban

Co 2 file gan giong nhau:

- `Frontend/src/hooks/Car/useCarAvailability.jsx`
- `Frontend/src/store/slices/useCarAvailability.js`

`BookingWidget` dang import file trong `store/slices`, nhung day la hook UI, khong phai Redux slice. Nen chuyen ve dung thu muc hook se ro hon:

```js
import useCarAvailability from "~/hooks/Car/useCarAvailability";
```

Ngoai ra `hooks/Car/useCarAvailability.jsx` goi:

```js
bookingApi.getBookingsByListingId(carId)
```

nhung `BookingCustomer` hien chua co method `getBookingsByListingId`.

### 10.10. `checkCarAvailability` khai bao 3 tham so nhung hook chi truyen 1

API method:

```js
checkCarAvailability(carId, startDate, endDate)
```

Hook hien tai goi:

```js
bookingApi.checkCarAvailability(carId)
```

Neu backend endpoint can `startDate`, `endDate`, can truyen them:

```js
bookingApi.checkCarAvailability(carId, checkIn, checkOut)
```

## 11. Payload create booking hien tai

Payload frontend tao ra:

```json
{
  "listing_id": "car.id",
  "start_date": "YYYY-MM-DD HH:mm:00",
  "end_date": "YYYY-MM-DD HH:mm:00",
  "pickup_location": "car.location",
  "return_location": "user input",
  "total_price": 1000000
}
```

Can doi ten field neu backend yeu cau khac, vi frontend hien dang dung `listing_id`, khong phai `car_id`.

## 12. De xuat thu tu sua

1. Sua import axios trong `bookingCustomer.js`.
2. Tao dung `createBookingThunk(data)`.
3. Sua `bookingSlice.js` import dung thunk va state dung booking.
4. Gan `bookingReducer` vao `store/index.js` va xoa dong `import` dang do.
5. Trong `CarDetailPage`, dung `useBooking()` va truyen `onSubmit` cho `BookingWidget`.
6. Thong nhat mot hook availability va dung dung endpoint backend.
7. Sau khi tao booking thanh cong, them dieu huong toi trang chi tiet booking hoac `/bookings`.

