import { Snippet } from "@nextui-org/react"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { FaRegCopy } from "react-icons/fa6"



const SnippetRenderer = (params) => {
	return <Snippet hideSymbol={true}
		radius='sm'
		ref={(ref) => {
			if (!ref) return;

			ref.onclick = (e) => {
				e.stopPropagation();
			};
		}}
		size='sm'
		color='secondary'
		variant='flat'
		copyIcon={<FaRegCopy />}
		checkIcon={<BsFillCheckCircleFill />}
		className='text-tiny bg-secondary text-primary'
		codeString={params.data.id}
		tooltipProps={
			{
				showArrow: true,
				size: "sm",
				content: "Copy ID for " + params.data.name
			}
		}
	>
		{params.data.id}
	</Snippet>
}

export default SnippetRenderer