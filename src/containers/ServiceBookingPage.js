import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ListGroup, ListGroupItem, Thumbnail } from 'react-bootstrap';
import BookingCalendar from '../components/BookingCalendar';
import Spinner from '../components/Spinner';
import { uniq } from 'lodash';
import {
  setBookingData,
  requestBookingRanges,
  setCurrentBookingRange,
  loadShop,
  loadShopService
} from '../actions';

function createEvents(ranges){

    const dates = ranges.map(range => {
        return moment(range.start).format('YYYY-MM-DD');
    })
    return _.map(_.uniq(dates), item => {
        return {
            title : "aaa",
            date : moment(item),
            allDay : true
        }
    })
}

class ServiceBookingPage extends React.Component {

  componentWillMount() {
    this.props.loadShop().then(() => this.props.loadShopService());
  }

  componentWillReceiveProps(nextProps) {
    // Shop id changed, laad new shop
    if (nextProps.params.shopId != this.props.params.shopId) {
      nextProps.loadShop().then(() => nextProps.loadShopService());
    }
    // Service id changed, load new service
    if (nextProps.params.serviceId != this.props.params.serviceId) {
      nextProps.loadShopService();
    }
  }

    onEndChange(event){

        const m = moment(event.target.value)
        if ( m.isValid() ) {
            this.props.setBookingData({ end : m.format('YYYY-MM-DD')})
        } else {
            this.props.setBookingData({ end : null })
        }

    }

    onCalendarChange(s, e){

        this.props.setBookingData(
            { start : s.format('YYYY-MM-DD'),
              end: e.format('YYYY-MM-DD')
            }
        )

        this.props.requestBookingRanges()

    }

    findRanges(event){
        if (this.props.startDate && this.props.endDate) {
            console.log("requesting ranges")
            this.props.requestBookingRanges()
        }
    }


    updateInterval(startDate, endDate){

    }



  render() {

    if (!this.props.shop || !this.props.service) {
      return <Spinner />;
    }

    return (
      <div>
        {this.renderTopShopAndServiceInfo()}
      </div>
    );

        //return <div>

            //{
              //[><BookingCalendar
                //events={createEvents(this.props.ranges)}
                //defaultDate={moment()}
                //onCalendarChange={this.onCalendarChange.bind(this)}/>
              //*/
            //}
            //{
            //[>
            //<div className="row">
                //<div className="col col-xs-6">
                    //<label>Data inizio</label>
                    //<input type="text" onChange={this.onStartChange.bind(this)}/>
                //</div>
                //<div className="col col-xs-6">
                    //<label>Data fine</label>
                    //<input type="text" onChange={this.onEndChange.bind(this)}/>
                //</div>

            //</div>
            //<div className="service-submit">
                //<button className="btn btn-default" onClick={this.findRanges.bind(this)}>Cerca</button>
            //</div>
            //*/
            //}
            //{
            //[>
            //<div className="service-submit">
                //<button className="btn btn-default"></button>
            //</div>
            //*/
            //}
            //<ListGroup>
              //{[>   (() => {
                    //if (this.props.selectedRange === null) {
                        //return this.props.ranges.map((range,i) => {
                            //return <ListGroupItem key={i} onClick={ () => this.props.setCurrentBookingRange(i) } >{range.start} - {range.end}</ListGroupItem>
                        //})
                    //} else {
                        //return <div><div>
                            //{this.props.ranges[this.props.selectedRange].start}
                        //</div>
                        //<button className="btn btn-default" onClick={ () => this.props.setCurrentBookingRange(null) }>Unset</button>
                        //</div>
                    //}
                //})()
                //*/}
            //</ListGroup>

        //</div>
    }

    renderTopShopAndServiceInfo() {
      const { shop, service } = this.props;

      return (
        <div>
          <div className="service-description">
            { shop.name } - { service.name }
          </div>
        </div>
      );
    }


}

function mapStateToProps(state, ownProps) {
  const shopId = ownProps.params.shopId;
  const serviceId = ownProps.params.serviceId;
  const shop = state.entities.shops[shopId];
  let service;

  // Is a service shop?
  if (shop) {
    service = state.entities.services[serviceId];
    if (service && Number(service.shop) !== Number(shop.id)) {
      service = null;
    }
  }

  return {
    shop,
    service,
    startDate: state.booking.data.start,
    endDate: state.booking.data.end,
    ranges: state.booking.ranges.items,
    selectedRange: state.booking.selectedRange,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const shopId = ownProps.params.shopId;
  const serviceId = ownProps.params.serviceId;

  return {
    loadShop: () => dispatch(loadShop(shopId)),
    loadShopService: () => dispatch(loadShopService(shopId, serviceId)),
    setBookingData: data => dispatch(setBookingData(data)),
    setCurrentBookingService: () => dispatch(setBookingData({ service: serviceId })),
    requestBookingRanges: () => dispatch(requestBookingRanges()),
    // index???
    setCurrentBookingRange: index => dispatch(setCurrentBookingRange(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceBookingPage);
