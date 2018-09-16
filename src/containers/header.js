import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};

const mailFolderListItems = userId => (
    <div>
        <Link to="/">
            <ListItem button>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
            </ListItem>
        </Link>
        <Divider />
        {userId ?  
            <div>
                <Link to={"/photos/"+userId}>
                    <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Albums" />
                    </ListItem>
                </Link>

                <Link to={"/posts/"+userId}>
                    <ListItem button>
                        <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Posts" />
                    </ListItem>
                </Link>

                <Link to={"/todos/"+userId}>
                    <ListItem button>
                        <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Todos" />
                    </ListItem>
                </Link> 
            </div> : ""
        }
    </div>
);



class Header extends Component {

    constructor(props){
        super(props)

        this.state = {
            opened : false,
            HeaderName : "Uers"
        }
    }

    toggleDrawer = (open) => () => {
        this.setState({
          'opened': open,
        });
    };
    
    render(){
        const { classes , user } = this.props;
        const sideList = (
            <div className={classes.list}>
              <List>{mailFolderListItems(user ? user.id : 0)}</List>
            </div>
          );

        return (
            <div className={this.props.classes.root}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton className={this.props.classes.menuButton} color="inherit" onClick={this.toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={this.state.opened} onClose={this.toggleDrawer(false)}>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer(false)}
                                onKeyDown={this.toggleDrawer(false)}
                            >
                                {sideList}
                            </div>
                        </Drawer>
                        <Typography variant="title" color="inherit">
                            {this.state.HeaderName}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps,null)(withStyles(styles)(Header));
