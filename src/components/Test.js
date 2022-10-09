import React, { useState } from 'react'
import Box from '@mui/material/Box';

function Test() {
	const [newUsers, setNewUsers] = useState(10)
	const [newAdmins, setNewAdmins] = useState(10)
	const [revenue, setRevenue] = useState(10000)
	 const [revenueData, setRevenueData] = useState()
  return (
	  <>
		<Box sx={{ display: "flex", justifyContent: "space-between", width: "80%", marginX: "auto"}}>
			<Card title="New users this month" value={newUsers} />
			<Card title="New admins this month" value={newAdmins} />
			<Card title="Total revenue ($)" value={revenue} />
		</Box>
		<Box sx={{width: "80%", marginX: "auto", border: "1px solid black"}}>
			Pie chart goes here
		</Box>
	  </>
  )
}

function Card({title, value}) {
	return (
		<Box sx={{border: "1px solid black"}}>
			{title}: {value}
		</Box>
	)
}

export default Test