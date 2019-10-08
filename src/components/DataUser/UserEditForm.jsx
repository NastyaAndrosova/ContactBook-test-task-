import React, { Component }   from "react"
import PropTypes              from 'prop-types'
import { withStyles }         from '@material-ui/core/styles'
import {
	Typography, FormControl, TextField,
	Button, Paper
}                             from '@material-ui/core'
import {
	storeValueIntoStorage
}                             from '../../services/utils'

const styles = () => ({
	formControl: {
		margin: '0 0 10px 20px',
		minWidth: '120px',
		width: '30%'
	},
	userFormContainer: {
		padding: '10px',
		overflow: 'hidden'
	},
	formControlCentered: {
		minWidth: '120px',
		width: '100%',
		margin: '20px 0 20px 20px',
		fontSize: '20px'
	},
});

class UserEditForm extends Component {
	constructor (props) {
		super ( props );

		this.state = {
			newname : '' ,
			newemail : '' ,
			newusername : '' ,
		}
	}

	componentDidMount () {
		//copy props to the states to return if the value is not edited
		const { name , email , username } = this.props.curUser;
		this.setState ( { newname : name , newemail : email , newusername : username } )
	}

	handleTextInputChange = (e , fieldName) => {
		this.setState ( { [ fieldName ] : e.target.value } )
	};

	saveChanges () {
		//passed arguments can contain edited values and default (without changes)
		const { filteredUserList , curUser } = this.props;

		//in current object replace changed values
		for (let key in curUser) {
			this.updateUserData ( key ,curUser[key] )
		}
		const newContacts = filteredUserList.map ( item => item.id === curUser.id ? curUser : item );

		storeValueIntoStorage ( 'contacts' , newContacts );
		this.props.editUser ()
	}


	updateUserData = (keys) => {
		if (this.state[ `new${ keys }` ]) {
			( this.props.curUser[ keys ] = this.state[ `new${ keys }` ] )
		}
	};


	render() {
		const { classes, curUser, editUser } = this.props;
		const { name, username,email }= this.state;

		return (
			<Paper className={classes.userFormContainer}>
				<FormControl className={classes.formControlCentered}>
					<Typography align='center'>Редактировать пользавателя</Typography>
				</FormControl>

				<FormControl className={classes.formControl}>
					<TextField
						placeholder={curUser.name}
						onChange={(e) => this.handleTextInputChange(e, 'newname')}
					/>
				</FormControl>

				<FormControl className={classes.formControl}>
					<TextField
						placeholder={curUser.username}
						onChange={(e) => this.handleTextInputChange(e, 'newusername')}
					/>
				</FormControl>

				<FormControl className={classes.formControl}>
					<TextField
						placeholder={curUser.email}
						onChange={(e) => this.handleTextInputChange(e, 'newemail')}
					/>
				</FormControl>

				<div>
					<Button color='primary' onClick={() => editUser()}>Назад</Button>
					<Button variant='contained' color='primary' onClick={() => this.saveChanges(name, username,email)}>
						Сохранить
					</Button>
				</div>
			</Paper>
		)
	}
}


UserEditForm.propTypes = {
	classes: PropTypes.object.isRequired,
	editUser: PropTypes.func
};

export default(withStyles(styles)(UserEditForm));