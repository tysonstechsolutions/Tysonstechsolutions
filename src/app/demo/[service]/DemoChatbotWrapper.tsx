'use client'

import ServiceChatbot from '@/components/demo/ServiceChatbot'
import { allConfigs, ServiceType } from '@/data/chatbot-configs'

interface Props {
  service: string
  inline?: boolean
}

export default function DemoChatbotWrapper({ service, inline = false }: Props) {
  const config = allConfigs[service as ServiceType]

  if (!config) {
    return null
  }

  return <ServiceChatbot config={config} inline={inline} />
}
