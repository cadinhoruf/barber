'use client'

import { useState } from 'react'
import { Plus, Trash2, Save, Info, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { toast } from 'sonner'
import {
  DaysConfiguration,
  Weekday,
  weekdays,
  weekdaysFormatted
} from './types'

const availableTimes = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = (i % 2) * 30
  return `${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`
})

const defaultDurations = [
  { value: '15', label: '15 minutos' },
  { value: '30', label: '30 minutos' },
  { value: '45', label: '45 minutos' },
  { value: '60', label: '1 hora' },
  { value: '90', label: '1 hora e 30 minutos' },
  { value: '120', label: '2 horas' }
]

export default function ScheduleConfigurationPage() {
  const [daysConfiguration, setDaysConfiguration] = useState<DaysConfiguration>(
    {
      segunda: {
        active: true,
        startTime: '08:00',
        endTime: '18:00',
        intervals: [{ start: '12:00', end: '13:00' }]
      },
      terca: {
        active: true,
        startTime: '08:00',
        endTime: '18:00',
        intervals: [{ start: '12:00', end: '13:00' }]
      },
      quarta: {
        active: true,
        startTime: '08:00',
        endTime: '18:00',
        intervals: [{ start: '12:00', end: '13:00' }]
      },
      quinta: {
        active: true,
        startTime: '08:00',
        endTime: '18:00',
        intervals: [{ start: '12:00', end: '13:00' }]
      },
      sexta: {
        active: true,
        startTime: '08:00',
        endTime: '18:00',
        intervals: [{ start: '12:00', end: '13:00' }]
      },
      sabado: {
        active: true,
        startTime: '08:00',
        endTime: '14:00',
        intervals: []
      },
      domingo: {
        active: false,
        startTime: '08:00',
        endTime: '18:00',
        intervals: []
      }
    }
  )

  const [defaultDuration, setDefaultDuration] = useState('30')

  const toggleDayActive = (day: Weekday) => {
    setDaysConfiguration(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        active: !prev[day].active
      }
    }))
  }

  const updateTime = (
    day: Weekday,
    type: 'startTime' | 'endTime',
    value: string
  ) => {
    setDaysConfiguration(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }))
  }

  const addInterval = (day: Weekday) => {
    setDaysConfiguration(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        intervals: [...prev[day].intervals, { start: '12:00', end: '13:00' }]
      }
    }))
  }

  const removeInterval = (day: Weekday, index: number) => {
    setDaysConfiguration(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        intervals: prev[day].intervals.filter((_, i) => i !== index)
      }
    }))
  }

  const updateInterval = (
    day: Weekday,
    index: number,
    type: 'start' | 'end',
    value: string
  ) => {
    setDaysConfiguration(prev => {
      const newIntervals = [...prev[day].intervals]
      newIntervals[index] = {
        ...newIntervals[index],
        [type]: value
      }
      return {
        ...prev,
        [day]: {
          ...prev[day],
          intervals: newIntervals
        }
      }
    })
  }

  const copyToAllDays = (originDay: Weekday) => {
    const originConfig = daysConfiguration[originDay]

    setDaysConfiguration(prev => {
      const newConfig = { ...prev }
      weekdays.forEach(day => {
        if (day !== originDay) {
          newConfig[day] = {
            ...originConfig,
            active: prev[day].active
          }
        }
      })
      return newConfig
    })

    toast.success(
      `Configurações de agendamento da ${weekdaysFormatted[originDay]} copiadas para outros dias.`
    )
  }

  // Function to save the configurations
  const saveConfigurations = () => {
    // Here you would implement the logic to save to the backend

    toast.success('Configurações de agendamento salvas com sucesso.')
  }

  return (
    <div className='container mx-auto py-6 max-w-5xl'>
      <div className='flex items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Configuração de Horários</h1>
          <p className='text-muted-foreground'>
            Defina seus dias e horários disponíveis para agendamentos
          </p>
        </div>
      </div>

      <div className='grid gap-6'>
        {/* Default appointment duration */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-medium'>
              Duração Padrão
            </CardTitle>
            <CardDescription>
              Defina a duração padrão para cada agendamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='default-duration'>Duração</Label>
                  <Select
                    value={defaultDuration}
                    onValueChange={setDefaultDuration}
                  >
                    <SelectTrigger id='default-duration' className='w-full'>
                      <SelectValue placeholder='Selecione a duração' />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultDurations.map(duration => (
                        <SelectItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day-specific schedule configuration */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-medium'>
              Dias e Horários Disponíveis
            </CardTitle>
            <CardDescription>
              Configure os dias e horários disponíveis para agendamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {weekdays.map(day => (
                <div key={day} className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <Switch
                        checked={daysConfiguration[day].active}
                        onCheckedChange={() => toggleDayActive(day)}
                        id={`active-${day}`}
                      />
                      <Label
                        htmlFor={`active-${day}`}
                        className={`font-medium ${
                          !daysConfiguration[day].active
                            ? 'text-muted-foreground'
                            : ''
                        }`}
                      >
                        {weekdaysFormatted[day]}
                      </Label>
                    </div>

                    {daysConfiguration[day].active && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => copyToAllDays(day)}
                            >
                              Copiar para todos
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Copiar esta configuração para todos os outros dias
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  {daysConfiguration[day].active && (
                    <div className='pl-8 space-y-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label htmlFor={`start-${day}`}>Horário Início</Label>
                          <Select
                            value={daysConfiguration[day].startTime}
                            onValueChange={value =>
                              updateTime(day, 'startTime', value)
                            }
                          >
                            <SelectTrigger
                              id={`start-${day}`}
                              className='w-full'
                            >
                              <SelectValue placeholder='Selecione o horário' />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTimes.map(time => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className='space-y-2'>
                          <Label htmlFor={`end-${day}`}>Horário Fim</Label>
                          <Select
                            value={daysConfiguration[day].endTime}
                            onValueChange={value =>
                              updateTime(day, 'endTime', value)
                            }
                          >
                            <SelectTrigger id={`end-${day}`} className='w-full'>
                              <SelectValue placeholder='Selecione o horário' />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTimes.map(time => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Intervals */}
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <Label className='font-medium'>Intervalos</Label>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => addInterval(day)}
                          >
                            <Plus className='h-4 w-4' />
                            Adicionar Intervalo
                          </Button>
                        </div>

                        {daysConfiguration[day].intervals.map(
                          (interval, index) => (
                            <div key={index} className='grid grid-cols-2 gap-4'>
                              <div className='space-y-2'>
                                <Label
                                  htmlFor={`interval-start-${day}-${index}`}
                                >
                                  Horário Início
                                </Label>
                                <Select
                                  value={interval.start}
                                  onValueChange={value =>
                                    updateInterval(day, index, 'start', value)
                                  }
                                >
                                  <SelectTrigger
                                    id={`interval-start-${day}-${index}`}
                                    className='w-full'
                                  >
                                    <SelectValue placeholder='Select time' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableTimes.map(time => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className='space-y-2'>
                                <Label htmlFor={`interval-end-${day}-${index}`}>
                                  Horário Fim
                                </Label>
                                <Select
                                  value={interval.end}
                                  onValueChange={value =>
                                    updateInterval(day, index, 'end', value)
                                  }
                                >
                                  <SelectTrigger
                                    id={`interval-end-${day}-${index}`}
                                    className='w-full'
                                  >
                                    <SelectValue placeholder='Selecione o horário' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableTimes.map(time => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className='flex items-center justify-end'>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant='link'
                                        size='sm'
                                        onClick={() =>
                                          removeInterval(day, index)
                                        }
                                      >
                                        <Trash2 className='h-4 w-4' />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Remover intervalo</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button onClick={saveConfigurations}>
              <Save className='h-4 w-4 mr-2' />
              Salvar Configuração
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
