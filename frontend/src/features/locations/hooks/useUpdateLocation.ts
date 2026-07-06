import { useState } from 'react'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'
import type { LocationDetails, UpdateLocationPayload } from '../types/location'

interface UpdateLocationActionPayload {
  locationId: string
  payload: UpdateLocationPayload
}

interface UpdateLocationState {
  isLoading: boolean
  errorMessage: string
  update: (payload: UpdateLocationActionPayload) => Promise<LocationDetails>
}

// Hook de edição: expõe uma função update para atualizar uma localização existente.
// Espelhado em useUpdateEquipment.
export function useUpdateLocation(): UpdateLocationState {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Recebe o ID e os dados editados, chama o service e devolve a resposta da API.
  async function update({ locationId, payload }: UpdateLocationActionPayload) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      return await locationService.updateLocation(locationId, payload)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    errorMessage,
    update,
  }
}
