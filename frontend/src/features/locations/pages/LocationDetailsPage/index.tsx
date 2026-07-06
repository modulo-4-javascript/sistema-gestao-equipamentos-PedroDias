import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined'
import PinDropOutlined from '@mui/icons-material/PinDropOutlined'
import { Alert, Button, Spin } from 'antd'
import type { TableProps } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { AppLayout } from '../../../../app/layout/AppLayout'
import { DataTable } from '../../../../shared/components/DataTable'
import {
  ResourceCell,
  ResourceCode,
  ResourceIcon,
  ResourceName,
} from '../../../../shared/components/DataTable/styles'
import {
  SummaryCards,
  type SummaryCardItem,
} from '../../../../shared/components/SummaryCards'
import {
  formatEquipmentDate,
  getEquipmentStatusLabel,
  getEquipmentTypeLabel,
} from '../../../equipment/types/equipment'
import { useLocationDetails } from '../../hooks/useLocationDetails'
import { useLocationEquipment } from '../../hooks/useLocationEquipment'
import { useLocationHistory } from '../../hooks/useLocationHistory'
import {
  formatLocationDate,
  getLocationStatusLabel,
  getLocationTypeLabel,
  type LocationDetails,
  type LocationEquipment,
} from '../../types/location'
import { LocationStatusTag } from '../LocationsPage/styles'
import {
  CardTitle,
  Code,
  Container,
  ContentGrid,
  EmptyText,
  Event,
  EventDate,
  EventDescription,
  EventTitle,
  HeaderContainer,
  InfoCard,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  MainColumn,
  SideColumn,
  Timeline,
  Title,
  TitleGroup,
  TitleRow,
} from './styles'

// Monta os cards de resumo a partir dos equipamentos vinculados ao local.
function buildEquipmentSummaryCards(location: LocationDetails): SummaryCardItem[] {
  const { equipmentSummary } = location

  return [
    {
      id: 'total',
      title: 'Equipamentos',
      value: equipmentSummary.total,
      icon: 'total',
      lineColor: 'linear-gradient(90deg, #002A64, #007C8C)',
      iconBackground: '#E1E8FD',
    },
    {
      id: 'available',
      title: 'Disponíveis',
      value: equipmentSummary.available,
      icon: 'available',
      lineColor: '#25B8A7',
      iconBackground: '#E6FFFB',
    },
    {
      id: 'maintenance',
      title: 'Em manutenção',
      value: equipmentSummary.inMaintenance,
      icon: 'maintenance',
      lineColor: '#007C8C',
      iconBackground: '#E6F4FF',
    },
    {
      id: 'inactive',
      title: 'Inativos',
      value: equipmentSummary.inactive,
      icon: 'inactive',
      lineColor: '#6B7280',
      iconBackground: '#F3F4F6',
    },
  ]
}

function getLinkedEquipmentColumns(): TableProps<LocationEquipment>['columns'] {
  return [
    {
      title: 'Equipamento',
      dataIndex: 'name',
      key: 'name',
      render: (_, equipment) => (
        <ResourceCell>
          <ResourceIcon>
            <PinDropOutlined fontSize="small" />
          </ResourceIcon>
          <span>
            <ResourceName>{equipment.name}</ResourceName>
            <ResourceCode>{equipment.code}</ResourceCode>
          </span>
        </ResourceCell>
      ),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (type: LocationEquipment['type']) => getEquipmentTypeLabel(type),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: LocationEquipment['status']) => getEquipmentStatusLabel(status),
    },
    {
      title: 'Atualizado',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: LocationEquipment['updatedAt']) =>
        formatEquipmentDate(updatedAt),
    },
  ]
}

export function LocationDetailsPage() {
  const navigate = useNavigate()

  // O ID vem da URL /locations/:locationId e decide qual local buscar.
  const { locationId } = useParams()

  const locationQuery = useLocationDetails(locationId)
  const equipmentQuery = useLocationEquipment(locationId)
  const historyQuery = useLocationHistory(locationId)

  const location = locationQuery.data
  const linkedEquipment = equipmentQuery.data?.data ?? []
  const history = historyQuery.data?.data ?? []

  const loadError =
    (!locationId ? 'ID da localização não encontrado na rota.' : '') ||
    locationQuery.errorMessage

  // Enquanto o detalhe carrega, mostramos um estado simples de espera.
  if (locationQuery.isLoading) {
    return (
      <AppLayout currentPage="Localizações">
        <Container>
          <EmptyText>
            <Spin /> Carregando localização...
          </EmptyText>
        </Container>
      </AppLayout>
    )
  }

  // Se a API falhar ou o local não existir, mostramos uma mensagem de erro.
  if (loadError || !location) {
    return (
      <AppLayout currentPage="Localizações">
        <Container>
          <Alert
            showIcon
            message="Localização não encontrada"
            description={loadError || 'Não foi possível exibir esta localização.'}
            type="error"
          />
        </Container>
      </AppLayout>
    )
  }

  const summaryCards = buildEquipmentSummaryCards(location)
  const equipmentColumns = getLinkedEquipmentColumns()

  return (
    <AppLayout currentPage="Localizações">
      <Container>
        <HeaderContainer>
          <TitleGroup>
            <Button
              icon={<ArrowBackOutlined fontSize="small" />}
              type="text"
              onClick={() => navigate('/locations')}
            >
              Voltar para localizações
            </Button>

            <TitleRow>
              <Title>{location.name}</Title>
              <LocationStatusTag $status={location.status}>
                {getLocationStatusLabel(location.status)}
              </LocationStatusTag>
            </TitleRow>

            <Code>{location.code}</Code>
          </TitleGroup>
        </HeaderContainer>

        <SummaryCards
          ariaLabel="Resumo dos equipamentos da localização"
          summaries={summaryCards}
        />

        <ContentGrid>
          <MainColumn>
            <InfoCard>
              <CardTitle>Informações gerais</CardTitle>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Tipo</InfoLabel>
                  <InfoValue>{getLocationTypeLabel(location.type)}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Situação</InfoLabel>
                  <InfoValue>{getLocationStatusLabel(location.status)}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Prédio</InfoLabel>
                  <InfoValue>{location.building ?? 'Não informado'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Andar</InfoLabel>
                  <InfoValue>{location.floor ?? 'Não informado'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Sala</InfoLabel>
                  <InfoValue>{location.room ?? 'Não informado'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Atualizado em</InfoLabel>
                  <InfoValue>{formatLocationDate(location.updatedAt)}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Descrição</InfoLabel>
                  <InfoValue>{location.description ?? 'Não informado'}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </InfoCard>

            <div>
              <CardTitle>Equipamentos vinculados</CardTitle>
              <DataTable
                columns={equipmentColumns}
                dataSource={linkedEquipment}
                emptyText="Nenhum equipamento vinculado a esta localização."
                loading={equipmentQuery.isLoading}
                rowKey="id"
              />
            </div>
          </MainColumn>

          <SideColumn>
            <InfoCard>
              <CardTitle>Histórico de movimentações</CardTitle>

              {historyQuery.isLoading && (
                <EmptyText>
                  <Spin /> Carregando histórico...
                </EmptyText>
              )}

              {!historyQuery.isLoading && history.length === 0 && (
                <EmptyText>Nenhuma movimentação registrada.</EmptyText>
              )}

              {!historyQuery.isLoading && history.length > 0 && (
                <Timeline>
                  {history.map((item) => (
                    <Event key={item.id}>
                      <EventDate>{formatEquipmentDate(item.createdAt)}</EventDate>
                      <EventTitle>{item.title}</EventTitle>
                      <EventDescription>{item.description}</EventDescription>
                    </Event>
                  ))}
                </Timeline>
              )}
            </InfoCard>
          </SideColumn>
        </ContentGrid>
      </Container>
    </AppLayout>
  )
}
