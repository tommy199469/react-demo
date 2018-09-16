import React, { Component } from 'react';
import { connect } from 'react-redux'
import{ Dialog ,
        Slide , 
        AppBar , 
        Typography,
        Toolbar,
        IconButton, 
        CardHeader,
        Card,
        Avatar,
        CardContent,
        ListSubheader,
        LinearProgress} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
    card: {
        'margin-bottom': '12px'
    },
    avatar: {
        backgroundColor: red[500],
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
  
class Comments extends Component {
    constructor(props){
        super(props)

        this.state = {
            comments : [],
            open: false,
            loading: this.props.loading
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.comments !== nextProps.comments){
            this.setState({comments: nextProps.comments, 'loading':false})
        }
    }

    render() {
        const { classes , curr_post , loading } = this.props;
        const {comments} = this.state;
        return (
            <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    TransitionComponent={Transition}
                    >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                    <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        {curr_post.title}
                    </Typography>
                    </Toolbar>
                </AppBar>

                <List component="nav">
                    <ListItem>
                        <ListItemText primary={curr_post.body} />
                    </ListItem>
                </List>
                <Divider />

                {loading ? 
                    <LinearProgress/> : 

                    <List component="nav">
                    <ListSubheader>{comments.length != 0 ? comments.length+" of Comments" : "No Comments"}</ListSubheader>
                    {comments.map(comment => ( 
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                    {comment.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                }
                                title={comment.name}
                                subheader={comment.email}
                            />
                            <CardContent>
                                <Typography paragraph>{comment.body}</Typography>
                            </CardContent>                           
                        </Card>
                    ))}
                    </List>
                }
            
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    comments: state.comments,
    loading : state.loading
})

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Comments));
