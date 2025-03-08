// Types
interface TimeInterval {
  start: string
  end: string
}

interface DayConfiguration {
  active: boolean
  startTime: string
  endTime: string
  intervals: TimeInterval[]
}

type DaysConfiguration = {
  [key in Weekday]: DayConfiguration
}

type Weekday =
  | 'segunda'
  | 'terca'
  | 'quarta'
  | 'quinta'
  | 'sexta'
  | 'sabado'
  | 'domingo'

const weekdays: Weekday[] = [
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
  'domingo'
]
const weekdaysFormatted: Record<Weekday, string> = {
  segunda: 'Segunda-feira',
  terca: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
  sabado: 'Sábado',
  domingo: 'Domingo'
}

export {
  weekdays,
  weekdaysFormatted,
  type Weekday,
  type TimeInterval,
  type DaysConfiguration
}
