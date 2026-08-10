import http from 'k6/http';

const filename = __ENV.filename || "Hello";
const date = __ENV.date || "Hello";
const id = __ENV.id || "1";
const google_link = __ENV.google_link || "1";
const user = __ENV.user || "1";
const durationx = __ENV.durationx || "1";
const projectname = __ENV.projectname || "1";

const reportPath = `../report/${date}/${filename}.json`;
const jsonData = open(reportPath);

export default function () {
  const startIndex = google_link.indexOf('/d/') + 3;
  const endIndex = google_link.indexOf('/edit');
  const spreadsheetID = google_link.substring(startIndex, endIndex);

  const data = JSON.parse(jsonData);

  const avgIterationDuration = data.metrics.http_req_duration.avg;
  const minIterationDuration = data.metrics.http_req_duration.min;
  const maxIterationDuration = data.metrics.http_req_duration.max;
  const pnineone = data.metrics.http_req_duration["p(90)"];
  const pninefive = data.metrics.http_req_duration["p(95)"];
  const request = data.metrics.http_reqs.count;
  const http_reqs_passes = data.metrics.http_req_failed.passes;
  const tps = (data.metrics.http_reqs.rate).toFixed(2);
  const testtime = Math.ceil(request / tps);

  const avg = (avgIterationDuration / 1000).toFixed(2);
  const min = (minIterationDuration / 1000).toFixed(2);
  const max = (maxIterationDuration / 1000).toFixed(2);
  const p90 = (pnineone / 1000).toFixed(2);
  const p95 = (pninefive / 1000).toFixed(2);

  const check = data.root_group && data.root_group.checks ? data.root_group.checks : {};

  const e200 = check['200 OK'] ? check['200 OK'].passes : 0;
  const e201 = check['201 Created'] ? check['201 Created'].passes : 0;
  const e204 = check['204 No Content'] ? check['204 No Content'].passes : 0;
  const e400 = check['400 Bad Request'] ? check['400 Bad Request'].passes : 0;
  const e401 = check['401 Unauthorized'] ? check['401 Unauthorized'].passes : 0;
  const e403 = check['403 Forbidden'] ? check['403 Forbidden'].passes : 0;
  const e404 = check['404 Not Found'] ? check['404 Not Found'].passes : 0;
  const e422 = check['422 Unprocessable Content'] ? check['422 Unprocessable Content'].passes : 0;
  const e429 = check['429 Too Many Requests'] ? check['429 Too Many Requests'].passes : 0;
  const e500 = check['500 Internal Server Error'] ? check['500 Internal Server Error'].passes : 0;
  const e502 = check['502 Bad Gateway'] ? check['502 Bad Gateway'].passes : 0;
  const e503 = check['503 Service Unavailable'] ? check['503 Service Unavailable'].passes : 0;
  const e504 = check['504 Gateway Timeout'] ? check['504 Gateway Timeout'].passes : 0;

  const unknown = request - (e200 + e201 + e204 + e400 + e401 + e403 + e404 + e422 + e429 + e500 + e502 + e503 + e504);
  const error = http_reqs_passes;
  const sumerror = error - (unknown + e400 + e401 + e403 + e404 + e422 + e429 + e500 + e502 + e503 + e504);
  const finalunknown = unknown + sumerror;

  const now = new Date();
  const startTime = new Date(now.getTime() - (testtime * 1000));
  const endTime = new Date(now.getTime());

  console.log("API: " + projectname);
  console.log("ID: " + id);
  console.log("==============================");
  console.log(`Request: ${request}`);

  const checks = data.root_group.checks;
  const filteredPasses = Object.keys(checks)
    .filter((key) => checks[key].passes > 0)
    .map((key) => ({
      status: key,
      passes: checks[key].passes
    }));

  filteredPasses.forEach((item) => {
    if (item.status === "200 OK" || item.status === "201 Created" || item.status === "204 No Content") {
      console.log(`✅ ${item.status}: ${item.passes}`);
    } else {
      console.log(`❌ ${item.status}: ${item.passes}`);
    }
  });

  if (error != 0) {
    if (finalunknown != 0) {
      console.log("❓ Unknown errors : " + finalunknown);
    }
    console.log("⭐ Number of errors : " + error);
  }

  const sheetDB = 'https://script.google.com/macros/s/AKfycbzbMajrXU7q7t08h_iG22gukrzXmyHZnlOxaU30jNUXP0HlsbgB2bAdJM3MmjubZkR_/exec?action=insertsummary';
  const payload2 = {
    projectname: projectname,
    request: request,
    date: date,
    start: formatTime(startTime),
    end: formatTime(endTime),
    average: avg,
    min: min,
    max: max,
    p90: p90,
    p95: p95,
    tps: tps,
    error: error,
    id: id,
    e400: e400,
    e401: e401,
    e403: e403,
    e404: e404,
    e422: e422, // ✅ ส่งเข้า sheet
    e429: e429,
    e500: e500,
    e502: e502,
    e503: e503,
    e504: e504,
    eunknow: finalunknown,
    vus: user,
    duration: durationx
  };

  const params2 = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(sheetDB, JSON.stringify(payload2), params2);

  let urlgetdata = 'https://script.google.com/macros/s/AKfycbzbMajrXU7q7t08h_iG22gukrzXmyHZnlOxaU30jNUXP0HlsbgB2bAdJM3MmjubZkR_/exec?action=getdata';
  let paramsgetdata = {
    headersgetdata: {
      'Content-Type': 'application/json'
    },
  };
  let payloadgetdata = JSON.stringify({
    projectnames: projectname,
    sheetid: spreadsheetID,
  });

  http.post(urlgetdata, payloadgetdata, paramsgetdata);
}

function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}