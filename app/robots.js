import GetCananicalURL from "./utils/URL/GetCananicalURL";

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/error', '/maintenance', '/global-error', '/not-found'],
        },
        sitemap: GetCananicalURL(),
    }
}