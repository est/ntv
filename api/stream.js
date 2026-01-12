export const config = {
    api: {
        bodyParser: false,
    },
};

const ANSI_COLORS = [
    '\x1b[31m', // Red
    '\x1b[32m', // Green
    '\x1b[33m', // Yellow
    '\x1b[34m', // Blue
    '\x1b[35m', // Magenta
    '\x1b[36m', // Cyan
    '\x1b[91m', // Bright Red
    '\x1b[92m', // Bright Green
    '\x1b[93m', // Bright Yellow
    '\x1b[94m', // Bright Blue
    '\x1b[95m', // Bright Magenta
    '\x1b[96m', // Bright Cyan
];

const RESET = '\x1b[0m';

function randomColor() {
    return ANSI_COLORS[Math.floor(Math.random() * ANSI_COLORS.length)];
}

export default async function handler(req, res) {
    if (req.method !== 'PUT' && req.method !== 'POST') {
        res.status(405).send('Method Not Allowed. Use PUT or POST with streaming data.\n');
        return;
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    let buffer = '';

    req.on('data', (chunk) => {
        buffer += chunk.toString();

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
            if (line) {
                const color = randomColor();
                res.write(`${color}${line}${RESET}\n`);
            } else {
                res.write('\n');
            }
        }
    });

    req.on('end', () => {
        if (buffer) {
            const color = randomColor();
            res.write(`${color}${buffer}${RESET}\n`);
        }
        res.end();
    });

    req.on('error', (err) => {
        console.error('Request error:', err);
        res.end();
    });
}
