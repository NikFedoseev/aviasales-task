const React = require ('react');
const Axios = require ('axios');
import './App.css'

import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import Content from '../Content/Content';


class App extends React.Component {

  state = {
    tickedData: [],
    stops: [],
    selectedStops: ['all'],
    filteredTicketData: [],
    valute: 'rub'
  }

  componentDidMount() {
    this.getTicketData();
  }

  componentDidUpdate (prevProps, prevState) {
    if(prevState.selectedStops !== this.state.selectedStops)
    this.applyFilter();
  }

  getTicketData() {
    Axios.get('/etc/tickets.json')
      .then(response => {
        return response.data;
      })
      .then(data => {
        const sortedData = data.tickets.sort((a, b) => a.price - b.price);
        const stops = this.getUniqueStops(data.tickets);
        this.setState({
          tickedData: sortedData,
          filteredTicketData: sortedData,
          stops: stops
        })
      })
  }

  getUniqueStops(data) {
    const allStops = data.map((item,i ) => {
      return `${item.stops}`;
    });
    allStops.sort((a, b) => {
      return a - b;
    })
    const uniqueStops = allStops.filter((item, i, arr) => {
      return i == 0 || item !== arr[i-1];
    })
    return uniqueStops;
  }

  checkArrays (arr1, arr2) {
    arr1.sort();
    return arr1.length === arr2.length && arr1.every((item, i) => {
      return item === arr2[i]
    })
  }

  toggleAll (stops = 'all') {
    if(this.state.selectedStops !== 'all') {
      this.setState({
        selectedStops: stops
      })
    } else {
      this.setState({
        selectedStops: []
      })
    }
  }

  checkAll () {
    this.checkArrays(this.state.selectedStops, this.state.stops) && this.toggleAll() 
  }

  applyFilter () {
    const filteredTicketData = [...this.state.tickedData].filter((item, i) =>{
      return this.state.selectedStops === 'all' ? true : [...this.state.selectedStops].includes(`${item.stops}`)
    })
    
    this.setState({
      filteredTicketData: filteredTicketData
    })
  }

  onStopsChange (stops) {
    if (stops === 'all') {
      this.toggleAll(stops);
      return
    }
    else if (!this.state.selectedStops.includes(stops) && !this.state.selectedStops.includes('all')) {
      (this.state.selectedStops.includes('all'))
      ? this.setState({ selectedStops: [stops]})
      : this.setState({ selectedStops: [...this.state.selectedStops, stops] }, this.checkAll);
    } else {
      if (this.state.selectedStops.includes('all')) {
        let newSelectedStops = [...this.state.stops].filter(item => item !== stops);
        this.setState({ selectedStops: [...newSelectedStops] }, this.applyFilter);
      } else {
        let newSelectedStops = [...this.state.selectedStops].filter(item => item !== stops);
        this.setState({ selectedStops: [...newSelectedStops] });
      }
    }
  }

  onValuteChange (valute) {
    this.setState({
      valute: valute
    })
  }

  uncheckOther (stop) {
    this.setState({
      selectedStops: stop
    })
  }

  render () {
    return (
      <div className='app'>
        <Header/>
        <div className='content-wrapper'>
         <Filter 
            stops={this.state.stops} 
            selectedStops = {this.state.selectedStops} 
            onStopsChange = {this.onStopsChange.bind(this)}
            onToggleAll = {this.toggleAll.bind(this)}
            valute = {this.state.valute}
            onValuteChange = {this.onValuteChange.bind(this)}
            uncheckOther = {this.uncheckOther.bind(this)}
          />
         <Content 
            tickets={this.state.filteredTicketData}
            valute = {this.state.valute}
          />
        </div>
      </div>
    )
  }
};

export default App;