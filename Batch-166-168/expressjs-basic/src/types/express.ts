export interface TCustomRequest extends Request {
    user: { id: number; name: string };
}