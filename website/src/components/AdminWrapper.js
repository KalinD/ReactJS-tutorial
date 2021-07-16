import React, { Component } from 'react';
import "./assets/css/admin.css";

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Drawer imports
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;
const styles = theme => ({
    toolbar: {
        paddingRight: 24
    },
    appBar: {
        marginLeft: drawerWidth,
        width: `clacl(100% - ${drawerWidth}px)`
    },
    drawerPaper: {
        position: 'relative',
        whiteSPace: 'noWrap',
        width: drawerWidth
    }
});

class AdminWrapper extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div id="admin-page">
                <AppBar className={ classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                        >Adimn</Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    classes={{ paper: classes.drawerPaper }}
                    variant="permanent"
                    open={true}
                >
                    <List>
                        <ListItem>Dasboard</ListItem>
                    </List>
                </Drawer>
                {this.props.children}
            </div>
        )
    }
}


export default withStyles(styles)(AdminWrapper);