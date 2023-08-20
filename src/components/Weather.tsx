import React from 'react';
import { WeatherResponse } from '../model/types';

interface Props {
  weather: WeatherResponse
}

function Weather(props: Props) {

  const { weather: { daily } } = props;

  return (
    <table>
      <tr>
        <th>Date</th>
        <th>Low</th>
        <th>High</th>
      </tr>
      {daily.time.map((item, index) => {
        return (
          <tr>
            <td>{item}</td>
            <td>{daily.temperature_2m_min[index]}</td>
            <td>{daily.temperature_2m_max[index]}</td>
          </tr>
        )
      })}
    </table>
  )
}

export default Weather;
