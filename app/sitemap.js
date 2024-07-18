import GetCananicalURL from "./utils/URL/GetCananicalURL";

export default function sitemap() {
	let PagesObj = [
		{
			url: GetCananicalURL(),
			lastModified: new Date(),
			changeFrequency: `always`,
			priority: 1,
		},
		{
			url: `${GetCananicalURL()}/about-us`,
			lastModified: new Date(),
			changeFrequency: `daily`,
			priority: 0.5,
		},
		{
			url: `${GetCananicalURL()}/attributions`,
			lastModified: new Date(),
			changeFrequency: `never`,
			priority: 0.5,
		},
		{
			url: `${GetCananicalURL()}/categories`,
			lastModified: new Date(),
			changeFrequency: `always`,
			priority: 0.6,
		},
		{
			url: `${GetCananicalURL()}/coins`,
			lastModified: new Date(),
			changeFrequency: `always`,
			priority: 0.9,
		},
		{
			url: `${GetCananicalURL()}/contact-us`,
			lastModified: new Date(),
			changeFrequency: `yearly`,
			priority: 0.5,
		},
		{
			url: `${GetCananicalURL()}/cookies-policy`,
			lastModified: new Date(),
			changeFrequency: `monthly`,
			priority: 0.5,
		},
		{
			url: `${GetCananicalURL()}/derivatives`,
			lastModified: new Date(),
			changeFrequency: `always`,
			priority: 0.8,
		},
		{
			url: `${GetCananicalURL()}/disclaimer`,
			lastModified: new Date(),
			changeFrequency: `yearly`,
			priority: 0.5,
		},
		{
			url: `${GetCananicalURL()}/exchanges`,
			lastModified: new Date(),
			changeFrequency: `always`,
			priority: 0.7,
		},
		{
			url: `${GetCananicalURL()}/faqs`,
			lastModified: new Date(),
			changeFrequency: `monthly`,
			priority: 0.5,
		},

		{
			url: `${GetCananicalURL()}/licenses`,
			lastModified: new Date(),
			changeFrequency: `yearly`,
			priority: 0.5,
		},
		{
			url: `${GetCananicalURL()}/nfts`,
			lastModified: new Date(),
			changeFrequency: `always`,
			priority: 0.9,
		},
		{
			url: `${GetCananicalURL()}/privacy-policy`,
			lastModified: new Date(),
			changeFrequency: `monthly`,
			priority: 0.5,
		},
		{
			url: `${GetCananicalURL()}/project-details`,
			lastModified: new Date(),
			changeFrequency: `never`,
			priority: 0.5,
		},
		{
			url: `${GetCananicalURL()}/search`,
			lastModified: new Date(),
			changeFrequency: `always`,
			priority: 0.9,
		},
		{
			url: `${GetCananicalURL()}/terms-of-service`,
			lastModified: new Date(),
			changeFrequency: `weekly`,
			priority: 0.5,
		},
		{
			url: `${GetCananicalURL()}/terms-of-use`,
			lastModified: new Date(),
			changeFrequency: `weekly`,
			priority: 0.5,
		},
		{
			url: `${GetCananicalURL()}/watchlist`,
			lastModified: new Date(),
			changeFrequency: `always`,
			priority: 0.9,
		},
	];

	return PagesObj;
}
