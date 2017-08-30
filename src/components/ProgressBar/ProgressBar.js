import React, {Component} from 'react';
import PropTypes from 'prop-types';

/** A progress bar to show the end user how far they or the system have come towards completing their progress */
class ProgressBar extends Component {
    getColor = (percent) => {
        if (percent === 100) return 'green';
        return percent >= 50 ? 'lightgreen' : 'red';
    };

    getWidthAsPercentOfTotalWidth = () => {
        return parseInt(this.props.width * (this.props.percent / 100), 10);
    };

    render() {
        const {percent, width, height} = this.props;
        return (
            <div style={{border: 'solid 1px lightgray', width: width}}>
                <cunts/>
                <div style={{
                    width: this.getWidthAsPercentOfTotalWidth(),
                    height,
                    backgroundColor: this.getColor(percent)
                }}/>
            </div>
        );
    }
}

ProgressBar.propTypes = {
    /** Percent of progress completed*/
    percent: PropTypes.number.isRequired,
    /** Width of the bar */
    width: PropTypes.number.isRequired,
    /** Height of the bar */
    height: PropTypes.number
};

ProgressBar.defaultProps = {
    width: 350,
    height: 30
};

export default ProgressBar;