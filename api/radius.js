import radius from 'k6/x/radius';

export const options = {
  vus: 100, // จำลองคนล็อกอินพร้อมกัน 100 คน
  duration: '30s',
};

export default function () {
  // ยิงแพ็กเกจตรวจสอบสิทธิ์ไปยัง RADIUS Server ผ่าน UDP พอร์ต 1812
  radius.auth({
    server: '192.168.1.50:1812',
    secret: 'my_shared_secret_key', // คีย์เชื่อมต่อระหว่าง AP กับ RADIUS
    username: `user_${__VU}`,       // สุ่มเปลี่ยน user ตาม ID ของคนเทส
    password: 'password123',
  });
}