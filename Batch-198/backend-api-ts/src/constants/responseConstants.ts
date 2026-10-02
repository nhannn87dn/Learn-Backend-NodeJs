// responseConstants.ts
export interface Status {
    statusCode: number;
    message: string;
}

export const SUCCESS = {
    OK: { statusCode: 200, message: 'Success' } as Status,
    CREATED: { statusCode: 201, message: 'Resource created successfully' } as Status,
};

export const ERROR = {
    BAD_REQUEST: { statusCode: 400, message: 'Bad request' } as Status,
    UNAUTHORIZED: { statusCode: 401, message: 'Unauthorized' } as Status,
    FORBIDDEN: { statusCode: 403, message: 'Forbidden' } as Status,
    NOT_FOUND: { statusCode: 404, message: 'Resource not found' } as Status,
    SERVER_ERROR: { statusCode: 500, message: 'Internal server error' } as Status,
};

/**
 * Bổ sung các trạng thái khác theo nhu cầu
 * 
 * */
