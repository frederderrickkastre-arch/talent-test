"use client"

import { useMemo } from "react"
import { Sparkles, Leaf, Lock, Zap, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

// ============================================================
// TYPES
// ============================================================

/** 12灵种分数接口 */
export interface TwelveSeedsScores {
  /** 美丑 - 审美与形象感知 */
  beautyUgliness: number
  /** 真假 - 辨别真伪的能力 */
  truthFalsehood: number
  /** 善恶 - 道德判断力 */
  goodEvil: number
  /** 支配欲 - 领导与控制欲望 */
  dominance: number
  /** 陶醉欲 - 享乐与沉浸欲望 */
  indulgence: number
  /** 积累欲 - 积蓄与收集欲望 */
  accumulation: number
  /** 胆量 - 冒险与勇气 */
  courage: number
  /** 定力 - 专注与坚持 */
  concentration: number
  /** 勇气 - 面对困难的勇气 */
  bravery: number
  /** 格局 - 视野与胸怀 */
  vision: number
  /** 仁爱 - 慈悲与关怀 */
  benevolence: number
  /** 智慧 - 智识与洞察 */
  wisdom: number
}

/** 单个灵种数据 */
export interface Seed {
  id: string
  key: keyof TwelveSeedsScores
  name: string
  nameCn: string
  category: "value" | "desire" | "virtue"
  score: number
}

/** 灵种状态 */
export type SeedStatus = "awakened" | "sprouting" | "dormant"

/** 组件 Props */
export interface SpiritualSeedsMatrixProps {
  /** 12灵种分数数据 */
  scores?: TwelveSeedsScores
  /** 是否显示标题区域 */
  showHeader?: boolean
  /** 是否显示统计页脚 */
  showFooter?: boolean
  /** 是否作为全屏页面 */
  fullPage?: boolean
}

// ============================================================
// 12灵种配置（固定顺序）
// ============================================================
const SEED_CONFIG: Omit<Seed, "score">[] = [
  // 价值三力 (Value Triad)
  { id: "1", key: "beautyUgliness", name: "Beauty-Ugliness", nameCn: "美丑", category: "value" },
  { id: "2", key: "truthFalsehood", name: "Truth-Falsehood", nameCn: "真假", category: "value" },
  { id: "3", key: "goodEvil", name: "Good-Evil", nameCn: "善恶", category: "value" },
  // 欲望三力 (Desire Triad)
  { id: "4", key: "dominance", name: "Dominance", nameCn: "支配欲", category: "desire" },
  { id: "5", key: "indulgence", name: "Indulgence", nameCn: "陶醉欲", category: "desire" },
  { id: "6", key: "accumulation", name: "Accumulation", nameCn: "积累欲", category: "desire" },
  // 品德六力 (Virtue Hexad)
  { id: "7", key: "courage", name: "Courage", nameCn: "胆量", category: "virtue" },
  { id: "8", key: "concentration", name: "Concentration", nameCn: "定力", category: "virtue" },
  { id: "9", key: "bravery", name: "Bravery", nameCn: "勇气", category: "virtue" },
  { id: "10", key: "vision", name: "Vision", nameCn: "格局", category: "virtue" },
  { id: "11", key: "benevolence", name: "Benevolence", nameCn: "仁爱", category: "virtue" },
  { id: "12", key: "wisdom", name: "Wisdom", nameCn: "智慧", category: "virtue" },
]

// 默认分数
const DEFAULT_SCORES: TwelveSeedsScores = {
  beautyUgliness: 75,
  truthFalsehood: 82,
  goodEvil: 68,
  dominance: 55,
  indulgence: 72,
  accumulation: 88,
  courage: 45,
  concentration: 90,
  bravery: 58,
  vision: 65,
  benevolence: 78,
  wisdom: 85,
}

// ============================================================
// 状态阈值（固定）
// ============================================================
const AWAKENED_THRESHOLD = 80  // > 80 为觉醒
const SPROUTING_THRESHOLD = 60 // 60-80 为萌芽，< 60 为沉睡

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getSeedStatus(score: number): SeedStatus {
  if (score > AWAKENED_THRESHOLD) return "awakened"
  if (score >= SPROUTING_THRESHOLD) return "sprouting"
  return "dormant"
}

function buildSeedsFromScores(scores: TwelveSeedsScores): Seed[] {
  return SEED_CONFIG.map((config) => ({
    ...config,
    score: scores[config.key],
  }))
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

/** 区域标题组件 */
function ZoneHeader({
  title,
  subtitle,
  variant,
}: {
  title: string
  subtitle: string
  variant: "awakened" | "pending"
}) {
  const isAwakened = variant === "awakened"

  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <div className="flex items-center gap-3">
        {isAwakened ? (
          <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
        ) : (
          <AlertTriangle className="w-6 h-6 text-gray-400" />
        )}
        <h2
          className={cn(
            "text-2xl md:text-3xl font-black tracking-wider",
            isAwakened 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500" 
              : "text-gray-400"
          )}
          style={{
            textShadow: isAwakened
              ? "0 0 30px rgba(251, 191, 36, 0.6)"
              : "none",
          }}
        >
          {title}
        </h2>
        {isAwakened ? (
          <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
        ) : (
          <AlertTriangle className="w-6 h-6 text-gray-400" />
        )}
      </div>
      <p
        className={cn(
          "font-mono text-xs tracking-widest uppercase",
          isAwakened ? "text-amber-300/80" : "text-gray-500"
        )}
      >
        {subtitle}
      </p>
      {/* 分隔线 */}
      <div className="flex items-center gap-4 mt-2">
        <div className={cn(
          "h-px w-16 md:w-24",
          isAwakened 
            ? "bg-gradient-to-r from-transparent to-amber-400" 
            : "bg-gradient-to-r from-transparent to-gray-600"
        )} />
        <div
          className={cn(
            "w-2 h-2 rotate-45",
            isAwakened ? "bg-amber-400" : "bg-gray-600"
          )}
          style={{ boxShadow: isAwakened ? "0 0 10px rgba(251, 191, 36, 0.8)" : "none" }}
        />
        <div className={cn(
          "h-px w-16 md:w-24",
          isAwakened 
            ? "bg-gradient-to-l from-transparent to-amber-400" 
            : "bg-gradient-to-l from-transparent to-gray-600"
        )} />
      </div>
    </div>
  )
}

/** 灵种球体组件 - 六边形设计 */
function SeedOrb({
  nameCn,
  name,
  score,
  status,
  category,
  delay = 0,
}: {
  nameCn: string
  name: string
  score: number
  status: SeedStatus
  category: "value" | "desire" | "virtue"
  delay?: number
}) {
  // 根据状态确定样式
  const statusStyles = {
    awakened: {
      // 金色/黄色六边形，强烈发光
      containerBg: "bg-gradient-to-br from-amber-400/40 via-yellow-500/30 to-amber-600/40",
      borderColor: "border-amber-400",
      glowClass: "shadow-[0_0_30px_rgba(251,191,36,0.6),0_0_60px_rgba(251,191,36,0.3),inset_0_0_20px_rgba(255,255,255,0.2)]",
      textColor: "text-amber-200",
      scoreColor: "text-amber-400",
      scoreBg: "bg-amber-500/30",
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      showPulse: true,
      showFloat: true,
      opacity: "opacity-100",
    },
    sprouting: {
      // 翠绿色，微弱光晕
      containerBg: "bg-gradient-to-br from-emerald-500/25 via-green-500/20 to-teal-600/25",
      borderColor: "border-emerald-400/60",
      glowClass: "shadow-[0_0_15px_rgba(52,211,153,0.4),inset_0_0_10px_rgba(255,255,255,0.1)]",
      textColor: "text-emerald-200",
      scoreColor: "text-emerald-400",
      scoreBg: "bg-emerald-500/20",
      icon: <Leaf className="w-4 h-4 text-emerald-400" />,
      showPulse: false,
      showFloat: true,
      opacity: "opacity-90",
    },
    dormant: {
      // 深灰色/暗红色，半透明，锁定感
      containerBg: "bg-gradient-to-br from-gray-700/30 via-gray-800/25 to-red-900/20",
      borderColor: "border-gray-600/40",
      glowClass: "shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]",
      textColor: "text-gray-500",
      scoreColor: "text-red-400/70",
      scoreBg: "bg-gray-800/50",
      icon: <Lock className="w-4 h-4 text-gray-500" />,
      showPulse: false,
      showFloat: false,
      opacity: "opacity-60",
    },
  }

  const style = statusStyles[status]
  
  // 尺寸：觉醒最大，萌芽中等，沉睡最小
  const sizeClass = 
    status === "awakened" 
      ? "w-28 h-28 md:w-32 md:h-32" 
      : status === "sprouting"
      ? "w-24 h-24 md:w-28 md:h-28"
      : "w-20 h-20 md:w-24 md:h-24"

  // 动画类
  const floatClass = style.showFloat
    ? delay === 0
      ? "animate-float-orb"
      : delay === 1
      ? "animate-float-orb-delay-1"
      : delay === 2
      ? "animate-float-orb-delay-2"
      : "animate-float-orb-delay-3"
    : ""

  // 类别标签颜色
  const categoryColors = {
    value: "bg-purple-500/30 text-purple-300 border-purple-400/40",
    desire: "bg-rose-500/30 text-rose-300 border-rose-400/40",
    virtue: "bg-cyan-500/30 text-cyan-300 border-cyan-400/40",
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", style.opacity)}>
      {/* 球体容器 */}
      <div className="relative">
        {/* 觉醒状态的脉冲环 */}
        {style.showPulse && (
          <>
            <div
              className="absolute inset-0 rounded-full border-2 border-amber-400/40 animate-ping"
              style={{ animationDuration: "2s" }}
            />
            <div
              className="absolute -inset-3 rounded-full border border-amber-400/20 animate-pulse"
              style={{ animationDuration: "3s" }}
            />
            {/* 外层光环 */}
            <div 
              className="absolute -inset-4 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
              }}
            />
          </>
        )}

        {/* 沉睡状态的锁定遮罩 */}
        {status === "dormant" && (
          <div className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-gray-600/80" />
          </div>
        )}

        {/* 主球体 - 六边形风格（通过clip-path实现） */}
        <div
          className={cn(
            "relative rounded-full border-2 flex items-center justify-center backdrop-blur-sm transition-all duration-500",
            sizeClass,
            style.containerBg,
            style.borderColor,
            style.glowClass,
            floatClass,
            status === "awakened" && "hover:scale-110",
            status === "sprouting" && "hover:scale-105",
          )}
        >
          {/* 内部渐变光晕 */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-t from-transparent via-white/5 to-white/15" />
          
          {/* 六边形纹理叠加（仅觉醒状态） */}
          {status === "awakened" && (
            <div 
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: `
                  linear-gradient(60deg, transparent 40%, rgba(255,215,0,0.3) 50%, transparent 60%),
                  linear-gradient(-60deg, transparent 40%, rgba(255,215,0,0.3) 50%, transparent 60%)
                `,
              }}
            />
          )}

          {/* 中心内容 */}
          <div className={cn(
            "relative z-20 flex flex-col items-center gap-1",
            status === "dormant" && "opacity-50"
          )}>
            <span className={cn(
              "font-bold",
              status === "awakened" ? "text-xl md:text-2xl" : "text-lg md:text-xl",
              style.textColor
            )}>
              {nameCn}
            </span>
            <div className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full",
              style.scoreBg
            )}>
              {style.icon}
              <span className={cn("font-mono text-sm font-bold", style.scoreColor)}>
                {score}
              </span>
            </div>
          </div>

          {/* 底部高光 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/5 h-1 rounded-full bg-white/10 blur-sm" />
        </div>
      </div>

      {/* 英文名称 */}
      <span className={cn(
        "font-mono text-[10px] tracking-wider uppercase",
        style.textColor
      )}>
        {name}
      </span>

      {/* 类别标签 */}
      <span className={cn(
        "text-[9px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider",
        categoryColors[category]
      )}>
        {category === "value" ? "价值" : category === "desire" ? "欲望" : "品德"}
      </span>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function SpiritualSeedsMatrix({
  scores = DEFAULT_SCORES,
  showHeader = true,
  showFooter = true,
  fullPage = false,
}: SpiritualSeedsMatrixProps) {
  // 构建灵种数据并分类
  const { allSeeds, awakenedSeeds, sproutingSeeds, dormantSeeds, pendingSeeds } = useMemo(() => {
    const seeds = buildSeedsFromScores(scores)
    const awakened: Seed[] = []
    const sprouting: Seed[] = []
    const dormant: Seed[] = []

    seeds.forEach((seed) => {
      const status = getSeedStatus(seed.score)
      if (status === "awakened") awakened.push(seed)
      else if (status === "sprouting") sprouting.push(seed)
      else dormant.push(seed)
    })

    return {
      allSeeds: seeds,
      awakenedSeeds: awakened,
      sproutingSeeds: sprouting,
      dormantSeeds: dormant,
      pendingSeeds: [...sprouting, ...dormant], // 待激活区 = 萌芽 + 沉睡
    }
  }, [scores])

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0d0d24] to-[#0a0a1a] rounded-2xl",
        fullPage ? "min-h-screen" : "py-8"
      )}
    >
      {/* 动态网格背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251, 191, 36, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-transparent to-[#0a0a1a]" />
      </div>

      {/* 浮动粒子效果 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full animate-float",
              i % 3 === 0 ? "w-1.5 h-1.5 bg-amber-400/40" : "w-1 h-1 bg-amber-400/20"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        {showHeader && (
          <header className="text-center mb-12 pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/40 bg-amber-500/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-semibold">
                灵种扫描完成
              </span>
            </div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-wider mb-3"
              style={{
                textShadow:
                  "0 0 40px rgba(255,200,50,0.5), 0 0 80px rgba(255,180,50,0.3), 0 4px 8px rgba(0,0,0,0.5)",
              }}
            >
              <span className="text-amber-400">十二</span>灵种矩阵
            </h1>
            <p
              className="font-mono text-sm md:text-base text-gray-300 tracking-[0.15em] uppercase"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
            >
              12 Spiritual Seeds Matrix
            </p>
            <p className="text-gray-500 text-sm mt-3">
              觉醒阈值: &gt;80 | 萌芽阈值: 60-80 | 沉睡阈值: &lt;60
            </p>
          </header>
        )}

        {/* ========================================== */}
        {/* 高能觉醒区 */}
        {/* ========================================== */}
        <section className="mb-16">
          <ZoneHeader
            title="高能觉醒区"
            subtitle="High-Energy Awakened Zone"
            variant="awakened"
          />

          <div className="relative">
            {/* 能量场背景 */}
            <div className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-b from-amber-500/10 via-amber-500/15 to-amber-500/10 blur-xl" />

            {awakenedSeeds.length > 0 ? (
              <div
                className={cn(
                  "relative grid gap-8 md:gap-12 justify-items-center py-8",
                  awakenedSeeds.length <= 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                )}
              >
                {awakenedSeeds.map((seed, idx) => (
                  <SeedOrb
                    key={seed.id}
                    name={seed.name}
                    nameCn={seed.nameCn}
                    score={seed.score}
                    status="awakened"
                    category={seed.category}
                    delay={idx % 4}
                  />
                ))}
              </div>
            ) : (
              <div className="relative py-12 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  <span className="text-gray-400">暂无觉醒灵种，需继续修炼</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================== */}
        {/* 待激活能量区（萌芽 + 沉睡） */}
        {/* ========================================== */}
        <section>
          <ZoneHeader
            title="待激活能量区"
            subtitle="Pending Activation Zone"
            variant="pending"
          />

          <div className="relative">
            {/* 柔和背景 */}
            <div className="absolute inset-0 -m-4 rounded-2xl bg-gradient-to-b from-gray-800/40 via-gray-800/30 to-transparent" />

            {pendingSeeds.length > 0 ? (
              <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 py-6">
                {pendingSeeds.map((seed, idx) => (
                  <SeedOrb
                    key={seed.id}
                    name={seed.name}
                    nameCn={seed.nameCn}
                    score={seed.score}
                    status={getSeedStatus(seed.score)}
                    category={seed.category}
                    delay={idx % 4}
                  />
                ))}
              </div>
            ) : (
              <div className="relative py-12 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-amber-900/30 border border-amber-500/30">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <span className="text-amber-300">所有灵种已觉醒！</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 统计页脚 */}
        {showFooter && (
          <footer className="mt-16 pt-8 border-t border-gray-700/50">
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-lg bg-amber-900/20 border border-amber-500/30">
                <p
                  className="font-mono text-3xl md:text-4xl font-black text-amber-400"
                  style={{
                    textShadow: "0 0 20px rgba(255,200,50,0.6), 0 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {awakenedSeeds.length}
                </p>
                <p className="font-mono text-xs text-amber-200/70 uppercase tracking-wider mt-1 font-semibold">
                  觉醒 Awakened
                </p>
                <p className="text-[10px] text-amber-300/50 mt-1">&gt;80分</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-emerald-900/20 border border-emerald-500/30">
                <p
                  className="font-mono text-3xl md:text-4xl font-black text-emerald-400"
                  style={{
                    textShadow: "0 0 15px rgba(100,200,150,0.5), 0 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {sproutingSeeds.length}
                </p>
                <p className="font-mono text-xs text-emerald-200/70 uppercase tracking-wider mt-1 font-semibold">
                  萌芽 Sprouting
                </p>
                <p className="text-[10px] text-emerald-300/50 mt-1">60-80分</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-red-900/20 border border-red-500/30">
                <p
                  className="font-mono text-3xl md:text-4xl font-black text-red-400"
                  style={{
                    textShadow: "0 0 15px rgba(255,100,100,0.5), 0 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {dormantSeeds.length}
                </p>
                <p className="font-mono text-xs text-red-200/70 uppercase tracking-wider mt-1 font-semibold">
                  沉睡 Dormant
                </p>
                <p className="text-[10px] text-red-300/50 mt-1">&lt;60分</p>
              </div>
            </div>

            {/* 总体评估 */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                灵种觉醒率: 
                <span className="text-amber-400 font-bold ml-2">
                  {Math.round((awakenedSeeds.length / 12) * 100)}%
                </span>
              </p>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

// 默认导出
export default SpiritualSeedsMatrix
