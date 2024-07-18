'use client'
import { motion } from 'framer-motion'
const TemplateTransition = ({ children }) => {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: -50 },
				visible: { opacity: 1, y: 0 },
			}}
			initial="hidden"
			animate="visible"
			transition={{
				duration: 0.8,
				delay: 0.15,
				type: "spring",
				staggerChildren: 0.2,
				stiffness: 75,
				staggerDirection: 1,
				restSpeed: 1,
			}}
		>
			{children}
		</motion.div>
	)
}

export default TemplateTransition