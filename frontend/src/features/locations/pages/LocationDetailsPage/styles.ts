import { Card } from 'antd'
import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  max-width: 1440px;
`

export const HeaderContainer = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const Title = styled.h1`
  margin: 0;
  color: #141b2b;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
`

export const Code = styled.span`
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 0.85fr);
  align-items: stretch;
  gap: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

export const MainColumn = styled.div`
  display: grid;
  gap: 24px;
`

export const SideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`

export const InfoCard = styled(Card)`
  border-radius: 8px;

  .ant-card-body {
    padding: 24px;
  }
`

export const CardTitle = styled.h2`
  margin: 0 0 16px;
  color: #141b2b;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`

export const InfoGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 24px;
  margin: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const InfoLabel = styled.dt`
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
`

export const InfoValue = styled.dd`
  margin: 0;
  color: #141b2b;
  font-size: 15px;
  font-weight: 600;
`

export const Timeline = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const Event = styled.li`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 16px;
  border-left: 2px solid #e1e8fd;
`

export const EventDate = styled.span`
  color: #6b7280;
  font-size: 12px;
`

export const EventTitle = styled.strong`
  color: #141b2b;
  font-size: 14px;
`

export const EventDescription = styled.span`
  color: #4b5563;
  font-size: 13px;
  line-height: 20px;
`

export const EmptyText = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 14px;
`
