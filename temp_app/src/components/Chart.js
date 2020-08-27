
import React, { Component } from 'react'
import { 
    XYPlot, 
    HorizontalGridLines, 
    VerticalGridLines,
    XAxis, 
    YAxis, 
    LineSeries,
    LineMarkSeries 
} from 'react-vis';

export default class Chart extends Component {

    constructor(props) {
        super(props);

        this.mounted = false;
        this.widthRef = React.createRef();

        this.state = {
            data: '',
            width: 300,
            height: 300,
            titles: {
                X: "Time",
                Y: "Temperature"
            }
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
                <XYPlot 
                    xType="ordinal" 
                    height={this.state.height} 
                    width= {this.state.width}
                    margin={{left: 50, right:10, top:20, bottom: 80}}>
                    <HorizontalGridLines 
                        height={3} />
                    <VerticalGridLines />
                    <XAxis 
                        tickLabelAngle={-45}
                        title={this.state.titles.X} />
                    <YAxis
                        title={this.state.titles.Y} />
                    <LineMarkSeries
                        style={{strokeLinejoin: "round"}} 
                        color="green"
                        data={this.state.data} />
                </XYPlot>
            </div>
        )
    }

}

// onNearestX={}/>
