import client from "../../lib/prisma";

export const prerender = false;

export const GET = async ({params}: {params: {link: string}}) => {
    const link = await client.link.findUnique({
        where: {
            id: params.link
        },
    });
    // if the link is not found, return a 404
    if (!link) return new Response(
        JSON.stringify({
            error: "Not Found",
        }),
        {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    // redirect to the link
    return new Response(null, {
        status: 302,
        headers: {
            Location: link.url,
        },
    });
};
