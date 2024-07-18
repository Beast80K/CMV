'use client'
import { motion } from 'framer-motion'
const TransitionDiv = ({ children }) => {
	return (
		<motion.div
			initial={{ x: 0, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.8 }}
		>
			{children}
		</motion.div>
	)
}

export default TransitionDiv