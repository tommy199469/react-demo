import React, { Component } from 'react';
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getUser , setUser} from "../actions/index"
import Photos from "./Photos"
import Posts from "./Posts"
import Todos from "./Todos"

class UserProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      expanded: false,
      user : {}
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    // check the users list is exist , if not call api to fetch data
    if(this.props.users){
      var user = this.props.users.find(function(element) {
        return element.id == id
      });
      this.setState({user});
      this.props.dispatch(setUser(user));
    }else{  
      this.props.dispatch(getUser(id));
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.user !== nextProps.user){
      this.setState({user: nextProps.user})
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const {user} = this.state
    return (
      <div>
        <Card>
          <CardActions disableActionSpacing>
            <Button onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
              variant="contained" color="secondary"
              >
              Adress
              <ExpandMoreIcon />
            </Button>
          </CardActions>
          <CardHeader
            title={user.username}
            subheader={user.name}
          />
          <CardContent>
          <Typography component="p">
            Phone: {user.phone}
          </Typography>

          <Typography component="p">
            Website: {user.website}
          </Typography>

          <Typography component="p">
            Email: {user.email}
          </Typography>
          </CardContent>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography  component="p">
                City:  {user.address ? user.address.city : ""}
              </Typography>
              <Typography  component="p">
                Street:  {user.address ? user.address.street : ""}
              </Typography>
              <Typography  component="p">
                Suite:  {user.address ? user.address.suite : ""}
              </Typography>
              <Typography  component="p">
                Zipcode:  {user.address ? user.address.zipcode : ""}
              </Typography>
              <Typography  component="p">
                {user.address ? 'Lat:' + user.address.geo.lat : ""}  {user.address ? 'Lng:' + user.address.geo.lng : ""}
              </Typography>
            </CardContent>
          </Collapse>
        </Card><br/>
        {/* <Photos userId={this.props.match.params.id}/><br/>
        <Posts userId={this.props.match.params.id}/><br/>
        <Todos userId={this.props.match.params.id}/><br/> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  user: state.user,
})

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);
