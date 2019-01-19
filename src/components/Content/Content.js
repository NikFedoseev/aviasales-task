const React = require ('react');
import Axios from 'axios';

import './Content.css';
import Ticket from './Ticket/Ticket';


class Content extends React.Component {

  state = {
    usd: null,
    eur: null
  }

  componentDidMount () {
    this.getValute()
    this.props.valute === 'rub' ? '' : this.getValute()
  }

  getValute () {
    Axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(response => {
        let valutes = response.data.Valute
        this.setState({
          usd: valutes.USD.Value,
          eur: valutes.EUR.Value
        })
      })
  }

  render () {
    return (
      <div className='app-content'>
        <div className='ticket-list'>
          {
            this.props.tickets.map((ticket, i) => {
              return <Ticket ticket={ticket} key={i} usd={this.state.usd} eur={this.state.eur} valute={this.props.valute}/>
            })
          }
        </div>
      </div>
    )
  }
}

export default Content