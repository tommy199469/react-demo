import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getPosts , getComments , setUser} from "../actions/index"
import{ ExpansionPanel ,
        ExpansionPanelDetails , 
        ExpansionPanelSummary , 
        Typography  ,
        ExpansionPanelActions,
        Card , 
        Button,
        CardHeader} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Comments from "./Comments"

const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      'text-align': 'left'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
});

class Posts extends Component {
    constructor(props){
        super(props)

        this.state = {
            expanded: null,
            posts : [],
            open: false,
            curr_post:{} 
        }
    }

    componentDidMount(){
        // get user's photos
        const userId = this.props.user ? this.props.user.id :  this.props.match.params.id;
        if(!this.props.user)
            this.props.dispatch(setUser({id:userId}));

        this.props.dispatch(getPosts(userId));
    }

    componentWillReceiveProps(nextProps){
        if(this.props.posts !== nextProps.posts){
            this.setState({posts: nextProps.posts})
        }
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    showComments = (post)=>()=> {
        // call comments
        this.props.dispatch(getComments(post.id));
        this.setState({curr_post:post , open:true , expanded:false})
    }

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        const { classes } = this.props;
        const { expanded , posts , curr_post } = this.state;

        return (
            <div>
                <Card>
                    <CardHeader
                        title="Posts"
                    />
                </Card>    
                {posts.map(post => (
                    <ExpansionPanel key={post.id.toString()} expanded={expanded === post.id} onChange={this.handleChange(post.id)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{post.title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography style={{'textAlign': 'left'}}>{post.body}</Typography>
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button onClick={this.showComments(post) } size="small" variant="outlined" color="primary">More</Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>        
                ))}

                <Comments 
                    handleClose={this.handleClose}
                    curr_post = {curr_post}
                    open={this.state.open}
                />
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.user,
})

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Posts));
