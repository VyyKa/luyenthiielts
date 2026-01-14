import type { CSSProperties } from 'react'
import {
  FiActivity,
  FiAperture,
  FiBookOpen,
  FiBriefcase,
  FiCloud,
  FiCompass,
  FiCpu,
  FiDollarSign,
  FiFilm,
  FiGlobe,
  FiGrid,
  FiHeart,
  FiHome,
  FiImage,
  FiMapPin,
  FiMusic,
  FiNavigation,
  FiSearch,
  FiShare2,
  FiShield,
  FiSmile,
  FiStar,
  FiTool,
  FiTruck,
  FiAlertTriangle,
} from 'react-icons/fi'
import { topics } from '@/data/vocabulary'

export default function TopicIcon({
  topicId,
  className,
  style,
}: {
  topicId: string
  className?: string
  style?: CSSProperties
}) {
  const topic = topics.find((t) => t.id === topicId)
  const iconStyle = style

  const IconComponent = (() => {
    switch (topicId) {
      case 'environment':
        return FiGlobe
      case 'health':
        return FiHeart
      case 'technology':
        return FiCpu
      case 'sports':
        return FiActivity
      case 'family':
      case 'marriage':
        return FiHeart
      case 'food':
        return FiGrid
      case 'work':
        return FiBriefcase
      case 'crime':
        return FiShield
      case 'social-media':
        return FiShare2
      case 'art':
        return FiImage
      case 'weather':
        return FiCloud
      case 'movie':
        return FiFilm
      case 'advertising':
        return FiStar
      case 'city':
        return FiMapPin
      case 'money':
        return FiDollarSign
      case 'travel':
        return FiCompass
      case 'education':
        return FiBookOpen
      case 'entertainment':
        return FiMusic
      case 'celebrities':
        return FiStar
      case 'fashion':
        return FiAperture
      case 'invention':
        return FiTool
      case 'emotion':
        return FiSmile
      case 'aviation':
      case 'transportation':
        return FiNavigation
      case 'forensicscience':
        return FiSearch
      case 'astronomy':
      case 'philosophy':
        return FiAperture
      case 'leisure':
        return FiCompass
      case 'architecture':
        return FiHome
      case 'archaeology':
        return FiTool
      case 'automotive':
        return FiTruck
      case 'history':
        return FiBookOpen
      default:
        return undefined
    }
  })()

  if (IconComponent) {
    return (
      <IconComponent
        className={className}
        style={iconStyle}
        aria-label={topic ? `${topic.name} icon` : 'topic icon'}
        role="img"
      />
    )
  }

  if (!topic) {
    return <FiAlertTriangle className={className} style={iconStyle} aria-hidden="true" />
  }

  return (
    <span className={className} style={iconStyle} role="img" aria-label={`${topic.name} icon`}>
      {topic.icon}
    </span>
  )
}
