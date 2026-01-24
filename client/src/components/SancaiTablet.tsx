"use client"

import { useEffect, useState, useMemo } from "react"
import { Brain, Shield, Crown, Sparkles, Lock, Flame, Heart, Star } from "lucide-react"

// ============================================================
// CSS STYLES - 自定义动画
// ============================================================
const styles = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes float-particle {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)); }
  50% { filter: drop-shadow(0 0 40px rgba(255, 215, 0, 0.9)); }
}
@keyframes glow-pulse-cyan {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.6)); }
  50% { filter: drop-shadow(0 0 40px rgba(6, 182, 212, 0.9)); }
}
@keyframes glow-pulse-purple {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.6)); }
  50% { filter: drop-shadow(0 0 40px rgba(147, 51, 234, 0.9)); }
}
@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}
@keyframes ring-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-float-particle { animation: float-particle 5s ease-in-out infinite; }
.animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
.animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
.animate-glow-pulse-cyan { animation: glow-pulse-cyan 2s ease-in-out infinite; }
.animate-glow-pulse-purple { animation: glow-pulse-purple 2s ease-in-out infinite; }
.animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
.animate-ring-rotate { animation: ring-rotate 20s linear infinite; }
`

// ============================================================
// UTILITY FUNCTION
// ============================================================
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// ============================================================
// TYPES
// ============================================================

/** 三才类型：S=帅才, J=将才, H=慧才 */
export type TalentType = "S" | "J" | "H"

/** 三才分数对象 */
export interface SancaiScores {
  S: number  // 帅才分数
  J: number  // 将才分数
  H: number  // 慧才分数
}

/** 组件 Props */
export interface SancaiTabletProps {
  /** 三才分数数据 */
  sancaiScores: SancaiScores
  /** 是否显示标题 */
  showHeader?: boolean
  /** 是否显示底部统计 */
  showFooter?: boolean
  /** 是否显示蜕变环 */
  showTransformation?: boolean
}

/** 排序后的才型数据 */
interface RankedTalent {
  type: TalentType
  score: number
  rank: "high" | "medium" | "low"
}

/** 才型配置 */
interface TalentConfig {
  name: string        // 中文名称
  subtitle: string    // 副标题
  moXin: string       // 魔心
  tianXin: string     // 天心
  icon: React.ReactNode
  colorScheme: "shuai" | "jiang" | "hui"
}

// ============================================================
// 才型配置映射
// ============================================================
const TALENT_CONFIG: Record<TalentType, TalentConfig> = {
  S: {
    name: "帅才",
    subtitle: "统帅之魂",
    moXin: "虚荣",
    tianXin: "义",
    icon: <Crown className="h-full w-full" />,
    colorScheme: "shuai",
  },
  J: {
    name: "将才",
    subtitle: "守护之心",
    moXin: "多疑",
    tianXin: "仁",
    icon: <Shield className="h-full w-full" />,
    colorScheme: "jiang",
  },
  H: {
    name: "慧才",
    subtitle: "智慧之眼",
    moXin: "嫉妒/吝啬",
    tianXin: "智",
    icon: <Brain className="h-full w-full" />,
    colorScheme: "hui",
  },
}

// ============================================================
// 色彩方案配置
// ============================================================
const COLOR_SCHEMES = {
  // 帅才：金橙色系
  shuai: {
    high: {
      glow: "shadow-[0_0_60px_rgba(255,215,0,0.4),0_0_120px_rgba(255,165,0,0.3),inset_0_0_60px_rgba(255,215,0,0.1)]",
      border: "border-amber-400/60",
      bg: "bg-gradient-to-br from-amber-950/40 via-orange-950/30 to-amber-950/40",
      text: "text-amber-300",
      accent: "from-amber-400 via-yellow-300 to-orange-500",
      progressBg: "bg-amber-950/50",
      progressFill: "bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500",
      iconGlow: "drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]",
      glowAnimation: "animate-glow-pulse",
      moXinColor: "text-red-400 bg-red-500/20 border-red-500/50",
      tianXinColor: "text-amber-400 bg-amber-500/20 border-amber-500/50",
    },
    medium: {
      glow: "shadow-[0_0_40px_rgba(255,215,0,0.2),0_0_80px_rgba(255,165,0,0.15),inset_0_0_40px_rgba(255,215,0,0.05)]",
      border: "border-amber-500/40",
      bg: "bg-gradient-to-br from-amber-950/30 via-orange-950/20 to-amber-950/30",
      text: "text-amber-400",
      accent: "from-amber-500 via-yellow-400 to-orange-500",
      progressBg: "bg-amber-950/50",
      progressFill: "bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500",
      iconGlow: "drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]",
      glowAnimation: "",
      moXinColor: "text-red-400 bg-red-500/20 border-red-500/50",
      tianXinColor: "text-amber-400 bg-amber-500/20 border-amber-500/50",
    },
    low: {
      glow: "shadow-[0_0_30px_rgba(255,215,0,0.1),0_0_60px_rgba(255,165,0,0.08),inset_0_0_30px_rgba(255,215,0,0.03)]",
      border: "border-amber-600/30",
      bg: "bg-gradient-to-br from-amber-950/20 via-gray-950/30 to-amber-950/20",
      text: "text-amber-500/70",
      accent: "from-amber-600 via-yellow-500 to-orange-600",
      progressBg: "bg-amber-950/30",
      progressFill: "bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600",
      iconGlow: "drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]",
      glowAnimation: "",
      moXinColor: "text-red-400/70 bg-red-500/10 border-red-500/30",
      tianXinColor: "text-amber-400/70 bg-amber-500/10 border-amber-500/30",
    },
  },
  // 将才：天青色系
  jiang: {
    high: {
      glow: "shadow-[0_0_60px_rgba(6,182,212,0.4),0_0_120px_rgba(59,130,246,0.3),inset_0_0_60px_rgba(6,182,212,0.1)]",
      border: "border-cyan-400/60",
      bg: "bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-cyan-950/40",
      text: "text-cyan-300",
      accent: "from-cyan-400 via-blue-400 to-teal-500",
      progressBg: "bg-cyan-950/50",
      progressFill: "bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-500",
      iconGlow: "drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]",
      glowAnimation: "animate-glow-pulse-cyan",
      moXinColor: "text-yellow-400 bg-yellow-500/20 border-yellow-500/50",
      tianXinColor: "text-cyan-400 bg-cyan-500/20 border-cyan-500/50",
    },
    medium: {
      glow: "shadow-[0_0_40px_rgba(6,182,212,0.2),0_0_80px_rgba(59,130,246,0.15),inset_0_0_40px_rgba(6,182,212,0.05)]",
      border: "border-cyan-500/40",
      bg: "bg-gradient-to-br from-cyan-950/30 via-blue-950/20 to-cyan-950/30",
      text: "text-cyan-400",
      accent: "from-cyan-500 via-blue-400 to-teal-500",
      progressBg: "bg-cyan-950/50",
      progressFill: "bg-gradient-to-r from-cyan-500 via-blue-400 to-teal-500",
      iconGlow: "drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]",
      glowAnimation: "",
      moXinColor: "text-yellow-400 bg-yellow-500/20 border-yellow-500/50",
      tianXinColor: "text-cyan-400 bg-cyan-500/20 border-cyan-500/50",
    },
    low: {
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.1),0_0_60px_rgba(59,130,246,0.08),inset_0_0_30px_rgba(6,182,212,0.03)]",
      border: "border-cyan-600/30",
      bg: "bg-gradient-to-br from-cyan-950/20 via-gray-950/30 to-cyan-950/20",
      text: "text-cyan-500/70",
      accent: "from-cyan-600 via-blue-500 to-teal-600",
      progressBg: "bg-cyan-950/30",
      progressFill: "bg-gradient-to-r from-cyan-600 via-blue-500 to-teal-600",
      iconGlow: "drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]",
      glowAnimation: "",
      moXinColor: "text-yellow-400/70 bg-yellow-500/10 border-yellow-500/30",
      tianXinColor: "text-cyan-400/70 bg-cyan-500/10 border-cyan-500/30",
    },
  },
  // 慧才：神秘紫色系
  hui: {
    high: {
      glow: "shadow-[0_0_60px_rgba(147,51,234,0.4),0_0_120px_rgba(139,92,246,0.3),inset_0_0_60px_rgba(147,51,234,0.1)]",
      border: "border-purple-400/60",
      bg: "bg-gradient-to-br from-purple-950/40 via-violet-950/30 to-purple-950/40",
      text: "text-purple-300",
      accent: "from-purple-400 via-violet-400 to-fuchsia-500",
      progressBg: "bg-purple-950/50",
      progressFill: "bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-500",
      iconGlow: "drop-shadow-[0_0_20px_rgba(147,51,234,0.8)]",
      glowAnimation: "animate-glow-pulse-purple",
      moXinColor: "text-green-400 bg-green-500/20 border-green-500/50",
      tianXinColor: "text-purple-400 bg-purple-500/20 border-purple-500/50",
    },
    medium: {
      glow: "shadow-[0_0_40px_rgba(147,51,234,0.2),0_0_80px_rgba(139,92,246,0.15),inset_0_0_40px_rgba(147,51,234,0.05)]",
      border: "border-purple-500/40",
      bg: "bg-gradient-to-br from-purple-950/30 via-violet-950/20 to-purple-950/30",
      text: "text-purple-400",
      accent: "from-purple-500 via-violet-400 to-fuchsia-500",
      progressBg: "bg-purple-950/50",
      progressFill: "bg-gradient-to-r from-purple-500 via-violet-400 to-fuchsia-500",
      iconGlow: "drop-shadow-[0_0_15px_rgba(147,51,234,0.6)]",
      glowAnimation: "",
      moXinColor: "text-green-400 bg-green-500/20 border-green-500/50",
      tianXinColor: "text-purple-400 bg-purple-500/20 border-purple-500/50",
    },
    low: {
      glow: "shadow-[0_0_30px_rgba(147,51,234,0.1),0_0_60px_rgba(139,92,246,0.08),inset_0_0_30px_rgba(147,51,234,0.03)]",
      border: "border-purple-600/30",
      bg: "bg-gradient-to-br from-purple-950/20 via-gray-950/30 to-purple-950/20",
      text: "text-purple-500/70",
      accent: "from-purple-600 via-violet-500 to-fuchsia-600",
      progressBg: "bg-purple-950/30",
      progressFill: "bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-600",
      iconGlow: "drop-shadow-[0_0_10px_rgba(147,51,234,0.4)]",
      glowAnimation: "",
      moXinColor: "text-green-400/70 bg-green-500/10 border-green-500/30",
      tianXinColor: "text-purple-400/70 bg-purple-500/10 border-purple-500/30",
    },
  },
}

// ============================================================
// PARTICLE FIELD COMPONENT
// ============================================================
function ParticleField({ colorScheme }: { colorScheme: "shuai" | "jiang" | "hui" }) {
  const particleColor = {
    shuai: "bg-amber-400/60",
    jiang: "bg-cyan-400/60",
    hui: "bg-purple-400/60",
  }[colorScheme]

  const secondaryColor = {
    shuai: "bg-orange-400/40",
    jiang: "bg-blue-400/40",
    hui: "bg-violet-400/40",
  }[colorScheme]

  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
    }))
  }, [])

  const secondaryParticles = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 3}s`,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={cn("absolute h-1 w-1 rounded-full animate-float-particle", particleColor)}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
      {secondaryParticles.map((p) => (
        <div
          key={`secondary-${p.id}`}
          className={cn("absolute h-1.5 w-1.5 rounded-full animate-float-particle", secondaryColor)}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}

// ============================================================
// BACKGROUND EFFECTS COMPONENT
// ============================================================
function BackgroundEffects() {
  const stars = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 3}s`,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(88,28,135,0.2)_0%,transparent_70%)] rounded-full blur-3xl" />
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute h-0.5 w-0.5 rounded-full bg-cyan-400/30 animate-twinkle"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  )
}

// ============================================================
// TRANSFORMATION RING COMPONENT (蜕变环)
// ============================================================
function TransformationRing({
  moXin,
  tianXin,
  moXinColor,
  tianXinColor,
  isCenter,
}: {
  moXin: string
  tianXin: string
  moXinColor: string
  tianXinColor: string
  isCenter: boolean
}) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-white/10", isCenter ? "px-2" : "px-1")}>
      <div className="flex items-center justify-center gap-3">
        {/* 魔心 */}
        <div className="flex items-center gap-1.5">
          <div className={cn("p-1 rounded-full border", moXinColor)}>
            <Flame className={cn("text-current", isCenter ? "h-3 w-3" : "h-2.5 w-2.5")} />
          </div>
          <div className="text-center">
            <p className={cn("text-gray-500", isCenter ? "text-[10px]" : "text-[8px]")}>魔心</p>
            <p className={cn("font-bold", moXinColor.split(" ")[0], isCenter ? "text-xs" : "text-[10px]")}>
              {moXin}
            </p>
          </div>
        </div>

        {/* 箭头 */}
        <div className="flex items-center gap-1">
          <div className="w-4 h-0.5 bg-gradient-to-r from-red-500/50 to-transparent" />
          <Star className={cn("text-white/30", isCenter ? "h-3 w-3" : "h-2.5 w-2.5")} />
          <div className="w-4 h-0.5 bg-gradient-to-r from-transparent to-amber-500/50" />
        </div>

        {/* 天心 */}
        <div className="flex items-center gap-1.5">
          <div className="text-center">
            <p className={cn("text-gray-500", isCenter ? "text-[10px]" : "text-[8px]")}>天心</p>
            <p className={cn("font-bold", tianXinColor.split(" ")[0], isCenter ? "text-xs" : "text-[10px]")}>
              {tianXin}
            </p>
          </div>
          <div className={cn("p-1 rounded-full border", tianXinColor)}>
            <Heart className={cn("text-current", isCenter ? "h-3 w-3" : "h-2.5 w-2.5")} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// TALENT CARD COMPONENT
// ============================================================
interface TalentCardProps {
  talentType: TalentType
  score: number
  rank: "high" | "medium" | "low"
  showTransformation: boolean
}

function TalentCard({ talentType, score, rank, showTransformation }: TalentCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const config = TALENT_CONFIG[talentType]
  const colorScheme = COLOR_SCHEMES[config.colorScheme][rank]
  const isCenter = rank === "high"
  const maxScore = 100

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = score / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= score) {
        setAnimatedScore(score)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [score])

  const percentage = (score / maxScore) * 100

  const rankLabels = {
    high: "天命高才",
    medium: "器用中才",
    low: "觉醒低才",
  }

  const statusLabels = {
    high: "天命激活",
    medium: "器用稳定",
    low: "等待觉醒",
  }

  return (
    <div
      className={cn(
        "relative group transition-all duration-500 ease-out",
        isCenter ? "z-20 scale-100" : "z-10 scale-90 opacity-90 hover:opacity-100",
        isHovered && !isCenter && "scale-95"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow ring */}
      <div
        className={cn(
          "absolute -inset-1 rounded-2xl opacity-75 blur-sm transition-opacity duration-500",
          `bg-gradient-to-r ${colorScheme.accent}`,
          isCenter ? "opacity-60" : "opacity-30 group-hover:opacity-50"
        )}
      />

      {/* Main card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border-2 backdrop-blur-xl transition-all duration-500",
          colorScheme.glow,
          colorScheme.border,
          colorScheme.bg,
          isCenter ? "p-6 min-h-[420px]" : "p-5 min-h-[360px]"
        )}
      >
        {/* Rune pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id={`runes-${talentType}-${rank}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M10 0L20 10L10 20L0 10Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className={colorScheme.text}
                />
                <circle cx="10" cy="10" r="2" fill="currentColor" className={colorScheme.text} />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill={`url(#runes-${talentType}-${rank})`} />
          </svg>
        </div>

        {/* Corner accents */}
        <div className={cn("absolute top-0 left-0 h-8 w-8 border-l-2 border-t-2 rounded-tl-xl", colorScheme.border)} />
        <div className={cn("absolute top-0 right-0 h-8 w-8 border-r-2 border-t-2 rounded-tr-xl", colorScheme.border)} />
        <div className={cn("absolute bottom-0 left-0 h-8 w-8 border-l-2 border-b-2 rounded-bl-xl", colorScheme.border)} />
        <div className={cn("absolute bottom-0 right-0 h-8 w-8 border-r-2 border-b-2 rounded-br-xl", colorScheme.border)} />

        {/* Locked overlay for low talent */}
        {rank === "low" && (
          <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-[1px] flex items-center justify-center z-10">
            <div className="absolute top-4 right-4 flex items-center gap-2 text-gray-500">
              <Lock className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.15em]">待觉醒</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-20 flex flex-col h-full">
          {/* Icon */}
          <div className="flex justify-center mb-3">
            <div
              className={cn(
                "relative p-3 rounded-full",
                `bg-gradient-to-br ${colorScheme.accent}`,
                "bg-opacity-20",
                isCenter && "animate-float"
              )}
            >
              <div className={cn(colorScheme.iconGlow, colorScheme.text, isCenter ? "h-10 w-10" : "h-8 w-8")}>
                {config.icon}
              </div>
              {isCenter && (
                <div className={cn("absolute inset-0 rounded-full animate-ping opacity-30", colorScheme.progressFill)} />
              )}
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-3">
            <h3
              className={cn(
                "font-bold uppercase",
                colorScheme.text,
                isCenter ? "text-2xl tracking-[0.2em]" : "text-xl tracking-[0.15em]"
              )}
            >
              {config.name}
            </h3>
            <p className={cn("mt-1 tracking-widest text-gray-400", isCenter ? "text-sm" : "text-xs")}>
              {config.subtitle}
            </p>
            <p className={cn("mt-1 tracking-widest", colorScheme.text, isCenter ? "text-xs" : "text-[10px]")}>
              {rankLabels[rank]}
            </p>
          </div>

          {/* Score */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative flex items-baseline">
              <span
                className={cn(
                  "font-black tabular-nums",
                  colorScheme.text,
                  isCenter ? "text-7xl md:text-8xl" : "text-5xl md:text-6xl",
                  isCenter && colorScheme.glowAnimation
                )}
              >
                {animatedScore}
              </span>
              <span className={cn("ml-2 opacity-50", colorScheme.text, isCenter ? "text-xl" : "text-lg")}>
                /{maxScore}
              </span>
            </div>

            {/* Progress bar */}
            <div className={cn("w-full mt-4 rounded-full overflow-hidden", colorScheme.progressBg, "h-2.5")}>
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden",
                  colorScheme.progressFill
                )}
                style={{ width: `${percentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Status text */}
            <p
              className={cn(
                "mt-3 uppercase opacity-80",
                colorScheme.text,
                isCenter ? "text-xs tracking-[0.25em]" : "text-[10px] tracking-[0.2em]"
              )}
            >
              {statusLabels[rank]}
            </p>
          </div>

          {/* Transformation Ring (蜕变环) */}
          {showTransformation && (
            <TransformationRing
              moXin={config.moXin}
              tianXin={config.tianXin}
              moXinColor={colorScheme.moXinColor}
              tianXinColor={colorScheme.tianXinColor}
              isCenter={isCenter}
            />
          )}
        </div>

        {/* Particle effects for high talent */}
        {isCenter && <ParticleField colorScheme={config.colorScheme} />}
      </div>
    </div>
  )
}

// ============================================================
// 排序函数：根据分数排序三才
// ============================================================
function rankTalents(scores: SancaiScores): RankedTalent[] {
  const talents: { type: TalentType; score: number }[] = [
    { type: "S", score: scores.S },
    { type: "J", score: scores.J },
    { type: "H", score: scores.H },
  ]

  // 按分数从高到低排序
  talents.sort((a, b) => b.score - a.score)

  return [
    { ...talents[0], rank: "high" as const },
    { ...talents[1], rank: "medium" as const },
    { ...talents[2], rank: "low" as const },
  ]
}

// ============================================================
// MAIN SANCAI TABLET COMPONENT
// ============================================================
export function SancaiTablet({
  sancaiScores,
  showHeader = true,
  showFooter = true,
  showTransformation = true,
}: SancaiTabletProps) {
  // 排序三才
  const rankedTalents = useMemo(() => rankTalents(sancaiScores), [sancaiScores])

  const highTalent = rankedTalents[0]
  const mediumTalent = rankedTalents[1]
  const lowTalent = rankedTalents[2]

  // 计算总分和潜力值
  const totalScore = sancaiScores.S + sancaiScores.J + sancaiScores.H
  const potential = ((totalScore / 300) * 100).toFixed(1)

  // 获取天命高才的配置
  const highTalentConfig = TALENT_CONFIG[highTalent.type]

  return (
    <>
      <style>{styles}</style>

      <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
        <BackgroundEffects />

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Header */}
          {showHeader && (
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
                <h1
                  className="text-3xl md:text-5xl font-black uppercase bg-gradient-to-r from-amber-200 via-purple-300 to-cyan-200 bg-clip-text text-transparent"
                  style={{
                    letterSpacing: "0.1em",
                    filter: "drop-shadow(0 0 30px rgba(255,215,0,0.3))",
                  }}
                >
                  三才天命石碑
                </h1>
                <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
              </div>
              <p className="text-gray-400 text-lg md:text-xl uppercase" style={{ letterSpacing: "0.3em" }}>
                天命 · 器用 · 觉醒
              </p>
              <div className="mt-4 h-0.5 w-48 mx-auto bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
            </div>
          )}

          {/* Cards grid */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Medium Talent - Left */}
            <div className="w-full lg:w-[280px] lg:-mt-8">
              <TalentCard
                talentType={mediumTalent.type}
                score={mediumTalent.score}
                rank="medium"
                showTransformation={showTransformation}
              />
            </div>

            {/* High Talent - Center */}
            <div className="w-full lg:w-[340px]">
              <TalentCard
                talentType={highTalent.type}
                score={highTalent.score}
                rank="high"
                showTransformation={showTransformation}
              />
            </div>

            {/* Low Talent - Right */}
            <div className="w-full lg:w-[280px] lg:-mt-8">
              <TalentCard
                talentType={lowTalent.type}
                score={lowTalent.score}
                rank="low"
                showTransformation={showTransformation}
              />
            </div>
          </div>

          {/* Footer stats */}
          {showFooter && (
            <div className="mt-16 flex justify-center gap-8 md:gap-16 text-center flex-wrap">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-amber-300" style={{ letterSpacing: "0.05em" }}>
                  {totalScore}
                </p>
                <p className="text-sm text-gray-400 uppercase mt-2" style={{ letterSpacing: "0.2em" }}>
                  总分值
                </p>
              </div>
              <div className="w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent hidden md:block" />
              <div>
                <p className="text-3xl md:text-4xl font-bold text-cyan-300" style={{ letterSpacing: "0.05em" }}>
                  {potential}%
                </p>
                <p className="text-sm text-gray-400 uppercase mt-2" style={{ letterSpacing: "0.2em" }}>
                  潜力值
                </p>
              </div>
              <div className="w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent hidden md:block" />
              <div>
                <p className="text-3xl md:text-4xl font-bold text-purple-300" style={{ letterSpacing: "0.05em" }}>
                  {highTalentConfig.name}
                </p>
                <p className="text-sm text-gray-400 uppercase mt-2" style={{ letterSpacing: "0.2em" }}>
                  天命高才
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// 默认导出
export default SancaiTablet
