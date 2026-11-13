
import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
import { SharedArray } from 'k6/data';

// Cargar usuarios desde el archivo CSV
const users = new SharedArray('usuarios', function () {
    const csv = open('../data/usuarios-validos.csv');
    return csv.trim().split('\n').slice(1).map(line => {
        const [username, password] = line.trim().split(',');
        return {
            username: username.trim(),
            password: password.trim()
        };
    });
});

// Métrica de errores funcionales
const loginFailures = new Rate('login_failures');

export const options = {
    scenarios: {
        login_load: {
            executor: 'constant-arrival-rate',
            rate: 21,
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 25,
            maxVUs: 50
        }
    },
    thresholds: {
        http_req_duration: ['p(95)<1500'],
        login_failures: ['rate<0.03'],
        dropped_iterations: ['count==0']
    }
};

export default function () {
    const user = users[__ITER % users.length];

    const url = 'https://fakestoreapi.com/auth/login';

    const payload = JSON.stringify({
        username: user.username,
        password: user.password
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: '60s'
    };

    const response = http.post(url, payload, params);

    let validLogin = false;

    try {
        const body = response.json();
        validLogin = response.status === 201 &&
    typeof body.token === 'string' &&
    body.token.length > 0;
    } catch (error) {
        validLogin = false;
    }

    check(response, {
        'HTTP status 201': (r) => r.status === 201,
        'Login devuelve token': () => validLogin
    });

    loginFailures.add(!validLogin);
}
