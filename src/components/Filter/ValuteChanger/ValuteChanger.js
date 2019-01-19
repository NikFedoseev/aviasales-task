import React from 'react';

import './ValuteChanger.css'

class ValuteChanger extends React.Component {


  changeValue(e, currentValute, func) {
    const selectedValute = e.target.dataset.valute;
    if (selectedValute === currentValute) return 
    func(selectedValute);
  }

  render () {
    const valuteButtons = ['rub', 'usd', 'eur'].map((item, i) => {
      let active = this.props.valute === item ? 'valute-changer-button__active' : 'valute-changer-button__inactive'
      return <div key={i}
                  data-valute = {item}
                  className={`valute-changer-button valute-changer-button__${item} ${active}`} 
                  onClick = {(e) => this.changeValue(e, this.props.valute, this.props.onValuteChange)}>
              {item.toLocaleUpperCase()}
              </div>
    })
    return (
      <div className='filter-item valute-changer'>
        <div className='filter-title'>ВАЛЮТА</div>
        <div className='valute-changer-button-container'>
          {valuteButtons}
        </div>
      </div>
    )
  }
}

export default ValuteChanger