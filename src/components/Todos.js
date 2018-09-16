import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getTodos , setUser} from "../actions/index"
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ThumbUp from '@material-ui/icons/ThumbUpOutlined';
import ThumbDown from '@material-ui/icons/ThumbDownOutlined';

const styles = theme => ({
    root: {
      width: '100%',
    //   maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    },
});
  



function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


class Todos extends Component {
    constructor(props){
        super(props)

        this.state = {
            todos_false : [],
            todos_true : [],
            FalseOpen:false,
            TrueOpen:false
        }
    }

    componentDidMount(){
        // get user's photos
        const userId = this.props.user ? this.props.user.id :  this.props.match.params.id;
        if(!this.props.user)
            this.props.dispatch(setUser({id:userId}));

        this.props.dispatch(getTodos(userId));
    }

    componentWillReceiveProps(nextProps){
        if(this.props.todos !== nextProps.todos){
            var todos_false = [],
                todos_true = []

            for(var i=0; i<nextProps.todos.length; i++){

                if(nextProps.todos[i].completed){
                    todos_true.push(nextProps.todos[i])
                }else{
                    todos_false.push(nextProps.todos[i])
                }
            }


            this.setState({todos_true ,todos_false })
        }
    }

    handleFalseOpenClick = () => {
        this.setState(state => ({ FalseOpen: !state.FalseOpen }));
    };
    
    handleTrueOpenClick = () => {
        this.setState(state => ({ TrueOpen: !state.TrueOpen }));
    };

    render() {
        const { classes } = this.props;
        const {todos_true ,todos_false} = this.state
        return (
            <div className={classes.root}>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Todos</ListSubheader>}
                >
                    <ListItem button onClick={this.handleFalseOpenClick}>
                        <ListItemIcon>
                            <ThumbDown />
                        </ListItemIcon>
                        <ListItemText inset primary="Not Completed" />
                        {this.state.FalseOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={this.state.FalseOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {todos_false.map(item=>(
                                <ListItem button className={classes.nested}>
                                    <ListItemText inset primary={item.title} />
                                </ListItem>
                            )) }
                            
                        </List>
                    </Collapse>

                    <ListItem button onClick={this.handleTrueOpenClick}>
                        <ListItemIcon>
                            <ThumbUp />
                        </ListItemIcon>
                        <ListItemText inset primary="Completed" />
                        {this.state.TrueOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={this.state.TrueOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {todos_true.map(item=>(
                                <ListItem button className={classes.nested}>
                                    <ListItemText inset primary={item.title} />
                                </ListItem>
                            )) }
                            
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  user: state.user,
})

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Todos));
