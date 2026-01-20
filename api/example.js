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















// import { SharedArray } from 'k6/data';

// const data = new SharedArray('payment_transaction_no', function () {
//     return JSON.parse(open('../file/1.json')).payment_transaction_no;
// });

// export function callback_scb(scenario) {
//     const payment_transaction_no = data[scenario.iterationInTest];
//     const url = 'https://example.com/post';


//     const payload = JSON.stringify({
//         payment_transaction_no: payment_transaction_no,
//     });

//     const params = {
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     };

//     const response = http.post(url, payload, params);

//     //console.log(response.body);
//     return response
// }
