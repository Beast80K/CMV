import dynamic from "next/dynamic";
const TemplateTransition = dynamic(() => import("../components/TemplateTransition/TemplateTransition"))




export default function Template({ children }) {
	return <TemplateTransition>
		{children}
	</TemplateTransition>
}

