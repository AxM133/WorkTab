import { useState } from 'react'
import { useInfoModal } from '@/hooks/useInfoModal'
import { AboutModal } from './AboutModal'
import { HowItWorksModal } from './HowItWorksModal'
import { LegalModal } from './LegalModal'

const MODALS = {
  about: AboutModal,
  'how-it-works': HowItWorksModal,
  rules: (props) => <LegalModal docKey="rules" {...props} />,
  security: (props) => <LegalModal docKey="security" {...props} />,
  privacy: (props) => <LegalModal docKey="privacy" {...props} />,
}

/** Показывает информационное окно по параметру ?info= в адресе. Подключается в layout'ах */
export function InfoModalHost() {
  const { current, close } = useInfoModal()
  // после закрытия помним последнее окно, чтобы оно успело проиграть анимацию исчезновения
  const [lastKey, setLastKey] = useState(current)
  if (current && current !== lastKey) setLastKey(current)

  const key = current ?? lastKey
  const ModalComponent = MODALS[key]
  if (!ModalComponent) return null

  return <ModalComponent key={key} open={Boolean(current)} onClose={close} />
}
