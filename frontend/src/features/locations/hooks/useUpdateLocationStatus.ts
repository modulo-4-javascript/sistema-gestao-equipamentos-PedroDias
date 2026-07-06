import { useState } from 'react'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'
import type {
  LocationDetails,
  UpdateLocationStatusPayload,
} from '../types/location'

interface UpdateLocationStatusActionPayload {
  locationId: string
  payload: UpdateLocationStatusPayload
}

interface UpdateLocationStatusState {
  isLoading: boolean
  errorMessage: string
  updateStatus: (
    payload: UpdateLocationStatusActionPayload,
  ) => Promise<LocationDetails>
}

// Hook de situação: expõe updateStatus para alterar só o status da localização.
// Espelhado em useUpdateEquipmentStatus.
export function useUpdateLocationStatus(): UpdateLocationStatusState {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Recebe o ID e o novo status, chama o PATCH do service e controla loading/erro.
  async function updateStatus({
    locationId,
    payload,
  }: UpdateLocationStatusActionPayload) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      return await locationService.updateLocationStatus(locationId, payload)
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
    updateStatus,
  }
}
