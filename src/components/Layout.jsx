import React                 from 'react'
import * as PropTypes        from 'prop-types'
import clsx                  from 'clsx'
import { withStyles }        from '@material-ui/core/styles'
import {
	Drawer, CssBaseline, AppBar,
	Toolbar, Typography,
	IconButton
}                            from '@material-ui/core'
import MenuIcon              from '@material-ui/icons/Menu'
import ChevronLeftIcon       from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon      from '@material-ui/icons/ChevronRight'
import User                  from './User/User'
import UserInfo              from "./DataUser/UserInfo"
import axios                 from "axios"
import {
	storeValueIntoStorage,
	getValueFromStorage
}                            from '../services/utils'

const drawerWidth = 340;

const styles = theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
});

class MainDrawer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: true,
			userList: [],
			filteredUserList: [],
			curUser: [],
			infoActive: false,
			userFormActive: false,
			searchString: '',
			copy: []
		};
	}

	componentDidMount() {
		this.userListFetch().then( ()=> {
			return (
				this.setState({
					//all contacts and changes associated with them are stored in localstorage
					userList: getValueFromStorage('contacts'),
					filteredUserList: getValueFromStorage('contacts')
				})
			)
		})
	}

	//all contacts set in local storage
	userListFetch = () => {
		return new Promise((resolve) => {
			axios.get('http://demo.sibers.com/users')
				.then( (response) => {
					// handle success
					this.setId(response.data).then(()=> {
						return (
							getValueFromStorage('contacts') ? null : storeValueIntoStorage('contacts', response.data)
						)
					});
					resolve(response.data)
				})
				.catch(function (error) {
					// handle error
					console.error(error)
				})
		})
	};


	handleUserClick = (e, i) => {
		this.setState({curUser: this.state.filteredUserList[i], infoActive: true})
	};

	//id will determine which User was clicked to edit
	setId = (array) => {
		return new Promise((resolve) => {
			array.map((item, i) => item['id'] = i + 1);
			resolve()
		})
	};

	editUser = () => {
		this.setState({
			userFormActive: !this.state.userFormActive,
			infoActive: !this.state.infoActive
		})
	};

	deleteUser = () => {
		const index = this.state.filteredUserList.map(x => {
			return x.id
		}).indexOf(this.state.curUser.id);

		this.state.filteredUserList.splice(index, 1);
		this.setState({ filteredUserList:  this.state.filteredUserList});
		storeValueIntoStorage('contacts', this.state.filteredUserList);
		getValueFromStorage('contacts')
	};


	sort = () => {
		this.setState({filteredUserList: this.state.filteredUserList.sort((a, b) => a.name > b.name ? 1 : -1)})
	};


	handleKeyPress = (e) =>  {
		if (e.key === 'Enter' && this.state.searchString.length > 2) {
			this.handleClickOnSearch()
		}
	};

	handleClickOnSearch = () =>  {
		const s = this.state;
		const str2search = s.searchString.toLowerCase();
		const searchedSet = s.userList.filter(item => item.name.toLowerCase().indexOf(str2search) !== -1);
		this.setState({
			copy: [...this.state.userList],
			filteredUserList: searchedSet,
		})
	};

	handleSearchChange = (e) => {
		this.setState({ searchString: e.target.value }, () => {
			if (!this.state.searchString.length) {
				this.handleClickOnSearchCancel()
			}
		})
	};

	handleClickOnSearchCancel = () => {
		this.setState({
			searchString: '',
			showFilters: true,
			filteredUserList: this.state.copy
		})
	};

	//check the state of the left panel
	handleDrawer = () => {
		this.setState({ open: !this.state.open });
	};


	render() {
		const { classes, theme } = this.props;
		const {
			open, userList, searchString, filteredUserList,
			curUser, infoActive, userFormActive
		} = this.state;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawer}
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Книга контактов
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}} >

					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawer}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</div>
					<User
						userList={userList}
						handleUserClick={this.handleUserClick}
						sort={this.sort}
						searchString={searchString}
						handleSearchChange={this.handleSearchChange}
						handleClickOnSearch={this.handleClickOnSearch}
						filteredUserList={filteredUserList}
						handleKeyPress={this.handleKeyPress}
					/>
				</Drawer>

				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<UserInfo
						curUser={curUser}
						infoActive={infoActive}
						editUser={this.editUser}
						userFormActive={userFormActive}
						filteredUserList={filteredUserList}
						deleteUser={this.deleteUser}
					/>
				</main>
			</div>
		);
	}
}

MainDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainDrawer);
