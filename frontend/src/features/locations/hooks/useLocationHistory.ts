import { useCallback, useEffect, useState } from 'react'
import type { RequestState } from '../../../shared/hooks/requestState'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'
import type { LocationHistoryItem, PaginatedResult } from '../types/location'

// Hook de leitura: busca o histórico de movimentações de uma localização.
// Segue o mesmo padrão de useLocationEquipment.
export function useLocationHistory(
  locationId?: string,
): RequestState<PaginatedResult<LocationHistoryItem>> {
  const [data, setData] = useState<PaginatedResult<LocationHistoryItem>>()
  const [isLoading, setIsLoading] = useState(Boolean(locationId))
  const [errorMessage, setErrorMessage] = useState('')

  const loadLocationHistory = useCallback(async () => {
    if (!locationId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await locationService.getLocationHistory(locationId, {
        page: 1,
        pageSize: 20,
      })
      setData(result)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [locationId])

  useEffect(() => {
    void Promise.resolve().then(loadLocationHistory)
  }, [loadLocationHistory])

  return {
    data,
    isLoading,
    errorMessage,
    reload: loadLocationHistory,
  }
}
