import { 
  Target, 
  Users, 
  LineChart, 
  Globe, 
  Scale, 
  ShieldCheck, 
  Briefcase, 
  Activity,
  Zap,
  Award
} from 'lucide-react';

export const practitioners = [
  {
    name: "박귀수",
    role: "대표변리사 | 전) (주)셀트리온 IP 총괄 이사",
    image: "/team/park-kwisu.jpg",
    specialty: "바이오 IP 총괄 및 전략"
  }
];

export const experienceData = [
  {
    period: "2023 - Present",
    role: "BorA | Founder",
    description: "기업 임원 출신의 실질적 시각으로 차별화된 바이오 특허 컨설팅을 제공합니다.",
    highlights: [
      "국내 유일 바이오 전문 파트너로서 특허 실무와 자문 수행"
    ]
  },
  {
    period: "2010 - 2023",
    role: "Celltrion, Inc. | Senior Director, IP (Head of IP)",
    description: "글로벌 바이오시밀러 특허 업무 총괄 및 글로벌 소송 전승을 주도했습니다.",
    highlights: [
      "세계 최초 항체 바이오시밀러 글로벌 특허 조사·분석 및 소송 전략 기획",
      "Remicade, Herceptin 등 주요 품목 글로벌 특허 소송(전승) 또는 합의",
      "최고 경영진 전속 특허전략 보고 및 전사적 IP 리스크 매니지먼트 지휘",
      "바이오신약 특허 포트폴리오 구축 및 글로벌 제약사 실사(DD) 주도",
      "공동개발 및 투자 리스크 타당성 평가"
    ]
  },
  {
    period: "2009 - 2010",
    role: "YOU ME Patent & Law Firm | Patent Attorney",
    description: "국내 특허법인에서 제약 및 바이오 분야의 전문 역량을 확보했습니다.",
    highlights: [
      "제약 및 바이오 관련 특허 출원, 심사 대응 및 등록 수행"
    ]
  }
];

export const values = [
  {
    title: "Executive Perspective",
    desc: "단순 법률 의견을 넘어\n투자 수익률(ROI)과 지속 성장을 고려한\n실질적인 비즈니스 솔루션을 제시합니다.",
    icon: Briefcase
  },
  {
    title: "Global Track Record",
    desc: "세계 주요 국가의 특허 분쟁에서\n전례 없는 승리를 거둔\n독보적 전문성을 보유하고 있습니다.",
    icon: Globe
  },
  {
    title: "Bio-Specialized DNA",
    desc: "글로벌 바이오 기업 임원 출신의\n깊은 기술적 이해와 산업적 통찰을 갖춘\n국내 유일의 현장 중심 전문가입니다.",
    icon: Activity
  }
];

export const visionSteps = [
  {
    prefix: "B",
    suffix: "orn",
    target: "Bio Ventures",
    subtitle: "Establish Founding IP & Narrative",
    points: [
      "바이오 벤처의 탄탄한 특허 자산 구축",
      "투자 유치를 위한 특허 가치 스토리 구성",
      "License-out 등 특허 계약서 자문"
    ],
    icon: Target
  },
  {
    prefix: "Or",
    suffix: "ganize",
    target: "Scale-up Companies",
    subtitle: "Portfolio Optimization & Systematization",
    points: [
      "포괄적 특허 진단 및 특허 갭 분석 수행",
      "중장기적 분쟁 공격/방어 전략 기틀 확립",
      "특허 운영 시스템 최적화"
    ],
    icon: Users
  },
  {
    prefix: "A",
    suffix: "dvance",
    target: "Global Expansion",
    subtitle: "Global FTO & Strategic Management",
    points: [
      "상업화 리스크(FTO) 정밀 진단",
      "특허 전략 수립 및 분쟁 대응 자문",
      "글로벌 소송 관리"
    ],
    icon: LineChart
  }
];

export const servicesDetailed = [
  {
    title: "특허 출원 및 자산화 전략",
    titleEn: "Patent Prosecution Strategy",
    desc: "\"특허 등록을 넘어, 시장을 실질적으로 독점하는 강력한 IP 자산을 설계합니다.\"\nBorA는 글로벌 시장에서의 공격과 방어가 동시에 가능한 '자산 가치' 중심의 전방위적 특허 포트폴리오를 구축합니다.",
    boraEdge: [
      { label: "Specialist Expertise", desc: "글로벌 바이오 기업의 포트폴리오를 직접 분석한 실전 노하우 투입" },
      { label: "Global Expansion Strategy", desc: "해외 시장 진출을 선제적으로 고려한 글로벌 특허 설계" },
      { label: "Strategic Shield", desc: "바이오 의약품 특수성을 고려한 빈틈없는 경쟁사 진입 장벽 구축" }
    ],
    icon: Target,
    tasks: []
  },
  {
    title: "특허 조사",
    titleEn: "Patent Search & Surveillance",
    desc: "\"특허 리스크를 선제적으로 포착하여 사업 성공 확률을 높입니다.\"\nBorA는 기술 개발 초기 단계부터 잠재적 리스크를 파악하고 사업 성공을 이끕니다.",
    boraEdge: [
      { label: "Litigation-Ready Insight", desc: "글로벌 소송을 직접 지휘한 전문가만이 포착할 수 있는 '치명적 잠재 리스크' 정밀 추적" },
      { label: "Strategic FTO Analysis", desc: "단순 특허 조사를 넘어, 상업화 가능성을 입체적으로 진단하는 고도화된 FTO 검토" },
      { label: "Competitor Intelligence", desc: "경쟁사 핵심 특허 및 분쟁 동향의 실시간 모니터링을 통한 전략적 대응 시나리오 수립" },
      { label: "R&D Roadmap Guide", desc: "특허 조사를 통해 공백 기술을 발굴하고, 시장 우위를 점할 수 있는 연구개발 방향 제시" }
    ],
    icon: Globe,
    tasks: []
  },
  {
    title: "전략적 특허 분석",
    titleEn: "Patent Analysis",
    desc: "\"비즈니스 교착 상태를 타개하고, 시장 진입의 결정적 명분을 확보합니다.\"\nBorA는 장애특허의 무효화 가능성을 정밀 검토하고, 견고한 비침해 논리를 구축하여 특허 리스크로 막힌 사업적 통로를 열어드립니다.",
    boraEdge: [
      { label: "Victory-Proven Logic", desc: "글로벌 소송 전승을 이끌어냈던 BorA만의 철저한 무효·비침해 분석 방법론 적용" },
      { label: "Invalidity Precision", desc: "장애특허의 본질적 결함을 파고드는 입체적 분석으로 무효 논리 구축" },
      { label: "Defensive Articulation", desc: "복잡한 기술 구조를 비즈니스와 법률 언어로 재해석한 정교한 비침해 논리 설계" },
      { label: "Strategic Design-around", desc: "단순 특허 회피를 넘어, 기술 경쟁력을 유지하면서도 특허를 우회하는 최적의 회피 설계 솔루션 제안" }
    ],
    icon: Scale,
    tasks: []
  },
  {
    title: "특허 소송 및 관리",
    titleEn: "Patent Litigation & Management",
    desc: "\"글로벌 승리의 기록이 귀사의 소송 로드맵이 됩니다.\"\nBorA는 글로벌 주요 국가에서의 실전 소송 경험을 바탕으로, 승소를 위한 정교한 시나리오와 최적화된 리소스 관리 전략을 제시합니다.",
    boraEdge: [
      { label: "The Legends of Victory", desc: "글로벌 바이오시밀러 소송 13년 전승을 이끈 주역이 직접 지휘하는 압도적 리스크 매니지먼트" },
      { label: "Master Roadmap Design", desc: "복잡한 주요국 제약 소송에서 최종 승리에 도달하는 소송 로드맵 설계" },
      { label: "Elite Counsel Coordination", desc: "최적의 글로벌 로펌 선정부터 효율적인 협업 가이드까지, 불필요한 비용을 최소화하는 스마트 리소스 컨트롤" },
      { label: "Winning Logic & Evidence", desc: "승패를 결정짓는 핵심 증거 확보 및 법원을 설득하는 날카로운 기술적 변론 논리 구축" }
    ],
    icon: ShieldCheck,
    tasks: []
  },
  {
    title: "특허 협상 및 라이선싱",
    titleEn: "Patent Negotiation & Licensing",
    desc: "\"비즈니스의 가치를 숫자로 증명하고, 협상의 주도권을 확보합니다.\"\nBorA는 라이선싱 계약 협상에서 유리한 고지를 점할 수 있도록, 비즈니스 협상안을 설계합니다.",
    boraEdge: [
      { label: "Mega-Deal Experience", desc: "글로벌 바이오 기업 임원으로서 주도한 수조 원 규모의 글로벌 특허 협상 및 계약 체결 노하우" },
      { label: "Strategic Licensing", desc: "수익 극대화와 리스크 최소화를 동시에 달성하는 Licensing-in/out 구조 설계 및 정밀 계약 검토" },
      { label: "Early Dispute Resolution", desc: "소송의 실익을 냉철하게 분석하여 특허 분쟁을 조기에 종식시키는 고도의 전략적 협상" }
    ],
    icon: Users,
    tasks: []
  },
  {
    title: "전략적 IP 실사",
    titleEn: "IP Due Diligence",
    desc: "\"기술의 진실성을 증명하고, 투자의 확신을 완성합니다.\"\nBorA는 투자사나 인수자가 요구하는 최고 수준의 정교한 실사를 통해, 대상 기업의 기술적 진실성과 권리 안정성을 입체적으로 검증하여 거래의 신뢰를 구축합니다.",
    boraEdge: [
      { label: "Dual-Perspective Audit", desc: "투자자의 자본 논리와 창업자의 기술 열정을 모두 이해하는 임원 출신의 날카롭고 균형 잡힌 검증" },
      { label: "Investment Readiness", desc: "성공적인 투자 유치를 위해 특허 포트폴리오의 결함을 선제적으로 보완하고, 기업 가치를 극대화하는 사전 실사(Pre-DD) 솔루션" },
      { label: "Portfolio Integrity Scan", desc: "인수 대상 기업의 특허포트폴리오 건전성, 분쟁 가능성, 그리고 상업적 독점권을 정밀 분석하여 인수 후 리스크 최소화" },
      { label: "Tech-Evaluation Roadmap", desc: "창업 기업의 기술 차별성을 논리적으로 구조화하고 실무적인 개선 로드맵 제시" }
    ],
    icon: Award,
    tasks: []
  },
  {
    title: "IR 지원",
    titleEn: "IR Support",
    desc: "\"복잡한 특허를 시장의 언어로 재해석하여, 기업의 미래 가치를 설계합니다.\"\nBorA는 난해한 특허 뒤에 숨겨진 비즈니스 기회를 포착하고, 투자자가 확신을 가질 수 있도록 기업 가치를 극대화하는 매력적인 'IP 내러티브'를 설계합니다.",
    boraEdge: [
      { label: "Valuation-Focused Narrative", desc: "특허를 단순한 '기술 문서'가 아닌 기업의 '경제적 해자(Moat)'와 '미래 수익'으로 전환하는 독보적인 가치 중심 스토리텔링" },
      { label: "Strategic Growth Roadmap", desc: "시리즈 A부터 상장(IPO)까지, 투자 라운드별 펀딩 성공을 견인하는 단계적 IP 기반 성장 시나리오 구축" },
      { label: "Impact-Driven IP Map", desc: "기술적 우위뿐만 아니라 시장 점유율 확대를 시각적으로 증명하는 사업 중심의 전략적 특허 맵(Patent Map) 구성" },
      { label: "Investor-Targeted Q&A", desc: "VC 및 기관 투자자의 날카로운 기술적·법률적 압박 질문에 대비한 완벽한 논리 체계 및 대응 전략 수립" }
    ],
    icon: Zap,
    tasks: []
  }
];
