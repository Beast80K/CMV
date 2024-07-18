import ToMsec from "../Time/ToMsec";

export default function FetchingOptions(Interval) {
	return {
		refreshInterval: ToMsec(Interval),
		revalidateOnFocus: false,
		revalidateIfStale: true,
		keepPreviousData: true,
		revalidateOnReconnect: true,
		shouldRetryOnError: true,
		dedupingInterval: 5000,
		errorRetryCount: 3,
		loadingTimeout: 15000,
		errorRetryInterval: 5000,
		refreshWhenOffline: false,
		refreshWhenHidden: true,

	}
}