import { RateLimiter } from "limiter";

export const APILimiter = new RateLimiter({
	tokensPerInterval: 10,
	interval: 'min',
	fireImmediately: 'true'
})

export const TokenRemover = async () => {
	let Remaining = await APILimiter.removeTokens(1)
	return Remaining
}