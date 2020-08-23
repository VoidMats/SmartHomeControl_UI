
import React, { Component } from 'react'
import { 
    XYPlot, 
    HorizontalGridLines, 
    XAxis, 
    YAxis, 
    LineSeries 
} from 'react-vis';

export default class Chart extends Component {

    constructor(props) {
        super(props);

        this.mounted = false;
        this.widthRef = React.createRef();

        this.state = {
            data: '',
            width: 300,
            height: 300
        }
    }

    componentDidMount() {
        this.mounted = true;

        let data= '';
        const width = this.widthRef.current.offsetWidth;
        const height = Math.round(0.6 * width);

        if (this.props !== undefined) {
            console.log("Pushed data when mounted to chart")
            data = this.props.data;
        }
        this.setState({
            data: data,
            width: width,
            height: height
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== undefined) {
            if (this.props.data !== prevProps.data) {
                console.log("Pushed data to chart")
                this.setState({
                    data: this.props.data
                })
            }
        }
    }

    render() {
        
        return (
            <div ref={this.widthRef}>
                <XYPlot height={this.state.height} width= {this.state.width}>
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineSeries data={this.state.data} />
                </XYPlot>
            </div>
        )
    }

}