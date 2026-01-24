"use client"

import { useState, useEffect, useMemo } from "react"
import { Crown, Heart, Eye, Target, Zap, Sparkles } from "lucide-react"

// ============================================================
// CSS STYLES - 动画样式
// ============================================================
const styles = `
@keyframes slideRight {
  from { transform: translateX(-20px); }
  to { transform: translateX(0px); }
}
@keyframes scanLine {
  0%, 100% { transform: translateY(-100%); }
  50% { transform: translateY(100%); }
}
@keyframes overflow-pulse {
  0%, 100% { 
    box-shadow: 0 0 30px var(--glow-color), 0 0 60px var(--glow-color), 0 0 90px var(--glow-color);
    filter: brightness(1.2);
  }
  50% { 
    box-shadow: 0 0 50px var(--glow-color), 0 0 100px var(--glow-color), 0 0 150px var(--glow-color);
    filter: brightness(1.5);
  }
}
@keyframes overflow-particles {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-30px) scale(0); opacity: 0; }
}
@keyframes energy-wave {
  0% { transform: scaleX(1); opacity: 0.5; }
  50% { transform: scaleX(1.1); opacity: 0.8; }
  100% { transform: scaleX(1); opacity: 0.5; }
}
.animate-slide-right {
  animation: slideRight 2s linear infinite;
}
.animate-scan-line {
  animation: scanLine 3s ease-in-out infinite;
}
.animate-overflow-pulse {
  animation: overflow-pulse 1.5s ease-in-out infinite;
}
.animate-overflow-particles {
  animation: overflow-particles 1s ease-out infinite;
}
.animate-energy-wave {
  animation: energy-wave 2s ease-in-out infinite;
}
`

// ============================================================
// TYPES
// ============================================================

/** 五原力分数接口 */
export interface FiveForcesScores {
  /** 执行原力 (0-100) - 行动力与落地 */
  execution: number
  /** 影响原力 (0-100) - 爆发力与号召力 */
  influence: number
  /** 关系原力 (0-100) - 团队粘合力 */
  relationship: number
  /** 战略原力 (0-100) - 规划力与脑力 */
  strategy: number
  /** 直觉原力 (0-100) - 洞察力与感官 */
  intuition: number
}

/** 原力层配置 */
interface ForceLayerConfig {
  id: keyof FiveForcesScores
  name: string
  subtitle: string
  colorGradient: string
  glowColor: string
  overflowColor: string
  icon: React.ReactNode
}

/** 组件 Props */
export interface FiveForcesPyramidProps {
  /** 五原力分数数据 */
  scores: FiveForcesScores
  /** 是否显示标题 */
  showHeader?: boolean
  /** 是否显示底部统计 */
  showFooter?: boolean
  /** 是否全屏高度 */
  fullHeight?: boolean
  /** 溢出阈值 (默认 85) */
  overflowThreshold?: number
}

// ============================================================
// 金字塔层级配置（从塔尖到塔基）
// ============================================================
const FORCE_LAYERS: ForceLayerConfig[] = [
  {
    id: "influence",
    name: "影响原力",
    subtitle: "爆发力·号召力",
    colorGradient: "from-amber-500 via-orange-500 to-red-500",
    glowColor: "rgba(251, 146, 60, 0.7)",
    overflowColor: "rgba(255, 200, 100, 0.9)",
    icon: <Crown className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    id: "relationship",
    name: "关系原力",
    subtitle: "团队·粘合力",
    colorGradient: "from-yellow-400 via-lime-400 to-green-400",
    glowColor: "rgba(163, 230, 53, 0.7)",
    overflowColor: "rgba(200, 255, 100, 0.9)",
    icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    id: "intuition",
    name: "直觉原力",
    subtitle: "洞察力·感官",
    colorGradient: "from-purple-500 via-violet-500 to-fuchsia-500",
    glowColor: "rgba(168, 85, 247, 0.7)",
    overflowColor: "rgba(200, 150, 255, 0.9)",
    icon: <Eye className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    id: "strategy",
    name: "战略原力",
    subtitle: "规划力·脑力",
    colorGradient: "from-blue-500 via-cyan-500 to-teal-400",
    glowColor: "rgba(34, 211, 238, 0.7)",
    overflowColor: "rgba(100, 220, 255, 0.9)",
    icon: <Target className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    id: "execution",
    name: "执行原力",
    subtitle: "行动力·落地",
    colorGradient: "from-orange-600 via-amber-700 to-yellow-800",
    glowColor: "rgba(194, 120, 3, 0.7)",
    overflowColor: "rgba(255, 180, 80, 0.9)",
    icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />,
  },
]

// ============================================================
// 获取等级
// ============================================================
function getGrade(avgScore: number): { grade: string; color: string } {
  if (avgScore >= 90) return { grade: "S", color: "text-amber-300" }
  if (avgScore >= 80) return { grade: "A+", color: "text-amber-400" }
  if (avgScore >= 70) return { grade: "A", color: "text-emerald-400" }
  if (avgScore >= 60) return { grade: "B+", color: "text-cyan-400" }
  if (avgScore >= 50) return { grade: "B", color: "text-blue-400" }
  return { grade: "C", color: "text-gray-400" }
}

// ============================================================
// 溢出粒子组件
// ============================================================
function OverflowParticles({ color }: { color: string }) {
  const particles = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      delay: `${Math.random() * 1}s`,
      size: `${3 + Math.random() * 4}px`,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full animate-overflow-particles"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            animationDelay: p.delay,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      ))}
    </div>
  )
}

// ============================================================
// PYRAMID LAYER COMPONENT
// ============================================================
function PyramidLayer({
  config,
  score,
  index,
  isAnimated,
  overflowThreshold,
}: {
  config: ForceLayerConfig
  score: number
  index: number
  isAnimated: boolean
  overflowThreshold: number
}) {
  // 塔尖最窄，塔基最宽
  const baseWidth = 40 + index * 15
  const isOverflow = score >= overflowThreshold
  const fillPercent = Math.min(score, 100)

  // 根据分数计算光亮度
  const brightness = 0.6 + (score / 100) * 0.6
  const glowIntensity = score >= 70 ? score / 100 : 0.3

  return (
    <div
      className="relative flex items-center justify-center transition-all duration-700"
      style={{
        width: `${baseWidth}%`,
        transitionDelay: `${index * 100}ms`,
        opacity: isAnimated ? 1 : 0,
        transform: isAnimated ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* 主层容器 */}
      <div
        className={`relative w-full h-16 md:h-20 rounded-sm overflow-hidden ${
          isOverflow ? "animate-overflow-pulse" : ""
        }`}
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)`,
          border: `1px solid rgba(255,255,255,0.15)`,
          ["--glow-color" as any]: config.glowColor,
        }}
      >
        {/* 能量填充条 */}
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${config.colorGradient} transition-all duration-1000 ease-out`}
          style={{
            width: isAnimated ? `${fillPercent}%` : "0%",
            transitionDelay: `${index * 150 + 300}ms`,
            filter: `brightness(${brightness})`,
            boxShadow: isOverflow
              ? `0 0 40px ${config.overflowColor}, 0 0 80px ${config.overflowColor}, inset 0 0 30px rgba(255,255,255,0.4)`
              : `0 0 ${20 * glowIntensity}px ${config.glowColor}, 0 0 ${40 * glowIntensity}px ${config.glowColor}, inset 0 0 20px rgba(255,255,255,0.2)`,
          }}
        >
          {/* 流动条纹 */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-30 animate-slide-right"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.15) 10px,
                  rgba(255,255,255,0.15) 20px
                )`,
              }}
            />
          </div>

          {/* 高光效果 */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)`,
            }}
          />

          {/* 溢出波纹效果 */}
          {isOverflow && (
            <div 
              className="absolute inset-0 animate-energy-wave"
              style={{
                background: `linear-gradient(90deg, transparent, ${config.overflowColor}, transparent)`,
                opacity: 0.5,
              }}
            />
          )}
        </div>

        {/* 溢出粒子 */}
        {isOverflow && <OverflowParticles color={config.overflowColor} />}

        {/* 内容区 */}
        <div className="absolute inset-0 flex items-center justify-between px-3 md:px-6 z-10">
          {/* 左侧：图标+名称 */}
          <div className="flex items-center gap-2 md:gap-3">
            <div
              className={`p-1.5 md:p-2 rounded-lg backdrop-blur-sm transition-all ${
                isOverflow ? "bg-white/30" : "bg-black/30"
              }`}
              style={{
                boxShadow: `0 0 ${isOverflow ? 20 : 10}px ${config.glowColor}`,
              }}
            >
              <div className={isOverflow ? "text-white" : "text-white/90"}>
                {config.icon}
              </div>
            </div>
            <div>
              <span className="font-bold text-sm md:text-base tracking-wider text-white drop-shadow-lg block">
                {config.name}
              </span>
              <span className="text-[10px] md:text-xs text-white/60 tracking-wide">
                {config.subtitle}
              </span>
            </div>
          </div>

          {/* 右侧：能量指示器+分数 */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* 5格能量指示器 */}
            <div className="hidden sm:flex gap-0.5">
              {[...Array(5)].map((_, i) => {
                const threshold = (i + 1) * 20
                const isActive = score >= threshold
                const isPartial = score >= threshold - 10 && score < threshold
                return (
                  <div
                    key={i}
                    className={`w-2 md:w-2.5 h-4 md:h-5 rounded-sm transition-all duration-500 ${
                      isActive
                        ? `bg-gradient-to-t ${config.colorGradient}`
                        : isPartial
                        ? `bg-gradient-to-t ${config.colorGradient} opacity-50`
                        : "bg-white/10"
                    }`}
                    style={{
                      transitionDelay: `${index * 100 + i * 80}ms`,
                      boxShadow: isActive
                        ? `0 0 8px ${config.glowColor}`
                        : "none",
                    }}
                  />
                )
              })}
            </div>

            {/* 分数显示 */}
            <div
              className={`relative px-3 py-1.5 rounded-lg backdrop-blur-sm border transition-all ${
                isOverflow
                  ? "bg-white/20 border-white/40"
                  : "bg-black/50 border-white/20"
              }`}
              style={{
                boxShadow: isOverflow
                  ? `0 0 25px ${config.overflowColor}, inset 0 0 15px ${config.overflowColor}`
                  : `0 0 15px ${config.glowColor}, inset 0 0 10px ${config.glowColor}`,
              }}
            >
              {isOverflow && (
                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 animate-pulse" />
              )}
              <span
                className={`font-mono font-black text-2xl md:text-3xl tracking-tight ${
                  isOverflow ? "text-white" : "text-white"
                }`}
                style={{
                  textShadow: `0 0 10px ${isOverflow ? config.overflowColor : config.glowColor}, 0 2px 4px rgba(0,0,0,0.8)`,
                }}
              >
                {score}
              </span>
            </div>
          </div>
        </div>

        {/* 扫描线 */}
        <div
          className="absolute inset-0 pointer-events-none animate-scan-line"
          style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`,
          }}
        />
      </div>

      {/* 底部光晕 */}
      <div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-6 blur-xl"
        style={{
          background: `radial-gradient(ellipse, ${isOverflow ? config.overflowColor : config.glowColor} 0%, transparent 70%)`,
          opacity: isOverflow ? 0.7 : 0.4,
        }}
      />
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export function FiveForcesPyramid({
  scores,
  showHeader = true,
  showFooter = true,
  fullHeight = false,
  overflowThreshold = 85,
}: FiveForcesPyramidProps) {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // 计算统计数据
  const totalScore = Object.values(scores).reduce((acc, s) => acc + s, 0)
  const avgScore = Math.round(totalScore / 5)
  const { grade, color: gradeColor } = getGrade(avgScore)

  // 找出最强和最弱原力
  const sortedForces = FORCE_LAYERS.map(layer => ({
    ...layer,
    score: scores[layer.id],
  })).sort((a, b) => b.score - a.score)

  const strongest = sortedForces[0]
  const weakest = sortedForces[sortedForces.length - 1]

  return (
    <>
      <style>{styles}</style>
      
      <div 
        className={`relative w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col justify-center bg-gradient-to-b from-[#0a0a1a] via-[#0d0d24] to-[#0a0a1a] rounded-2xl ${
          fullHeight ? "min-h-screen" : ""
        }`}
      >
        {/* 网格背景 */}
        <div
          className="absolute inset-0 opacity-10 rounded-2xl"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* 标题区 */}
        {showHeader && (
          <div className="relative text-center mb-6 md:mb-8">
            <h1
              className="text-2xl md:text-3xl font-bold tracking-widest text-white"
              style={{
                textShadow:
                  "0 0 10px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)",
              }}
            >
              五原力能量金字塔
            </h1>
            <p className="text-xs md:text-sm text-gray-400 mt-2 tracking-wide">
              FIVE PRIMAL FORCES ENERGY PYRAMID
            </p>

            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-blue-500" />
              <div
                className="w-2 h-2 rotate-45 bg-blue-500"
                style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)" }}
              />
              <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-blue-500" />
            </div>
          </div>
        )}

        {/* 金字塔层 */}
        <div className="relative flex flex-col items-center gap-2 md:gap-3">
          {FORCE_LAYERS.map((layer, index) => (
            <PyramidLayer
              key={layer.id}
              config={layer}
              score={scores[layer.id]}
              index={index}
              isAnimated={isAnimated}
              overflowThreshold={overflowThreshold}
            />
          ))}
        </div>

        {/* 底部统计 */}
        {showFooter && (
          <div className="relative mt-8 md:mt-10">
            {/* 主要统计 */}
            <div className="flex justify-center gap-6 md:gap-12 mb-6">
              <div className="text-center">
                <div
                  className="text-3xl md:text-4xl font-mono font-bold text-cyan-400"
                  style={{
                    textShadow: "0 0 15px rgba(34, 211, 238, 0.6)",
                  }}
                >
                  {avgScore}
                </div>
                <div className="text-xs text-gray-400 tracking-wider mt-1">
                  平均分
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl md:text-4xl font-mono font-bold text-amber-400"
                  style={{
                    textShadow: "0 0 15px rgba(251, 191, 36, 0.6)",
                  }}
                >
                  {totalScore}
                </div>
                <div className="text-xs text-gray-400 tracking-wider mt-1">
                  总能量
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-3xl md:text-4xl font-mono font-bold ${gradeColor}`}
                  style={{
                    textShadow: "0 0 15px currentColor",
                  }}
                >
                  {grade}
                </div>
                <div className="text-xs text-gray-400 tracking-wider mt-1">
                  等级
                </div>
              </div>
            </div>

            {/* 最强/最弱原力 */}
            <div className="flex justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {strongest.icon}
                  <span className="text-sm font-bold text-emerald-400">
                    {strongest.name}
                  </span>
                </div>
                <div className="text-xs text-gray-500">最强原力 · {strongest.score}分</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {weakest.icon}
                  <span className="text-sm font-bold text-red-400">
                    {weakest.name}
                  </span>
                </div>
                <div className="text-xs text-gray-500">待强化 · {weakest.score}分</div>
              </div>
            </div>
          </div>
        )}

        {/* 角落装饰 */}
        <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l-2 border-t-2 border-blue-500/50 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r-2 border-t-2 border-blue-500/50 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l-2 border-b-2 border-blue-500/50 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r-2 border-b-2 border-blue-500/50 rounded-br-2xl" />

        {/* 中心光晕 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 60%)`,
          }}
        />
      </div>
    </>
  )
}

// 默认导出
export default FiveForcesPyramid
