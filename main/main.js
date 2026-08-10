//=============================== import API =================================
import { sleep, scenario, error_check, options } from '../config/common.js';
export { options }; const cid = __ENV.cid || '1'; let response;
import { DownloadFile, GetProfile, PostProfile, PostProfile_2, PostProfile_3, UploadFile } from '../api/example.js';

//============================================================================

export default function () {    //เรียกใช้ API ใน export default function
  response = GetProfile()
  //response = PostProfile()
  //response = PostProfile_2()
  //response = PostProfile_3(scenario)
  //response = DownloadFile()
  //response = UploadFile()
  //response = UploadFile_2()


  error_check(response);
  sleep(1)
}