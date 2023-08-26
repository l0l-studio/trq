import type { Request } from 'oak';
import { CorsOptionsDelegate, oakCors } from 'cors';

//https://deno.land/x/cors@v1.2.2
const whitelist = ['http://localhost:5173', 'http://localhost:3000'];

const corsOptionsDelegate: CorsOptionsDelegate<Request> = async (request) => {
    const isOriginAllowed = whitelist.includes(
        request.headers.get('origin') ?? '',
    ) || request.headers.get('user-agent').includes('insomnia');

    return { origin: isOriginAllowed }; //  Reflect (enable) the requested origin in the CORS response if isOriginAllowed is true
};

//export default oakCors({
//    origin: whitelist[0],
//});

export default oakCors(corsOptionsDelegate);
