const React = require ('react');


import './Ticket.css';

class Ticket extends React.Component {

  getDayOfWeek (num) {
    const arr = ['Вс', 'Пн', 'Вт', 'Ср','Чт','Пт','Сб'];
    return arr[num];
  }

  getMonth (num) {
    const arr = ['янв', 'фев', 'мар', 'апр','май','июн','июл', 'авг','сен','окт','ноя','дек'];
    return arr[num];
  }

  formatDate (date) {
    //12.05.17
    const dateSegment = date.split('.');
    const fullYear = `20${dateSegment[2]}`;
    const month = dateSegment[1] - 1;
    const day = dateSegment[0];
    const ndate = new Date(fullYear, month, day);
    const result = `${day} ${this.getMonth(ndate.getMonth())} ${fullYear}, ${this.getDayOfWeek(ndate.getDay())}`;
    return result;

  };

  formatChanges (change) {
    return change == 0 ? `` : change == 1 ? `${change} Пересадка` : `${change} Пересадки`
  };

  showPrice(valute) {
    if (valute === 'rub') {
      return this.props.ticket.price
    }
    if (valute === 'usd') {
      const usd = this.props.usd;
      return (this.props.ticket.price / usd).toFixed(2);
    }
    if (valute === 'eur') {
      const eur = this.props.eur;
      return (this.props.ticket.price / eur).toFixed(2);
    }
  }

  render () {
    const ticket = this.props.ticket;
    const valute = this.props.valute;
    return (
      <div className='ticket-item'>
        <div className='ticket-button'>
          <div className='ticket-company'></div>
          <div className='ticket-buy-button'>
            <a className='buy-button__ticket'>Купить за {this.showPrice(valute)}</a>
          </div>
        </div>
        <div className='ticket-info'>
          <div className='ticket-main'>
            <div className='ticket-origin-time'>{ticket.departure_time}</div>
            <div className='ticket-change'>
              <div className='change-info'>{this.formatChanges(ticket.stops)}</div>
              <div className='change-img'></div>
            </div>
            <div className='ticket-destination-time'>{ticket.arrival_time}</div>
          </div>
          <div className='ticket-additional'>
            <div className='ticket-origin'>
              <div className='origin-place'>{ticket.origin}, {ticket.origin_name}</div>
              <div className='origin-date'>{this.formatDate(ticket.departure_date)}</div>
            </div>
            <div className='ticket-destination'>
              <div className='destination-place'>{ticket.destination_name}, {ticket.destination}</div>
              <div className='destination-date'>{this.formatDate(ticket.arrival_date)}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Ticket