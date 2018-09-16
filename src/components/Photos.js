import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getPhotos , getAlbums , setUser} from "../actions/index"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Card , CardHeader} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import LazyLoad from 'react-lazyload';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  });

class Photos extends Component {
    constructor(props){
        super(props)

        this.state = {
            photos : [],
            albums : [],
            expanded: null,
            album_id: 1,
        }
    }

    componentDidMount(){
        // get user's photos
        const userId = this.props.user ? this.props.user.id :  this.props.match.params.id;
        if(!this.props.user)
            this.props.dispatch(setUser({id:userId}));

        this.props.dispatch(getAlbums(userId));
    }

    componentWillReceiveProps(nextProps){
        if(this.props.photos !== nextProps.photos){
            this.setState({photos: nextProps.photos})
        }

        if(this.props.albums !== nextProps.albums && nextProps.albums){
            this.props.dispatch(getPhotos(this.props.match.params.id,nextProps.albums[0].id));

            this.setState({albums: nextProps.albums  , "album_id": nextProps.albums[0] ? nextProps.albums[0].id : 0 })
        }
    }

    handleOptionsChange = name => event => {
        if(this.state.album_id != event.target.value){
            this.setState({ 'album_id': Number(event.target.value) , expanded: "panel1" });
            this.props.dispatch(getPhotos(this.props.user.id,event.target.value));
        }
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

  render() {
    const {photos , albums , expanded} = this.state
    const { classes } = this.props;
    return (
        <Card>
            <CardHeader
                title="Albums"
            />
            <FormControl>
                <Select
                    value={this.state.album_id}
                    onChange={this.handleOptionsChange('album_id')}
                >
                    {albums.map(album => (
                        <MenuItem style={{"fontSize": "9px"}} value={album.id} name={album.title}>{album.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} />
                    <ExpansionPanelDetails>
                        <div className={classes.root}>
                                <GridList className={classes.gridList} cols={2.5}>
                                    {photos.map(photo => (
                                        <GridListTile key={photo.thumbnailUrl}>
                                            <LazyLoad height={100}>
                                                <img style={{"width":"100%"}}src={photo.thumbnailUrl} />
                                            </LazyLoad>
                                            <GridListTileBar
                                                title={photo.title}
                                                classes={{
                                                    root: classes.titleBar,
                                                    title: classes.title,
                                                }}
                                                actionIcon={
                                                    <IconButton>
                                                    <StarBorderIcon className={classes.title} />
                                                    </IconButton>
                                                }
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>                            
                        </div>
                    </ExpansionPanelDetails>
            </ExpansionPanel>
        </Card>    
    );
  }
}

const mapStateToProps = (state) => ({
  photos: state.photos,
  albums: state.albums,
  photos_loading : state.photos_loading,
  user: state.user,
})

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Photos));
