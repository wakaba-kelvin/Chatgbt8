import pino from "pino";

const Logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid, hostname',
        },
    },
});

export default Logger;