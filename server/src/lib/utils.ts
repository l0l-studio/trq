import { Context, Router } from 'oak';

export function respondWithError(
    ctx: Context,
    code: number,
    data: { error: string },
) {
    ctx.response.status = code;
    ctx.response.type = 'application/json';
    ctx.response.body = data;
}

export function respondWithData<T>(
    ctx: Context,
    code: number,
    data: { data: Record<string, T> },
) {
    ctx.response.status = code;
    ctx.response.type = 'application/json';
    ctx.response.body = data;
}
