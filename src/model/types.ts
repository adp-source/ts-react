export interface WeatherResponse {
  elevation: number,
  generationtime_ms: number,
  hourly: {
    temperature_2m: number[],
    time: string[],
  },
  daily: {
    time: string[],
    temperature_2m_max: string[],
    temperature_2m_min: string[],
  },
  hourly_units: {
    temperature_2m: string,
    time: string
  },
  latitude: number,
  longtide: number,
  timezone: string,
  timezone_abbreviation: string,
  utf_offset_seconds: number
}
