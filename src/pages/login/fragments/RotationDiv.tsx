import { motion } from 'framer-motion'

type Props = {
	children: React.ReactNode
}

const RotationDiv: React.FC<Props> = ({children}) => {
	return (
		<motion.div
			key="login"
			initial={{
				opacity: 1,
				rotateY: 90,
			}}
			animate={{
				opacity: 1,
				rotateY: 0,
			}}
			transition={{ duration: 0.75, ease: "circIn" }}
			exit={{
				opacity: 1,
				rotateY: -90,
			}}
			className="flex items-center justify-center py-12"
		>
				{children}
		</motion.div>
	)
}

export default RotationDiv