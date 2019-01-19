const React = require ('react');

import './ListItem.css';

class ListItem extends React.Component {

  checkButton(e, func) {
    const selectedStop = e.target.dataset.stop;
    func(selectedStop);
    //this.props.onStopsChange(this.props.stops)
  }

  isChecked () {
    if (typeof(this.props.selected) == 'undefined') return false
    if (this.props.selected.includes('all')) return true
    return this.props.selected.includes(this.props.stops);
  }

  formatStops(stops) {
    return stops > 1 ? `${stops} пересадки` : (stops == 1) ? `${stops} пересадка`: 'Без пересадок';
  }

  uncheckOther(e, func){
    const stop = e.target.dataset.stop
    func(stop)
  }

  render() {
    return (
      <div className='checkbox-list-item'>
        <label className='checkbox-list-label'>
          <input 
            type='checkbox' 
            className='checkbox-field' 
            data-stop={typeof(this.props.stops) !== 'undefined' ? this.props.stops : 'all'} 
            onClick={(e) => this.checkButton(e, this.props.onStopsChange)}
            >
          </input>
          <span className={`checkbox-face ${this.isChecked() ? 'checkbox-face__checked' : ''}`}></span>
          {typeof(this.props.stops) !== 'undefined' ? this.formatStops(this.props.stops) : 'Все'}
        </label> 
        {typeof(this.props.stops) !== 'undefined' && 
          <div className='checkbox-item-only'>
            <a 
              className='checkbox-item-uncheck-other' 
              onClick={(e) => this.uncheckOther(e, this.props.uncheckOther)}
              data-stop = {typeof(this.props.stops) !== 'undefined' && this.props.stops}
              >Только</a>
          </div>
        }
      </div>
    )
  }
}

export default ListItem;