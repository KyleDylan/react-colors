import React from 'react';
import {Link} from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './NavBar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', open: false };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true });
        this.props.handleChange(e.target.value);
    }

    closeSnackbar() {
        this.setState({ open: false });
    };

    render() {
        const { level, changeLevel } = this.props;
        const { format } = this.state;
        return(
            <header className='NavBar'>
                <div className='logo'>
                    <Link to='/'>reactcolorpicker</Link>
                </div>
                <div className='slider-container'>
                <span>Level: {level}</span>
                    <div className='slider'>
                        <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
                    </div>
                </div>
                <div className='select-container'>
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>Hex - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - (255,255,255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - (255,255,255,1)</MenuItem>
                    </Select>
                </div>
                    <Snackbar 
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={this.state.open}
                        autoHideDuration={3000}
                        message={<span id='message-id'>Format: {format.toUpperCase()}</span>}
                        ContentProps={{ 'aria-describedby': 'message-id' }}
                        onClose={this.closeSnackbar}
                        action={[
                            <IconButton 
                            onClick={this.closeSnackbar}
                            color='inherit'
                            key='close'
                            aria-label='close'
                            >
                            <CloseIcon />
                        </IconButton>
                    ]}
                 />
            </header>
        );
    }
}

export default NavBar;