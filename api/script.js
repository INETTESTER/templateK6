import http from 'k6/http';

export function ran() {
    const url = "https://www.ran-demon.com/Ranking";
    const res = http.get(url);
    const url2 = "https://www.ran-demon.com/Ranking";
    const res2 = http.get(url2);

    // วิธีที่ 2: ใช้ RegEx เพื่อดึง path จาก URL
    const path = url.replace(/^https?:\/\/[^\/]+/, ''); // ลบส่วนของ protocol (http:// หรือ https://)

    //console.log('Path: ' + path); // แสดง path ที่ดึงออกมา

    return res
}
