export default {
    async fetch(request, env, ctx) {
        return new Response("VIREN PATADIYA from this side!", {
            headers: { "content-type": "text/plain" },
        });
    },
};