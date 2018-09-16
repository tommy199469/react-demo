import React, { Component } from 'react';
import {getUsers} from "../actions/index"
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";

class User extends Component {

  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    this.props.dispatch(getUsers())
  }

  componentWillReceiveProps(nextProps){
    if(this.props.users !== nextProps.users){
      this.setState({users: nextProps.users})
    }
  }

  render() {
    return (
      <div className="User">
          <List>
            {this.state.users.map((user)=>{
              return(
                <Link to={`user/${user.id}`} >
                  <ListItem button>
                    <ListItemText primary={user.name}/>
                  </ListItem>
                </Link>
              )
            })}
          </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
})

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(User);
