import React from 'react';

import './Filter.css';

import ListItem from './ListItem/ListItem';
import ValuteChanger from './ValuteChanger/ValuteChanger'

class Filter extends React.Component {
  

  render () {
    return (
      <div className='app-filter'>
        <ValuteChanger valute = {this.props.valute} onValuteChange={this.props.onValuteChange}/>
        <div className='filter-item filter__transfer'>
          <div className='filter-title'>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
          <div className='filter-content'>
            <div className='filter-checkbox-list'>
              <ListItem onStopsChange={this.props.onStopsChange} selected = {this.props.selectedStops} />
              {
                this.props.stops.map((item, i) => {
                  return <ListItem 
                    key={i} 
                    stops={item} 
                    selected = {this.props.selectedStops}
                    onStopsChange={this.props.onStopsChange}
                    uncheckOther = {this.props.uncheckOther}
                  />
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Filter