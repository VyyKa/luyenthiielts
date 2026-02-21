import type { CSSProperties, ComponentType } from 'react'
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
  FiCalendar,
  FiClock,
  FiUsers,
  FiDroplet,
  FiPackage,
  FiLayers,
  FiTarget,
  FiFlag,
  FiTrendingUp,
  FiType,
  FiCircle,
} from 'react-icons/fi'
import { topics } from '@/data/vocabulary'

const TOPIC_ICON_MAP: Record<string, ComponentType<{ className?: string; style?: CSSProperties; 'aria-label'?: string; role?: string }>> = {
  environment: FiGlobe,
  health: FiHeart,
  technology: FiCpu,
  education: FiBookOpen,
  travel: FiCompass,
  sports: FiActivity,
  family: FiHeart,
  food: FiGrid,
  work: FiBriefcase,
  crime: FiShield,
  'social-media': FiShare2,
  art: FiImage,
  weather: FiCloud,
  'time-calendar': FiCalendar,
  subjects: FiBookOpen,
  marketing: FiTrendingUp,
  geography: FiGlobe,
  money: FiDollarSign,
  nature: FiAperture,
  countries: FiMapPin,
  languages: FiType,
  verbs: FiActivity,
  adjectives: FiType,
  shapes: FiCircle,
  color: FiDroplet,
  time: FiClock,
  city: FiMapPin,
  places: FiMapPin,
  homes: FiHome,
  qualities: FiStar,
  architecture: FiHome,
  hobbies: FiStar,
  materials: FiPackage,
  touring: FiCompass,
  'arts-media': FiFilm,
  equipment: FiTool,
  works: FiBriefcase,
  transport: FiTruck,
  others: FiGrid,
  literature: FiBookOpen,
  psychology: FiSmile,
  biology: FiActivity,
  linguistics: FiType,
  science: FiAperture,
  anthropology: FiUsers,
  philosophy: FiAperture,
  economics: FiTrendingUp,
  finance: FiDollarSign,
  astrophysics: FiAperture,
  history: FiBookOpen,
  cosmology: FiAperture,
  criminology: FiShield,
  politics: FiFlag,
  forensics: FiSearch,
  aviation: FiNavigation,
  engineering: FiTool,
  chemistry: FiDroplet,
  ornithology: FiActivity,
  insurance: FiShield,
  archaeology: FiTool,
  law: FiShield,
  'real-estate': FiHome,
  agriculture: FiTrendingUp,
  cinematography: FiFilm,
  accounting: FiDollarSign,
  hr: FiUsers,
  marriage: FiHeart,
  movie: FiFilm,
  advertising: FiStar,
  entertainment: FiMusic,
  celebrities: FiStar,
  fashion: FiAperture,
  invention: FiTool,
  emotion: FiSmile,
  transportation: FiNavigation,
  leisure: FiCompass,
  automotive: FiTruck,
}

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
  const IconComponent = TOPIC_ICON_MAP[topicId]

  if (IconComponent) {
    return (
      <IconComponent
        className={className}
        style={style}
        aria-label={topic ? `${topic.name} icon` : 'topic icon'}
        role="img"
      />
    )
  }

  return (
    <FiAlertTriangle
      className={className}
      style={style}
      aria-label={topic ? `${topic.name} icon` : 'topic icon'}
      role="img"
    />
  )
}
