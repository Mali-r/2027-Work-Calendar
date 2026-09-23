# 2027 Smart Work Calendar — Frontend + Backend

โปรเจกต์นี้แบ่งเป็น 2 ส่วน:

```
project/
├── server/   → Backend API (Node.js + Express + MongoDB) — deploy ที่ Render
└── client/   → Frontend (HTML/CSS/JS ไฟล์เดียว) — deploy ที่ Vercel
```

ข้อมูลทั้งหมด (Task, Meeting, Note, Follow-up, Goals, วันหยุด, ผู้รับผิดชอบ) เก็บอยู่บน **MongoDB**
ทุกคนที่ Login เข้ามาจะเห็นและแก้ไขข้อมูลชุดเดียวกัน (อัปเดตให้กันเองอัตโนมัติทุก ~8 วินาที)

---

## ภาพรวมขั้นตอน (ทำตามลำดับ)

1. สร้างฐานข้อมูล MongoDB Atlas (ฟรี)
2. Deploy โฟลเดอร์ `server/` ขึ้น Render
3. ตั้งค่า `client/config.js` ให้ชี้ไป URL ของ Render
4. Deploy โฟลเดอร์ `client/` ขึ้น Vercel
5. ตั้งค่า admin แล้วเปิดเว็บ → Login ด้วยบัญชี admin ที่ seed ไว้

---

## 1) สร้าง MongoDB Atlas (ฟรี)

1. ไปที่ https://www.mongodb.com/cloud/atlas → สมัคร/เข้าสู่ระบบ
2. สร้าง Cluster แบบฟรี (M0)
3. ไปที่ **Database Access** → สร้าง Database User (จด username/password ไว้)
4. ไปที่ **Network Access** → Add IP Address → เลือก **Allow access from anywhere (0.0.0.0/0)**
   (จำเป็น เพราะ Render จะเชื่อมต่อจาก IP ที่ไม่คงที่)
5. ไปที่ **Database → Connect → Drivers** → คัดลอก **Connection String**
   จะได้ประมาณ:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```
   ให้เติมชื่อฐานข้อมูลต่อท้ายโดเมน เช่น:
   ```
   mongodb+srv://myuser:mypass@cluster0.xxxxx.mongodb.net/smartworkcalendar2027?retryWrites=true&w=majority
   ```
   เก็บค่านี้ไว้ใช้เป็น `MONGODB_URI` ในขั้นตอนถัดไป

---

## 2) Deploy Backend ที่ Render

1. Push repository ทั้งโปรเจกต์ขึ้น GitHub (ไม่ต้องแยกโฟลเดอร์)
2. ไปที่ https://render.com → New → **Web Service** → เชื่อม GitHub repo ที่เพิ่ง push
3. ตั้งค่า:
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
4. เพิ่ม Environment Variables (คัดลอกจาก `.env.example`):
   | Key | Value |
   |---|---|
   | `MONGODB_URI` | connection string จากขั้นตอนที่ 1 |
   | `JWT_SECRET` | สุ่มข้อความยาว ๆ (รันคำสั่งนี้ในเครื่อง: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`) |
   | `CORS_ORIGIN` | ใส่ URL ของ Vercel ที่จะได้ในขั้นตอนที่ 4 (ตอนนี้ใส่ `*` ไปก่อนได้ แล้วค่อยกลับมาแก้) |
   | `REGISTER_CODE` | (ไม่บังคับ) ตั้งรหัสเชิญไว้กันคนนอกสมัครสมาชิกมั่ว เช่น `SWC2027` — ถ้าไม่ต้องการ เว้นว่างไว้ |
   | `ADMIN_USERNAME` | ชื่อผู้ใช้ admin ที่ระบบจะสร้างให้อัตโนมัติ เช่น `admin` |
   | `ADMIN_PASSWORD` | รหัสผ่าน admin อย่างน้อย 6 ตัวอักษร ควรใช้รหัสที่สุ่มและไม่ซ้ำกับที่อื่น |
5. กด **Create Web Service** รอ Build เสร็จ จะได้ URL ประมาณ
   `https://smart-work-calendar-2027-api.onrender.com`
6. ทดสอบว่าใช้ได้ โดยเปิด `https://<your-render-url>/api/health` ในเบราว์เซอร์ ควรเห็น `{"ok":true}`

> หมายเหตุ: Render แผนฟรีจะ "หลับ" เมื่อไม่มีคนใช้งานสักพัก และตื่นช้าประมาณ 30-50 วินาทีในการเรียกครั้งแรก ถือเป็นเรื่องปกติของแผนฟรี

---

## 3) ตั้งค่า Frontend ให้ชี้ไป Backend

เปิดไฟล์ `client/config.js` แล้วแก้บรรทัดนี้ให้เป็น URL ของ Render จริง (ห้ามมี `/` ปิดท้าย):

```js
window.API_BASE_URL = "https://smart-work-calendar-2027-api.onrender.com";
```

---

## 4) Deploy Frontend ที่ Vercel

1. ไปที่ https://vercel.com → New Project → เลือก repository นี้
3. ตั้งค่า:
   - **Root Directory**: `client` (สำคัญมาก เพราะ `index.html` อยู่ในโฟลเดอร์นี้)
   - **Framework Preset**: Other (ไม่ต้อง build ใด ๆ — เป็นไฟล์ static ล้วน)
   - **Build Command**: เว้นว่าง หรือปิดใช้งาน
   - **Output Directory**: `.`
4. กด Deploy จะได้ URL ประมาณ `https://your-project.vercel.app`
5. **กลับไปที่ Render** → แก้ Environment Variable `CORS_ORIGIN` ให้เป็น URL ของ Vercel นี้ (เช่น `https://your-project.vercel.app`) แล้ว Save จะ Redeploy ให้อัตโนมัติ

> สำหรับ monorepo ให้ตั้งค่าแยกกัน: Vercel ใช้ Root Directory เป็น `client` และไม่มี environment variable ที่จำเป็นสำหรับ frontend ส่วน Render ใช้ Root Directory เป็น `server` และตั้ง `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` ในหน้า Environment ของ Render เท่านั้น

ถ้า Vercel ขึ้น `404 NOT_FOUND` ที่หน้า `/` ให้เข้า **Project Settings → General → Root Directory** แล้วเลือก `client` จากนั้นกด Save และ Redeploy ใหม่ โดยไม่ต้องย้าย `index.html` ขึ้น root

---

## 5) เริ่มใช้งาน

1. เปิด URL ของ Vercel
2. Login ด้วย `ADMIN_USERNAME` และ `ADMIN_PASSWORD` ที่ตั้งไว้ใน Render
3. เพื่อนร่วมทีมสามารถสมัครบัญชีของตัวเองได้จากลิงก์ "ยังไม่มีบัญชี? สมัครสมาชิก"
4. ทุกคน Login แล้วจะเห็น/แก้ไขข้อมูล Task, Calendar, Note ฯลฯ ชุดเดียวกันทั้งหมด

### Seed admin ในเครื่อง

คัดลอก `server/.env.example` เป็น `server/.env` แล้วกรอก `MONGODB_URI`, `JWT_SECRET`, `ADMIN_USERNAME` และ `ADMIN_PASSWORD` จากนั้นรัน:

```bash
cd server
npm install
npm run seed
```

คำสั่งนี้สร้าง admin เฉพาะเมื่อยังไม่มี username นี้อยู่แล้ว จึงรันซ้ำได้โดยไม่เปลี่ยนรหัสผ่านเดิม หลังจากนั้นใช้ `npm start` เพื่อเปิด API ได้ตามปกติ โดยระบบจะตรวจ seed ให้อีกครั้งตอนเริ่มทำงาน

---

## โครงสร้าง API (อ้างอิง)

ทุก endpoint ต้องแนบ `Authorization: Bearer <token>` ยกเว้น `/api/auth/*`

| Method | Path | คำอธิบาย |
|---|---|---|
| POST | `/api/auth/register` | สมัครสมาชิก `{username,password,code}` |
| POST | `/api/auth/login` | เข้าสู่ระบบ `{username,password}` → คืน `{token,username}` |
| GET | `/api/auth/me` | ข้อมูลผู้ใช้ปัจจุบัน |
| GET/POST | `/api/tasks` | รายการ / เพิ่ม Task |
| PUT/DELETE | `/api/tasks/:id` | แก้ไข / ลบ Task |
| GET/POST/PUT/DELETE | `/api/meetings` , `/api/notes` , `/api/followups` , `/api/monthlygoals` , `/api/weeklygoals` , `/api/holidays` | เหมือน tasks ทุกประการ |
| GET/PUT | `/api/config` | รายชื่อผู้รับผิดชอบ + หมวดหมู่ |

---

## รันทดสอบในเครื่องตัวเอง (ก่อน Deploy จริง)

```bash
cp server/.env.example server/.env  # แล้วแก้ MONGODB_URI, JWT_SECRET และ admin settings
npm install
npm install --prefix client
npm run dev               # เปิด frontend และ backend พร้อมกัน
```

ก่อนรัน ให้แก้ `client/config.js` ชั่วคราวเป็น `http://localhost:4000` จากนั้นเปิด frontend ที่ `http://localhost:5173`
ถ้าต้องการรันแยก ใช้ `npm run dev:client` หรือ `npm run dev:server` ได้

---

## ปัญหาที่พบบ่อย

- **หน้าเว็บขึ้น "เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ"** → เช็คว่า `client/config.js` ใส่ URL Render ถูกและไม่มี `/` ปิดท้าย, เช็คว่า Render service รันอยู่ (ดู Logs)
- **Login ไม่ได้ / CORS error ใน Console** → เช็คว่า `CORS_ORIGIN` ใน Render ตรงกับ URL ของ Vercel เป๊ะ ๆ (รวม https://)
- **ข้อมูลหาย/ไม่เจอวันหยุด** → วันหยุดจะถูก seed ให้อัตโนมัติแค่ครั้งแรกที่ฐานข้อมูลว่างเท่านั้น ถ้าอยากรีเซ็ต ให้ลบ collection `holidays` ใน MongoDB Atlas แล้ว restart service
- **อยากปิดไม่ให้คนนอกสมัครสมาชิกมั่ว** → ตั้งค่า `REGISTER_CODE` ใน Render แล้วแจ้งรหัสนี้เฉพาะทีมตัวเอง
