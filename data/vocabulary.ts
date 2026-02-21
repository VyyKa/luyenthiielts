export type { Vocabulary, Topic } from './vocabulary-types'
import type { Topic } from './vocabulary-types'
import { additionalTopics } from './additional-vocabulary'

export const topics: Topic[] = [
  {
    id: 'environment',
    name: 'Environment',
    nameVi: 'Môi trường',
    icon: '🌍',
    category: 'both',
    bandLevel: 7,
    vocabulary: [
      {
        word: 'climate change',
        phonetic: '/ˈklaɪmət tʃeɪndʒ/',
        meaning: 'biến đổi khí hậu',
        example: 'Climate change is one of the most pressing issues of our time.'
      },
      {
        word: 'carbon footprint',
        phonetic: '/ˈkɑːrbən ˈfʊtprɪnt/',
        meaning: 'dấu chân carbon',
        example: 'We need to reduce our carbon footprint to protect the environment.'
      },
      {
        word: 'renewable energy',
        phonetic: '/rɪˈnuːəbl ˈenərdʒi/',
        meaning: 'năng lượng tái tạo',
        example: 'Solar and wind power are forms of renewable energy.'
      },
      {
        word: 'deforestation',
        phonetic: '/diːˌfɔːrɪˈsteɪʃən/',
        meaning: 'phá rừng',
        example: 'Deforestation contributes significantly to global warming.'
      },
      {
        word: 'pollution',
        phonetic: '/pəˈluːʃən/',
        meaning: 'ô nhiễm',
        example: 'Air pollution in cities is a major health concern.'
      },
      {
        word: 'sustainability',
        phonetic: '/səˌsteɪnəˈbɪlɪti/',
        meaning: 'tính bền vững',
        example: 'Companies are focusing more on sustainability practices.'
      },
      {
        word: 'ecosystem',
        phonetic: '/ˈiːkoʊˌsɪstəm/',
        meaning: 'hệ sinh thái',
        example: 'Protecting marine ecosystems is crucial for biodiversity.'
      },
      {
        word: 'biodiversity',
        phonetic: '/ˌbaɪoʊdaɪˈvɜːrsɪti/',
        meaning: 'đa dạng sinh học',
        example: 'Tropical rainforests have the highest biodiversity on Earth.'
      },
      {
        word: 'greenhouse effect',
        phonetic: '/ˈɡriːnhaʊs ɪˈfekt/',
        meaning: 'hiệu ứng nhà kính',
        example: 'The greenhouse effect is essential for life on Earth.'
      },
      {
        word: 'emissions',
        phonetic: '/ɪˈmɪʃənz/',
        meaning: 'khí thải',
        example: 'Reducing carbon emissions is a global priority.'
      }
    ]
  },
  {
    id: 'health',
    name: 'Health',
    nameVi: 'Sức khỏe',
    icon: '💪',
    category: 'both',
    bandLevel: 6,
    vocabulary: [
      {
        word: 'wellbeing',
        phonetic: '/ˈwelbiːɪŋ/',
        meaning: 'sức khỏe, hạnh phúc',
        example: 'Regular exercise improves both physical and mental wellbeing.'
      },
      {
        word: 'nutrition',
        phonetic: '/nuˈtrɪʃən/',
        meaning: 'dinh dưỡng',
        example: 'Good nutrition is essential for a healthy lifestyle.'
      },
      {
        word: 'obesity',
        phonetic: '/oʊˈbiːsɪti/',
        meaning: 'béo phì',
        example: 'Childhood obesity has become a serious public health issue.'
      },
      {
        word: 'epidemic',
        phonetic: '/ˌepɪˈdemɪk/',
        meaning: 'dịch bệnh',
        example: 'The flu epidemic spread rapidly across the country.'
      },
      {
        word: 'preventive',
        phonetic: '/prɪˈventɪv/',
        meaning: 'phòng ngừa',
        example: 'Preventive medicine focuses on avoiding illness before it occurs.'
      },
      {
        word: 'chronic',
        phonetic: '/ˈkrɒnɪk/',
        meaning: 'mãn tính',
        example: 'Diabetes is a chronic condition that requires ongoing management.'
      },
      {
        word: 'diagnosis',
        phonetic: '/ˌdaɪəɡˈnoʊsɪs/',
        meaning: 'chẩn đoán',
        example: 'Early diagnosis can significantly improve treatment outcomes.'
      },
      {
        word: 'therapy',
        phonetic: '/ˈθerəpi/',
        meaning: 'liệu pháp, trị liệu',
        example: 'Physical therapy helped him recover from the injury.'
      },
      {
        word: 'immune system',
        phonetic: '/ɪˈmjuːn ˈsɪstəm/',
        meaning: 'hệ miễn dịch',
        example: 'A strong immune system helps fight off infections.'
      },
      {
        word: 'wellness',
        phonetic: '/ˈwelnəs/',
        meaning: 'sức khỏe tổng thể',
        example: 'Many people are now prioritizing wellness over wealth.'
      }
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    nameVi: 'Công nghệ',
    icon: '💻',
    category: 'both',
    bandLevel: 7,
    vocabulary: [
      {
        word: 'innovation',
        phonetic: '/ˌɪnəˈveɪʃən/',
        meaning: 'đổi mới, sáng tạo',
        example: 'Technological innovation has transformed how we communicate.'
      },
      {
        word: 'artificial intelligence',
        phonetic: '/ˌɑːrtɪˈfɪʃəl ɪnˈtelɪdʒəns/',
        meaning: 'trí tuệ nhân tạo',
        example: 'Artificial intelligence is revolutionizing many industries.'
      },
      {
        word: 'cybersecurity',
        phonetic: '/ˈsaɪbərsɪˌkjʊrəti/',
        meaning: 'an ninh mạng',
        example: 'Cybersecurity is crucial in protecting sensitive data.'
      },
      {
        word: 'automation',
        phonetic: '/ˌɔːtəˈmeɪʃən/',
        meaning: 'tự động hóa',
        example: 'Automation has increased productivity in manufacturing.'
      },
      {
        word: 'digitalization',
        phonetic: '/ˌdɪdʒɪtəlaɪˈzeɪʃən/',
        meaning: 'số hóa',
        example: 'The digitalization of services has made life more convenient.'
      },
      {
        word: 'algorithm',
        phonetic: '/ˈælɡərɪðəm/',
        meaning: 'thuật toán',
        example: 'Search engines use complex algorithms to rank websites.'
      },
      {
        word: 'virtual reality',
        phonetic: '/ˈvɜːrtʃuəl riˈælɪti/',
        meaning: 'thực tế ảo',
        example: 'Virtual reality is being used in education and training.'
      },
      {
        word: 'blockchain',
        phonetic: '/ˈblɒktʃeɪn/',
        meaning: 'chuỗi khối',
        example: 'Blockchain technology ensures secure and transparent transactions.'
      },
      {
        word: 'cloud computing',
        phonetic: '/klaʊd kəmˈpjuːtɪŋ/',
        meaning: 'điện toán đám mây',
        example: 'Cloud computing allows access to data from anywhere.'
      },
      {
        word: 'user interface',
        phonetic: '/ˈjuːzər ˈɪntərfeɪs/',
        meaning: 'giao diện người dùng',
        example: 'A good user interface makes software easy to use.'
      }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    nameVi: 'Giáo dục',
    icon: '📚',
    category: 'both',
    bandLevel: 6,
    vocabulary: [
      {
        word: 'curriculum',
        phonetic: '/kəˈrɪkjələm/',
        meaning: 'chương trình học',
        example: 'The new curriculum includes more practical skills.'
      },
      {
        word: 'pedagogy',
        phonetic: '/ˈpedəɡɒdʒi/',
        meaning: 'phương pháp giảng dạy',
        example: 'Modern pedagogy emphasizes student-centered learning.'
      },
      {
        word: 'literacy',
        phonetic: '/ˈlɪtərəsi/',
        meaning: 'khả năng đọc viết',
        example: 'Digital literacy is essential in today\'s world.'
      },
      {
        word: 'scholarship',
        phonetic: '/ˈskɒləʃɪp/',
        meaning: 'học bổng',
        example: 'She received a scholarship to study abroad.'
      },
      {
        word: 'tuition',
        phonetic: '/tuˈɪʃən/',
        meaning: 'học phí',
        example: 'University tuition fees have increased significantly.'
      },
      {
        word: 'academic',
        phonetic: '/ˌækəˈdemɪk/',
        meaning: 'học thuật',
        example: 'She has an impressive academic record.'
      },
      {
        word: 'enrollment',
        phonetic: '/ɪnˈroʊlmənt/',
        meaning: 'số lượng đăng ký',
        example: 'Student enrollment has increased this year.'
      },
      {
        word: 'dissertation',
        phonetic: '/ˌdɪsərˈteɪʃən/',
        meaning: 'luận văn',
        example: 'He is working on his doctoral dissertation.'
      },
      {
        word: 'mentor',
        phonetic: '/ˈmentɔːr/',
        meaning: 'người hướng dẫn',
        example: 'Having a good mentor can accelerate your career.'
      },
      {
        word: 'vocational',
        phonetic: '/voʊˈkeɪʃənəl/',
        meaning: 'dạy nghề',
        example: 'Vocational training provides practical job skills.'
      }
    ]
  },
  {
    id: 'travel',
    name: 'Travel',
    nameVi: 'Du lịch',
    icon: '✈️',
    category: 'speaking',
    bandLevel: 6,
    vocabulary: [
      {
        word: 'itinerary',
        phonetic: '/aɪˈtɪnərəri/',
        meaning: 'lịch trình',
        example: 'We planned a detailed itinerary for our trip.'
      },
      {
        word: 'destination',
        phonetic: '/ˌdestɪˈneɪʃən/',
        meaning: 'điểm đến',
        example: 'Paris is a popular tourist destination.'
      },
      {
        word: 'accommodation',
        phonetic: '/əˌkɒməˈdeɪʃən/',
        meaning: 'chỗ ở',
        example: 'We booked our accommodation in advance.'
      },
      {
        word: 'sightseeing',
        phonetic: '/ˈsaɪtsiːɪŋ/',
        meaning: 'tham quan',
        example: 'We spent the day sightseeing in the old town.'
      },
      {
        word: 'backpacking',
        phonetic: '/ˈbækpækɪŋ/',
        meaning: 'du lịch ba lô',
        example: 'Backpacking through Europe was an amazing experience.'
      },
      {
        word: 'heritage',
        phonetic: '/ˈherɪtɪdʒ/',
        meaning: 'di sản',
        example: 'The city is famous for its cultural heritage.'
      },
      {
        word: 'landmark',
        phonetic: '/ˈlændmɑːrk/',
        meaning: 'địa danh',
        example: 'The Eiffel Tower is an iconic landmark.'
      },
      {
        word: 'jet lag',
        phonetic: '/dʒet læɡ/',
        meaning: 'lệch múi giờ',
        example: 'I suffered from jet lag after the long flight.'
      },
      {
        word: 'excursion',
        phonetic: '/ɪkˈskɜːrʒən/',
        meaning: 'chuyến tham quan',
        example: 'We went on an excursion to the mountains.'
      },
      {
        word: 'hospitality',
        phonetic: '/ˌhɒspɪˈtælɪti/',
        meaning: 'lòng hiếu khách',
        example: 'The locals showed us great hospitality.'
      }
    ]
  },
  {
    id: 'sports',
    name: 'Sports',
    nameVi: 'Thể thao',
    icon: '⚽',
    category: 'speaking',
    bandLevel: 6,
    vocabulary: [
      {
        word: 'athlete',
        phonetic: '/ˈæθliːt/',
        meaning: 'vận động viên',
        example: 'She is a professional athlete competing internationally.'
      },
      {
        word: 'competition',
        phonetic: '/ˌkɒmpɪˈtɪʃən/',
        meaning: 'cuộc thi đấu',
        example: 'The competition was fierce but fair.'
      },
      {
        word: 'endurance',
        phonetic: '/ɪnˈdjʊrəns/',
        meaning: 'sức bền',
        example: 'Marathon running requires great endurance.'
      },
      {
        word: 'tournament',
        phonetic: '/ˈtʊrnəmənt/',
        meaning: 'giải đấu',
        example: 'The tennis tournament attracted top players.'
      },
      {
        word: 'stadium',
        phonetic: '/ˈsteɪdiəm/',
        meaning: 'sân vận động',
        example: 'The new stadium can hold 50,000 spectators.'
      },
      {
        word: 'championship',
        phonetic: '/ˈtʃæmpiənʃɪp/',
        meaning: 'chức vô địch',
        example: 'They won the championship for the third time.'
      },
      {
        word: 'fitness',
        phonetic: '/ˈfɪtnəs/',
        meaning: 'thể lực',
        example: 'Regular exercise improves overall fitness.'
      },
      {
        word: 'teamwork',
        phonetic: '/ˈtiːmwɜːrk/',
        meaning: 'làm việc nhóm',
        example: 'Success in team sports requires good teamwork.'
      },
      {
        word: 'trophy',
        phonetic: '/ˈtroʊfi/',
        meaning: 'cúp, giải thưởng',
        example: 'The team lifted the trophy after winning the final.'
      },
      {
        word: 'spectator',
        phonetic: '/ˈspekteɪtər/',
        meaning: 'khán giả',
        example: 'Thousands of spectators watched the match.'
      }
    ]
  },
  {
    id: 'family',
    name: 'Family',
    nameVi: 'Gia đình',
    icon: '👨‍👩‍👧‍👦',
    category: 'speaking',
    bandLevel: 5,
    vocabulary: [
      {
        word: 'nuclear family',
        phonetic: '/ˈnuːkliər ˈfæməli/',
        meaning: 'gia đình hạt nhân',
        example: 'A nuclear family typically consists of parents and children.'
      },
      {
        word: 'extended family',
        phonetic: '/ɪkˈstendɪd ˈfæməli/',
        meaning: 'gia đình mở rộng',
        example: 'In many cultures, extended families live together.'
      },
      {
        word: 'generation',
        phonetic: '/ˌdʒenəˈreɪʃən/',
        meaning: 'thế hệ',
        example: 'There is often a gap between different generations.'
      },
      {
        word: 'sibling',
        phonetic: '/ˈsɪblɪŋ/',
        meaning: 'anh chị em',
        example: 'I have two siblings, an older brother and a younger sister.'
      },
      {
        word: 'ancestry',
        phonetic: '/ˈænsestri/',
        meaning: 'tổ tiên',
        example: 'She is researching her family ancestry.'
      },
      {
        word: 'heritage',
        phonetic: '/ˈherɪtɪdʒ/',
        meaning: 'di sản',
        example: 'We should preserve our cultural heritage.'
      },
      {
        word: 'household',
        phonetic: '/ˈhaʊshoʊld/',
        meaning: 'hộ gia đình',
        example: 'The average household size has decreased.'
      },
      {
        word: 'upbringing',
        phonetic: '/ˈʌpbrɪŋɪŋ/',
        meaning: 'cách nuôi dạy',
        example: 'Her strict upbringing shaped her character.'
      },
      {
        word: 'kinship',
        phonetic: '/ˈkɪnʃɪp/',
        meaning: 'quan hệ họ hàng',
        example: 'Strong kinship bonds are important in many societies.'
      },
      {
        word: 'guardian',
        phonetic: '/ˈɡɑːrdiən/',
        meaning: 'người giám hộ',
        example: 'Her aunt became her legal guardian.'
      }
    ]
  },
  {
    id: 'food',
    name: 'Food & Drinks',
    nameVi: 'Đồ ăn & Thức uống',
    icon: '🍔',
    category: 'speaking',
    bandLevel: 5,
    vocabulary: [
      {
        word: 'cuisine',
        phonetic: '/kwɪˈziːn/',
        meaning: 'ẩm thực',
        example: 'Italian cuisine is famous worldwide.'
      },
      {
        word: 'ingredient',
        phonetic: '/ɪnˈɡriːdiənt/',
        meaning: 'nguyên liệu',
        example: 'Fresh ingredients make the best dishes.'
      },
      {
        word: 'appetizer',
        phonetic: '/ˈæpɪtaɪzər/',
        meaning: 'món khai vị',
        example: 'We ordered some appetizers before the main course.'
      },
      {
        word: 'beverage',
        phonetic: '/ˈbevərɪdʒ/',
        meaning: 'đồ uống',
        example: 'Hot beverages are popular in winter.'
      },
      {
        word: 'nutrition',
        phonetic: '/nuˈtrɪʃən/',
        meaning: 'dinh dưỡng',
        example: 'Good nutrition is essential for health.'
      },
      {
        word: 'delicacy',
        phonetic: '/ˈdelɪkəsi/',
        meaning: 'món ngon',
        example: 'This dish is considered a local delicacy.'
      },
      {
        word: 'gourmet',
        phonetic: '/ˈɡʊrmeɪ/',
        meaning: 'sành ăn',
        example: 'The restaurant serves gourmet food.'
      },
      {
        word: 'recipe',
        phonetic: '/ˈresəpi/',
        meaning: 'công thức',
        example: 'I followed the recipe exactly.'
      },
      {
        word: 'flavor',
        phonetic: '/ˈfleɪvər/',
        meaning: 'hương vị',
        example: 'The soup has a rich, savory flavor.'
      },
      {
        word: 'dietary',
        phonetic: '/ˈdaɪəteri/',
        meaning: 'chế độ ăn',
        example: 'She has specific dietary requirements.'
      }
    ]
  },
  {
    id: 'work',
    name: 'Work & Career',
    nameVi: 'Công việc & Sự nghiệp',
    icon: '💼',
    category: 'both',
    bandLevel: 6,
    vocabulary: [
      {
        word: 'profession',
        phonetic: '/prəˈfeʃən/',
        meaning: 'nghề nghiệp',
        example: 'Teaching is a noble profession.'
      },
      {
        word: 'colleague',
        phonetic: '/ˈkɒliːɡ/',
        meaning: 'đồng nghiệp',
        example: 'I get along well with my colleagues.'
      },
      {
        word: 'deadline',
        phonetic: '/ˈdedlaɪn/',
        meaning: 'hạn chót',
        example: 'We need to meet the deadline.'
      },
      {
        word: 'promotion',
        phonetic: '/prəˈmoʊʃən/',
        meaning: 'thăng chức',
        example: 'She received a promotion last month.'
      },
      {
        word: 'resume',
        phonetic: '/ˈrezjumeɪ/',
        meaning: 'sơ yếu lý lịch',
        example: 'I updated my resume for the job application.'
      },
      {
        word: 'workplace',
        phonetic: '/ˈwɜːrkpleɪs/',
        meaning: 'nơi làm việc',
        example: 'A positive workplace environment boosts productivity.'
      },
      {
        word: 'entrepreneur',
        phonetic: '/ˌɒntrəprəˈnɜːr/',
        meaning: 'doanh nhân',
        example: 'She is a successful entrepreneur.'
      },
      {
        word: 'freelance',
        phonetic: '/ˈfriːlæns/',
        meaning: 'làm tự do',
        example: 'He works as a freelance designer.'
      },
      {
        word: 'salary',
        phonetic: '/ˈsæləri/',
        meaning: 'lương',
        example: 'The salary is competitive for this position.'
      },
      {
        word: 'workload',
        phonetic: '/ˈwɜːrkloʊd/',
        meaning: 'khối lượng công việc',
        example: 'The workload has increased significantly.'
      }
    ]
  },
  {
    id: 'crime',
    name: 'Crime & Punishment',
    nameVi: 'Tội phạm & Hình phạt',
    icon: '⚖️',
    category: 'writing',
    bandLevel: 7,
    vocabulary: [
      {
        word: 'offense',
        phonetic: '/əˈfens/',
        meaning: 'tội phạm',
        example: 'Committing a serious offense can lead to imprisonment.'
      },
      {
        word: 'conviction',
        phonetic: '/kənˈvɪkʃən/',
        meaning: 'kết án',
        example: 'The conviction was based on strong evidence.'
      },
      {
        word: 'rehabilitation',
        phonetic: '/ˌriːhəˌbɪlɪˈteɪʃən/',
        meaning: 'phục hồi',
        example: 'Rehabilitation programs help offenders reintegrate into society.'
      },
      {
        word: 'deterrent',
        phonetic: '/dɪˈtɜːrənt/',
        meaning: 'răn đe',
        example: 'Harsh penalties serve as a deterrent to crime.'
      },
      {
        word: 'justice',
        phonetic: '/ˈdʒʌstɪs/',
        meaning: 'công lý',
        example: 'The justice system must be fair and impartial.'
      },
      {
        word: 'witness',
        phonetic: '/ˈwɪtnəs/',
        meaning: 'nhân chứng',
        example: 'The witness testified in court.'
      },
      {
        word: 'sentence',
        phonetic: '/ˈsentəns/',
        meaning: 'bản án',
        example: 'The judge delivered a harsh sentence.'
      },
      {
        word: 'parole',
        phonetic: '/pəˈroʊl/',
        meaning: 'tạm tha',
        example: 'He was released on parole after five years.'
      },
      {
        word: 'prosecution',
        phonetic: '/ˌprɒsɪˈkjuːʃən/',
        meaning: 'truy tố',
        example: 'The prosecution presented strong evidence.'
      },
      {
        word: 'verdict',
        phonetic: '/ˈvɜːrdɪkt/',
        meaning: 'phán quyết',
        example: 'The jury reached a unanimous verdict.'
      }
    ]
  },
  {
    id: 'social-media',
    name: 'Social Media',
    nameVi: 'Mạng xã hội',
    icon: '📱',
    category: 'both',
    bandLevel: 6,
    vocabulary: [
      {
        word: 'platform',
        phonetic: '/ˈplætfɔːrm/',
        meaning: 'nền tảng',
        example: 'Social media platforms connect people worldwide.'
      },
      {
        word: 'influencer',
        phonetic: '/ˈɪnfluənsər/',
        meaning: 'người có ảnh hưởng',
        example: 'Social media influencers have large followings.'
      },
      {
        word: 'viral',
        phonetic: '/ˈvaɪrəl/',
        meaning: 'lan truyền',
        example: 'The video went viral overnight.'
      },
      {
        word: 'privacy',
        phonetic: '/ˈpraɪvəsi/',
        meaning: 'quyền riêng tư',
        example: 'Privacy concerns are growing on social media.'
      },
      {
        word: 'cyberbullying',
        phonetic: '/ˈsaɪbərˌbʊliɪŋ/',
        meaning: 'bắt nạt trên mạng',
        example: 'Cyberbullying is a serious problem among teenagers.'
      },
      {
        word: 'trending',
        phonetic: '/ˈtrendɪŋ/',
        meaning: 'xu hướng',
        example: 'This topic is trending on Twitter.'
      },
      {
        word: 'engagement',
        phonetic: '/ɪnˈɡeɪdʒmənt/',
        meaning: 'tương tác',
        example: 'High engagement rates indicate popular content.'
      },
      {
        word: 'algorithm',
        phonetic: '/ˈælɡərɪðəm/',
        meaning: 'thuật toán',
        example: 'The platform\'s algorithm determines what you see.'
      },
      {
        word: 'authenticity',
        phonetic: '/ˌɔːθenˈtɪsɪti/',
        meaning: 'tính xác thực',
        example: 'Users value authenticity in social media content.'
      },
      {
        word: 'hashtag',
        phonetic: '/ˈhæʃtæɡ/',
        meaning: 'thẻ bắt đầu bằng #',
        example: 'The hashtag became popular worldwide.'
      }
    ]
  },
  {
    id: 'art',
    name: 'Art & Music',
    nameVi: 'Nghệ thuật & Âm nhạc',
    icon: '🎨',
    category: 'speaking',
    bandLevel: 6,
    vocabulary: [
      {
        word: 'aesthetic',
        phonetic: '/esˈθetɪk/',
        meaning: 'thẩm mỹ',
        example: 'The painting has great aesthetic appeal.'
      },
      {
        word: 'masterpiece',
        phonetic: '/ˈmæstərpiːs/',
        meaning: 'kiệt tác',
        example: 'This painting is considered a masterpiece.'
      },
      {
        word: 'gallery',
        phonetic: '/ˈɡæləri/',
        meaning: 'phòng trưng bày',
        example: 'We visited the art gallery last weekend.'
      },
      {
        word: 'exhibition',
        phonetic: '/ˌeksɪˈbɪʃən/',
        meaning: 'triển lãm',
        example: 'The exhibition attracted many visitors.'
      },
      {
        word: 'symphony',
        phonetic: '/ˈsɪmfəni/',
        meaning: 'bản giao hưởng',
        example: 'The orchestra performed a beautiful symphony.'
      },
      {
        word: 'melody',
        phonetic: '/ˈmelədi/',
        meaning: 'giai điệu',
        example: 'The melody is catchy and memorable.'
      },
      {
        word: 'portrait',
        phonetic: '/ˈpɔːrtrɪt/',
        meaning: 'chân dung',
        example: 'She painted a beautiful portrait of her mother.'
      },
      {
        word: 'sculpture',
        phonetic: '/ˈskʌlptʃər/',
        meaning: 'tác phẩm điêu khắc',
        example: 'The sculpture stands in the town square.'
      },
      {
        word: 'composition',
        phonetic: '/ˌkɒmpəˈzɪʃən/',
        meaning: 'tác phẩm',
        example: 'This musical composition is very complex.'
      },
      {
        word: 'inspiration',
        phonetic: '/ˌɪnspəˈreɪʃən/',
        meaning: 'cảm hứng',
        example: 'Nature is a source of inspiration for many artists.'
      }
    ]
  },
  {
    id: 'weather',
    name: 'Weather',
    nameVi: 'Thời tiết',
    icon: '🌤️',
    category: 'speaking',
    bandLevel: 5,
    vocabulary: [
      {
        word: 'forecast',
        phonetic: '/ˈfɔːrkæst/',
        meaning: 'dự báo',
        example: 'The weather forecast predicts rain tomorrow.'
      },
      {
        word: 'precipitation',
        phonetic: '/prɪˌsɪpɪˈteɪʃən/',
        meaning: 'lượng mưa',
        example: 'Heavy precipitation is expected this week.'
      },
      {
        word: 'humidity',
        phonetic: '/hjuˈmɪdɪti/',
        meaning: 'độ ẩm',
        example: 'High humidity makes the heat feel worse.'
      },
      {
        word: 'temperature',
        phonetic: '/ˈtemprətʃər/',
        meaning: 'nhiệt độ',
        example: 'The temperature dropped below freezing.'
      },
      {
        word: 'climate',
        phonetic: '/ˈklaɪmət/',
        meaning: 'khí hậu',
        example: 'The tropical climate is warm year-round.'
      },
      {
        word: 'drought',
        phonetic: '/draʊt/',
        meaning: 'hạn hán',
        example: 'The region is experiencing severe drought.'
      },
      {
        word: 'blizzard',
        phonetic: '/ˈblɪzərd/',
        meaning: 'bão tuyết',
        example: 'The blizzard closed schools and roads.'
      },
      {
        word: 'hurricane',
        phonetic: '/ˈhɜːrəkeɪn/',
        meaning: 'bão',
        example: 'The hurricane caused widespread damage.'
      },
      {
        word: 'meteorology',
        phonetic: '/ˌmiːtiəˈrɒlədʒi/',
        meaning: 'khí tượng học',
        example: 'Meteorology helps us understand weather patterns.'
      },
      {
        word: 'atmosphere',
        phonetic: '/ˈætməsfɪər/',
        meaning: 'khí quyển',
        example: 'The atmosphere affects weather conditions.'
      }
    ]
  },
  ...additionalTopics
];

export const topicGroups = {
  popular: ['environment', 'health', 'technology', 'education', 'travel', 'money', 'work', 'art'],
  writing: ['environment', 'technology', 'education', 'work', 'crime', 'art'],
  speaking: ['health', 'travel', 'sports', 'family', 'food', 'weather', 'social-media']
}

export const topicMeta: Record<string, { description?: string; count?: number; badge?: string }> = Object.fromEntries(
  topics.map(t => [t.id, { description: t.nameVi, count: t.vocabulary.length }])
)
