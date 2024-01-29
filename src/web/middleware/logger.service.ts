import winston, {format} from 'winston';
import morgan from 'morgan';

const logger = winston.createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf((msg) => {
            return `${msg.timestamp} [${msg.level}] ${msg.message}`
        })
    ),
    transports: [new winston.transports.Console({level: 'http'})],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: format.simple(),
        })
    )
}

export const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            write: (message) => logger.http(message.trim()),
        },
    }
);