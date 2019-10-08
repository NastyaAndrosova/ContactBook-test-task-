import React                    from "react"
import * as PropTypes           from 'prop-types'
import {
	Input, InputAdornment, IconButton
}                               from "@material-ui/core"
import SearchIcon               from "@material-ui/icons/Search"
import EmptyLine                from '../EmptyLine'


const Search  = ({ searchString, handleSearchChange, handleClickOnSearch, handleKeyPress }) => {
	return (
		<React.Fragment>
			<Input
				type='text'
				placeholder='Поиск по именам'
				value={searchString}
				style={{width: '100%'}}
				onChange={handleSearchChange}
				onKeyPress={(e) => handleKeyPress(e)}
				endAdornment={
					<InputAdornment>
						{searchString.length > 2 ?
							<IconButton style={{ color: 'black' }} onClick={handleClickOnSearch}>
								<SearchIcon />
							</IconButton>
							: <EmptyLine/>
						}
					</InputAdornment>
				}
			/>
		</React.Fragment>
	)
};

Search.propTypes = {
	searchString: PropTypes.string,
	handleSearchChange: PropTypes.func,
	handleClickOnSearch: PropTypes.func,
	handleKeyPress: PropTypes.func
}
export default Search