const user = Number(__ENV.user || 1);
const durationx = Number(__ENV.durationx || 1);
const scenariox = Number(__ENV.scenariox || 1);


const vusx = Math.ceil(user / durationx);

let options;

if (scenariox === 1) {
    // Per VU Iterations
    options = {
        http: {
            timeout: '300s',
        },
        insecureSkipTLSVerify: true,
        discardResponseBodies: false,

        scenarios: {
            contacts: {
                executor: 'per-vu-iterations',
                vus: vusx,
                iterations: durationx,
                maxDuration: '10m',
                gracefulStop: '120s',
            },
        },
    };
}

else if (scenariox === 2) {
    // Constant VUs
    options = {
        http: {
            timeout: '300s',
        },
        insecureSkipTLSVerify: true,

        vus: user,
        duration: `${durationx}s`,
        gracefulStop: '120s',
    };
}

else if (scenariox === 3) {
    // Constant Arrival Rate
    options = {
        http: {
            timeout: '300s',
        },
        insecureSkipTLSVerify: true,

        scenarios: {
            example_scenario: {
                executor: 'constant-arrival-rate',
                rate: user,
                timeUnit: `${durationx}s`,
                preAllocatedVUs: user,
                duration: `${durationx}s`,
                gracefulStop: '120s',
            },
        },
    };
}

else {
    // Default
    options = {
        insecureSkipTLSVerify: true,
        discardResponseBodies: true,

        scenarios: {
            contacts: {
                executor: 'per-vu-iterations',
                vus: vusx,
                iterations: durationx,
                maxDuration: '10m',
            },
        },
    };
}

export { options };