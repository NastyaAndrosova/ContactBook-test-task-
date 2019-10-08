import React                     from "react"
import * as PropTypes            from 'prop-types'
import { withStyles }            from '@material-ui/core/styles'
import Sort                      from './Sort'
import Search                    from './Search'
import TablePagination           from '@material-ui/core/TablePagination'

const styles = () => ({
	userContainer: {
		width: '100%',
		boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
		zIndex: '1',
		padding: '10px'
	},
	column: {
		fontSize: '20px',
		listStyleType: 'none',
		paddingTop: '13px',
		cursor: 'pointer',
		borderBottom: '1px solid black'
	}

});

class User extends  React.Component {
	constructor(props) {
		super(props);

		this.state = {
			total: 0,
			page: 0,
			itemsPerPage: 12,
			autoResults: []
		}

	}

	handleChangePage = (e, page) => {
		this.setState({page})
	};


	handleChangeItemsPerPage = (e) => {
		this.setState({ itemsPerPage: e.target.value })
	};

	render() {
		const { page, itemsPerPage } = this.state;
		const {
			classes, userList, sort, searchString, handleSearchChange,
			handleClickOnSearch, filteredUserList, handleUserClick,
			handleKeyPress
		} = this.props;

		return (
			<React.Fragment>
				<div className={classes.userContainer}>
					<div>
						<Sort
							userList={userList}
							sort={sort}
						/>
						<Search
							searchString={searchString}
							handleSearchChange={handleSearchChange}
							handleClickOnSearch={handleClickOnSearch}
							handleKeyPress={handleKeyPress}
						/>
					</div>
					{ filteredUserList.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map((item, idx) => {
						return (
							<div key={idx} className={classes.column}
							     onClick={(e) => handleUserClick(e, idx)}>{item.name}</div>
						)})
					}
					<TablePagination
						component='div'
						count={filteredUserList.length}
						rowsPerPage={itemsPerPage}
						rowsPerPageOptions={[12, 35, 50, 100, 500]}
						labelRowsPerPage='стр'
						labelDisplayedRows={({from, to, count}) => `${from}-${to} из ${count}`}
						page={page}
						backIconButtonProps={{'aria-label': 'Previous Page'}}
						nextIconButtonProps={{'aria-label': 'Next Page'}}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={(e) => this.handleChangeItemsPerPage(e)}
					/>
				</div>
			</React.Fragment>
		)

	}
}
User.propTypes = {
	classes: PropTypes.object.isRequired,
	userList: PropTypes.array.isRequired,
	sort: PropTypes.func,
	searchString: PropTypes.string,
	handleSearchChange: PropTypes.func,
	handleClickOnSearch: PropTypes.func,
	filteredUserList: PropTypes.array.isRequired,
	handleUserClick: PropTypes.func
};
export default(withStyles(styles)(User) );