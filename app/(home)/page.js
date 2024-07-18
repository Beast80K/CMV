import dynamic from "next/dynamic";
import GetCananicalURL from "../utils/URL/GetCananicalURL";

const TrendingSection = dynamic(() => import("@/app/components/Trending/TrendingSection"))
const BTCtoCurrencySection = dynamic(() => import("@/app/components/BTCtoCurrencySection/BTCtoCurrencySection"))
const CompareCoinsSection = dynamic(() => import("@/app/components/CompareCoinsSection/CompareCoinsSection"))



export default function Home() {
	return (
		<main className="flex flex-col gap-4">
			<TrendingSection />
			<BTCtoCurrencySection />
			<CompareCoinsSection />
		</main>
	);
}
