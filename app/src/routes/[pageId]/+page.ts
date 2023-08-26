import type { PageLoad } from './$types';

//TODO: figure out why ssr breaks fetch
export const ssr = false;

export const load: PageLoad = async function(request) {
    const { params, fetch } = request;
    const { pageId } = params;

    try {
        const pageRes = await fetch(`http://localhost:8080/api/v1/pages/rXihjfd7b1Q8v7Vd2zhgyU`);
        const page = await pageRes.json();
        const userRes = await fetch(`http://localhost:8080/api/v1/users/${page.data.authorId}`);
        const user = await userRes.json();

        return {
            user: { ...user.data }
        }
    } catch (err) {
        console.log('the error WHYY', err.cause);
        return {
            user: null
        }
    }
};
