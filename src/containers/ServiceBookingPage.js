import { connect } from 'react-redux';
import React from 'react';
import moment from 'moment';
import { setBookingData, requestBookingRanges,  setCurrentBookingRange} from '../actions';
import { ListGroup, ListGroupItem, Thumbnail } from 'react-bootstrap';


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setBookingData : (data) => { dispatch(setBookingData(data)) },
        setCurrentBookingService : () => { dispatch(setBookingData({ service:ownProps.params.serviceId }))},
        requestBookingRanges : () => { dispatch(requestBookingRanges()) },
        setCurrentBookingRange : (idx) => { dispatch(setCurrentBookingRange(idx))}

    }
}


function mapStateTopProps(state, ownProps) {
    let props =  {
        startDate : state.booking.data.start,
        endDate : state.booking.data.end,
        ranges : state.booking.ranges,
        selectedRange : state.booking.selectedRange
    }

    return props;
}



class ServiceBookingPage extends React.Component {

    componentWillMount() {
      //this.props.setCurrentBookingService()
    }

    onEndChange(event){

        const m = moment(event.target.value)
        if ( m.isValid() ) {
            this.props.setBookingData({ end : m.format('YYYY-MM-DD')})
        } else {
            this.props.setBookingData({ end : null })
        }

    }

    onStartChange(event){
        const m = moment(event.target.value)
        if ( m.isValid() ) {
            this.props.setBookingData({ start : m.format('YYYY-MM-DD')})
        } else {
            this.props.setBookingData({ start : null })
        }
    }

    findRanges(event){
        if (this.props.startDate && this.props.endDate) {
            console.log("requesting ranges")
            this.props.requestBookingRanges()
        }
    }



    render(){
        return <div>
            <div className="service-description">

            </div>
            <div className="row">
                <div className="col col-xs-6">
                    <label>Data inizio</label>
                    <input type="text" onChange={this.onStartChange.bind(this)}/>
                </div>
                <div className="col col-xs-6">
                    <label>Data fine</label>
                    <input type="text" onChange={this.onEndChange.bind(this)}/>
                </div>

            </div>
            <div className="service-submit">
                <button className="btn btn-default" onClick={this.findRanges.bind(this)}>Cerca</button>
            </div>
            {
            /*
            <div className="service-submit">
                <button className="btn btn-default"></button>
            </div>
            */
            }
            <ListGroup>
              {/*   (() => {
                    if (this.props.selectedRange === null) {
                        return this.props.ranges.map((range,i) => {
                            return <ListGroupItem key={i} onClick={ () => this.props.setCurrentBookingRange(i) } >{range.start} - {range.end}</ListGroupItem>
                        })
                    } else {
                        return <div><div>
                            {this.props.ranges[this.props.selectedRange].start}
                        </div>
                        <button className="btn btn-default" onClick={ () => this.props.setCurrentBookingRange(null) }>Unset</button>
                        </div>
                    }
                })()
                */}
            </ListGroup>

        </div>
    }


}

//export default connect(mapStateTopProps, mapDispatchToProps)(ServiceBookingPage);
export default connect()(ServiceBookingPage);
