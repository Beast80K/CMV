const Container = ({ children, classNames }) => {
	return (
		<div className={`p-4 min-h-screen  ${classNames}`}>
			{children}
		</div>
	)
}

export default Container