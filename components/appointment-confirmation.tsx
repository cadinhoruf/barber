"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { bookAppointment } from "@/lib/google-calendar"
import { Check, Loader2 } from "lucide-react"

interface AppointmentConfirmationProps {
  date: Date
  time: string
  onClose: () => void
}

export function AppointmentConfirmation({ date, time, onClose }: AppointmentConfirmationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const formattedDate = format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await bookAppointment(date, time)
      setIsBooked(true)
    } catch (error) {
      console.error("Erro ao agendar:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirmar Agendamento</CardTitle>
        <CardDescription>Revise os detalhes do seu agendamento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isBooked ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium">Agendamento Confirmado!</h3>
              <p className="text-muted-foreground">Seu agendamento foi adicionado ao seu Google Calendar</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium">Data</p>
                  <p className="text-muted-foreground">{formattedDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Horário</p>
                  <p className="text-muted-foreground">{time}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Ao confirmar, este horário será reservado e adicionado ao seu Google Calendar.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isBooked ? (
          <Button onClick={onClose}>Voltar para Agendamentos</Button>
        ) : (
          <>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                "Confirmar Agendamento"
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

