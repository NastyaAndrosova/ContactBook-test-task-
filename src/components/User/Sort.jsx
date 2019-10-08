import React                   from "react"
import Button                  from '@material-ui/core/Button'


const Sort = ({ sort }) => {
	return (
		<React.Fragment>
			<Button color='primary' onClick={sort}> Отсортировать по алфавиту </Button>
		</React.Fragment>
	)
}
export default Sort