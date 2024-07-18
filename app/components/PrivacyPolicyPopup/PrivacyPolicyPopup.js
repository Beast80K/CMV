"use client";
import { ZustandStore } from "@/app/store/store";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

const PrivacyPolicyPopup = () => {
	const { StorePrivacyPolicyShown, SetPrivacyPolicyShown, StoreHydrated } =
		ZustandStore(useShallow((state) => state));
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		StoreHydrated && !StorePrivacyPolicyShown
			? toast(
				<div className="text-tiny font-Noto p-4  print:hidden">
					<div className="flex flex-row gap-2 items-center mb-2">
						<BsInfoCircle size={14} />
						<p className="font-bold font-Noto">
							We would like to inform you,
						</p>
					</div>
					<ul className="list-disc mb-4">
						<li className="ml-4 mb-2">
							Double click on a row to go to details page of that item.
						</li>
						<li className="ml-4 mb-2">
							This website stores settings data (Langauge,
							Theme, Currency etc.) in your browser for user
							experience purpose.
						</li>
						<li className="ml-4 mb-2">
							We do not store, track, gather or share any
							details about the user.
						</li>
						<li className="ml-4 mb-2">
							This is a Non-commercial, personal project &
							should not be used for real-world applications.
						</li>
						<li className="ml-4 mb-2">
							We don't guarantee accuracy, timely delivery or
							error free data (because of decimal conversion 0.9813% ~ 0.98% or 0.99%).
						</li>
						<li className="ml-4 mb-2">
							Before using this website, you should read our{" "}
							<Link
								className="text-primary"
								href="/disclaimer"
							>
								Disclaimer
							</Link>
							,{" "}
							<Link
								className="text-primary"
								href="/privacy-policy"
							>
								Privacy Policy
							</Link>
							,{" "}
							<Link
								className="text-primary"
								href="/cookies-policy"
							>
								Cookie Policy
							</Link>
							,{" "}
							<Link className="text-primary" href="/faqs">
								FAQs
							</Link>
							,{" "}
							<Link
								className="text-primary"
								href="/terms-of-service"
							>
								Terms Of Service
							</Link>
							,{" "}
							<Link
								className="text-primary"
								href="/terms-of-use"
							>
								Terms Of Use
							</Link>{" "}
							etc.
						</li>
						<li className="ml-4 mb-2">
							As this is a personal project, data is cached for around 10-60 minutes or more, if you want to see latest data please go to <Link
								size="sm"
								className="text-primary text-tiny"
								aria-label="Coin Gecko dot com"
								isExternal={true}
								showAnchorIcon={true}
								href="https://www.coingecko.com"
							>
								CoinGecko
							</Link>, we are not sponsored by them.
						</li>
					</ul>

					<Button
						size="sm"
						radius="sm"
						color="primary"
						fullWidth={true}
						variant="solid"
						className="text-white"
						onClick={() => {
							toast.dismiss();
							SetPrivacyPolicyShown(true);
						}}
					>
						OK
					</Button>
				</div>,
				{
					id: "PrivacyPolicyPopup",
					position: "bottom-center",
					duration: 15000,
					theme: resolvedTheme,
					classNames: {
						toast: "bg-secondary rounded-lg shadow-lg  print:hidden",
					},
					unstyled: true,
					onAutoClose: (t) => SetPrivacyPolicyShown(true),
				}
			)
			: null;
	}, [StoreHydrated]);
};

export default PrivacyPolicyPopup;
