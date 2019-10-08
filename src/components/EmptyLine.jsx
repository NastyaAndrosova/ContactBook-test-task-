import React      from 'react'
import Typography from '@material-ui/core/Typography'

//renders when component should nothing display (in condition)
const EmptyLine = () => {
	return (
		<Typography component='p'>&nbsp;</Typography>
	)
}

export default EmptyLine