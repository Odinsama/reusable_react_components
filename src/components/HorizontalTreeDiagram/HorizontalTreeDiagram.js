import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class HorizontalTreeDiagram extends Component {
    constructor(props) {
        super(props);

        this.createHorizontalTreeDiagram = this.createHorizontalTreeDiagram.bind(this);

        this.state = {}
    }

    componentDidMount() {
        this.createHorizontalTreeDiagram();
    }

    componentDidUpdate() {
        this.createHorizontalTreeDiagram();
    }

    createHorizontalTreeDiagram() {

        const   width = this.props.size.width,
                height = this.props.size.height;

        const root = d3.tree()
            .size([height, width])

        // create a hierarchy from the root
        const treeRoot = d3.hierarchy(root)
        d3.tree(treeRoot)
        // nodes
        /*const nodes = treeRoot.descendants()
        // links
        const links = treeRoot.links()

        const layoutRoot = d3.select(this.node)
            .append('g')
            .attr('class', 'container')
            .attr('transform', 'translate(0)');*/

        const link = () => d =>
               "M" + d.source.y + "," + d.source.x
            + "C" + (d.source.y +       d.target.y) / 2 + "," + d.source.x
            + " " + (d.source.y +       d.target.y) / 2 + "," + d.target.x
            + " " +  d.target.y + "," + d.target.x;

        console.log(link);


    }



    render() {
        return (
            <svg width={this.props.size.width} height={this.props.size.height} ref={node => this.node = node}>

            </svg>
        );
    }
}

HorizontalTreeDiagram.propTypes = {
    data: PropTypes.object.isRequired
};

export default HorizontalTreeDiagram;