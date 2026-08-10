import http from 'k6/http';


export function GetProfile() {  //GET
    const url = "https://script.google.com/macros/s/AKfycbwxf5AMB9on1zMhy63ej8gG82Dnrx40gPnSVvFK8VFExBXXi3zQEx1pC69v3-jniOLV/exec";
    const response = http.get(url);
    console.log('Response body:', response.body);
    return response
}

export function DownloadFile() {   //GET API downloadfile
    const url = 'https://script.google.com/macros/s/AKfycbx9AuSrZstWI9Lpda53GVaPWS91U8KmwqXcART8hNDb_GF7LZLsJh19MlMBHwQCeMnV/exec?fileId=19FJQScEoYGYVI-tFJpoDdJK9rbXbBkvN';
    const response = http.get(url);
    console.log('Response body:', response.body);
    return response;
}

export function PostProfile() {  //POST
    const url = 'https://script.google.com/macros/s/AKfycbwqpZiqUt4KI0H_MDlxcobPEVGBkz9ONNwcE5yNQahLcUWNIY9HpjMInQr0WvZMv-1g/exec';

    const payload = JSON.stringify({
        id: 4,
        name: 'Frank',
        email: 'frank@test.com',
        role: 'user',
        status: 'active',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);
    console.log('Response body:', response.body);
    return response;
}

export function PostProfile_2() {  //POST กรณี id ไม่ซ้ำ (ไม่มีกำหนดว่ากี่หลัก)
    const url = 'https://script.google.com/macros/s/AKfycbwqpZiqUt4KI0H_MDlxcobPEVGBkz9ONNwcE5yNQahLcUWNIY9HpjMInQr0WvZMv-1g/exec';
    const id = `${__VU}${__ITER}`;  // รันเลข id ด้วยเลข VU กับ ITER  เช่น 10,20,30
    const payload = JSON.stringify({
        id: id,    // ดึง id มาใช้
        name: 'Frank',
        email: 'frank@test.com',
        role: 'user',
        status: 'active',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);
    console.log('Response body:', response.body);
    return response;
}


import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
const data = new SharedArray('id', function () { ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
    return JSON.parse(open('../file/data.json')).id; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
});
export function PostProfile_3(scenario) {  ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
    const id = data[scenario.iterationInTest];
    const url = 'https://script.google.com/macros/s/AKfycbwqpZiqUt4KI0H_MDlxcobPEVGBkz9ONNwcE5yNQahLcUWNIY9HpjMInQr0WvZMv-1g/exec';
    const payload = JSON.stringify({
        id: id,    // ดึง id มาใช้
        name: 'Frank',
        email: 'frank@test.com',
        role: 'user',
        status: 'active',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);
    console.log('Response body:', response.body);
    return response;
}


import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';
const imgPath = open('../file/งานนำเสนอไม่มีชื่อ.pdf', 'b');  //ไฟล์ที่จะ upload
export function UploadFile() {  ///POST API UploadFile
    const url = 'https://uat-agi.manageai.co.th/api/v1/file';

    const formData = new FormData();
    formData.append('file', http.file(imgPath, 'pdf.pdf', 'application/pdf'));

    const headers = {
        'Content-Type': `multipart/form-data; boundary=${formData.boundary}`,
    };

    const response = http.post(url, formData.body(), { headers });
    console.log('Response body:', response.body);
    return response;
}


const fileData = http.file(open('../file/งานนำเสนอไม่มีชื่อ.pdf'), 'งานนำเสนอไม่มีชื่อ.pdf');
export function UploadFile_2() {  ///POST API UploadFile
    const url = 'https://ncds-prevention.buddy-care.org/service/api/v1/patients/excel';
    const payload = {
        file: fileData,
    };
    const params = {
        headers: {
            'Cookie': '' + token
        },
    };
    const response = http.post(url, payload, params);
    console.log(response.body); // log response body
    return response; // return the response object
}






