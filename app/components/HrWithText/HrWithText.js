'use client'


const HrWithText = ({ Text, TextALignment, Icon }) => {
	return (


		<div className={`flex items-center gap-4 justify-between ${TextALignment === 'right' ? "flex-row-reverse" : ""}`}>
			{
				TextALignment === 'center'
					?
					<>
						<div className='flex-grow'>
							<hr />
						</div>
						<div>
							<div className='flex gap-2 items-center'>
								{Icon ? Icon : null}
								<b>{Text}</b>
							</div>

						</div>

						<div className='flex-grow'>
							<hr />
						</div>
					</>
					:
					<>
						<div>
							<div className='flex gap-2 items-center'>
								{Icon ? Icon : null}
								<b>{Text}</b>
							</div>

						</div>

						<div className='flex-grow'>
							<hr />
						</div>
					</>
			}

		</div>

	)
}

export default HrWithText