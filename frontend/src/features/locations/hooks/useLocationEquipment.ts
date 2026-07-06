import { useCallback, useEffect, useState } from 'react'
import type { RequestState } from '../../../shared/hooks/requestState'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'
import type { LocationEquipment, PaginatedResult } from '../types/location'

// Hook de leitura: lista os equipamentos vinculados a uma localização.
// Usa o padrão de useEquipmentList, mas depende do ID da rota.
export function useLocationEquipment(
  locationId?: string,
): RequestState<PaginatedResult<LocationEquipment>> {
  const [data, setData] = useState<PaginatedResult<LocationEquipment>>()
  const [isLoading, setIsLoading] = useState(Boolean(locationId))
  const [errorMessage, setErrorMessage] = useState('')

  const loadLocationEquipment = useCallback(async () => {
    if (!locationId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await locationService.getLocationEquipment(locationId, {
        page: 1,
        pageSize: 100,
      })
      setData(result)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [locationId])

  useEffect(() => {
    void Promise.resolve().then(loadLocationEquipment)
  }, [loadLocationEquipment])

  return {
    data,
    isLoading,
    errorMessage,
    reload: loadLocationEquipment,
  }
}
