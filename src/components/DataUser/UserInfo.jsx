import React, {Component}        from "react"
import PropTypes                 from 'prop-types'
import {withStyles}              from '@material-ui/core/styles'
import UserEditForm              from './UserEditForm'
import EditIcon                  from '@material-ui/icons/Edit'
import DeleteIcon                from '@material-ui/icons/Delete'
import {Paper, Fab}              from '@material-ui/core'

const styles = () => ({
	infoContainer: {
		textAlign: 'center',
		backgroundColor: '#f6f6f6',
		padding: '8% 10% 0 10%',
		height: '100%',
		fontSize: '25px'
	},
	postPaper: {
		margin: '10px',
		padding: '5px'
	}
});

class UserInfo extends Component {

	render() {
		const {
			classes, curUser, editUser, infoActive,
			userFormActive, filteredUserList, deleteUser
		} = this.props;

		let content = <div className={classes.infoContainer}> Выберите любой контакт со списка слева </div>;
		if (infoActive) {
			content =
				<div className={classes.infoContainer}>
					<Fab size='large' color='inherit' onClick={editUser}>
						<EditIcon/>
					</Fab>
					<Fab size='large' style={{marginLeft: '15px'}} onClick={(e) => deleteUser(e)}>
						<DeleteIcon/>
					</Fab>
					<Paper style={{padding: '10px', margin: '50px'}}>
						<img src={curUser.avatar}/><br/>
						{`Name: ${curUser.name}`}<br/>
						{`User name: ${curUser.username}`}<br/>
						{`Email: ${curUser.email}`}<br/>
					</Paper>
					{curUser.posts.map((item, idx) => {
						return (
							<Paper key={idx} className={classes.postPaper}>{item.paragraph}</Paper>
						)
					})}
				</div>
		} else if (userFormActive) {
			content =
				<div className={classes.infoContainer}>
					<UserEditForm
						curUser={curUser}
						editUser={editUser}
						filteredUserList={filteredUserList}
					/>
				</div>
		}
		return <React.Fragment> {content} </React.Fragment>
	}
}

UserInfo.propTypes = {
	classes: PropTypes.object.isRequired,
	editUser: PropTypes.func,
	infoActive: PropTypes.bool.isRequired,
	userFormActive: PropTypes.bool.isRequired,
	filteredUserList: PropTypes.array.isRequired,
	deleteUser: PropTypes.func

};

export default (withStyles(styles)(UserInfo))