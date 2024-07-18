import Capitalized from "./Text/Capitalized";


export default function HeaderAccesorMaker({ RemoveKeys = [], Data = {}, RightPin = [], LeftPin = [], HiddenKeys = [], SrNo = true, } = {}) {


	if (Data) {

		let ColumnDefs = [

			{
				...(SrNo ? {
					headerName: "Sr. No.",
					sortable: false,
					field: "sr_no",
					width: 80,

					valueGetter: "node.rowIndex + 1",
					pinned: RightPin.includes('sr_no') ? 'right' : LeftPin.includes('sr_no') ? 'left' : false,
				} : {})
			},




			...Object.keys(Data).filter(f => !RemoveKeys.includes(f)).map(v => {
				return {
					headerName: Capitalized(v),
					field: v,
					hide: HiddenKeys.includes(v),
					pinned: RightPin.includes(v) ? 'right' : LeftPin.includes(v) ? 'left' : false,
				}

			})]


		return ColumnDefs
	}
	else {
		return []
	}

}

// export default HeaderAccessorMaker