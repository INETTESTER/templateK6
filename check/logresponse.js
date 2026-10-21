export function response_check(response) {
    if (!response || response.status == null || response.status == 0) {
        return;
    }

    if (response.status < 200 || response.status >= 300) {
        console.error(`HTTP Status: ${response.status} | Response: ${response.body}`);
    }
}