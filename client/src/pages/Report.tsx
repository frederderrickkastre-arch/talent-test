import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  XCircle,
  AlertTriangle,
  Sparkles,
  Key,
  Calendar,
  Crown,
  Shield,
  Brain,
  Zap,
  Heart,
  Target,
  Eye,
  TrendingUp,
  Star,
  Flame,
  BookOpen,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateReportByAI } from "@/services/aiService";
import { calculateTalentScores } from "@/data/questions";
import { SancaiTablet, type SancaiScores } from "@/components/SancaiTablet";
import { FiveForcesPyramid, type FiveForcesScores } from "@/components/FiveForcesPyramid";
import { SpiritualSeedsMatrix, type TwelveSeedsScores } from "@/components/SpiritualSeedsMatrix";
import type { ReportData } from "@/types/report";

export default function Report() {
  const [, setLocation] = useLocation();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("正在链接命运数据库...");
  const [error, setError] = useState<string | null>(null);
  const [sancaiScores, setSancaiScores] = useState<SancaiScores>({ S: 0, J: 0, H: 0 });

  // 加载动画消息列表 - 四阶金字塔版本
  const loadingMessages = [
    "正在链接命运数据库...",
    "解析第一层：元神觉醒...",
    "分析三才排序：帅才/将才/慧才...",
    "绘制蜕变环：茧中形态 → 终极形态...",
    "解析第二层：五原力雷达...",
    "计算能量分布与互补关系...",
    "解析第三层：12灵种映射...",
    "诊断学业镜像，揭示根源...",
    "生成未来警示剧本...",
    "解析第四层：终极形态唤醒...",
    "提炼改变命运的密钥...",
    "报告生成完成！",
  ];

  useEffect(() => {
    const storedAnswers = sessionStorage.getItem("quizAnswers");
    
    if (!storedAnswers) {
      setError("未找到答题记录，请先完成测试");
      setIsLoading(false);
      return;
    }

    let answers: Record<number, string>;
    try {
      answers = JSON.parse(storedAnswers);
    } catch (e) {
      setError("答题记录格式错误");
      setIsLoading(false);
      return;
    }

    // 计算三才分数
    const talentScores = calculateTalentScores(answers);
    setSancaiScores({
      S: talentScores.commander,
      J: talentScores.general,
      H: talentScores.advisor,
    });

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length - 1) {
        messageIndex++;
        setLoadingMessage(loadingMessages[messageIndex]);
      }
    }, 1200);

    generateReportByAI(answers)
      .then((data) => {
        clearInterval(messageInterval);
        setLoadingMessage(loadingMessages[loadingMessages.length - 1]);
        setTimeout(() => {
          setReportData(data);
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        clearInterval(messageInterval);
        console.error("生成报告失败:", err);
        setError(err instanceof Error ? err.message : "生成报告失败，请稍后重试");
        setIsLoading(false);
      });
  }, []);

  // ==========================================
  // Loading 状态渲染
  // ==========================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#6D28D9]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 text-center space-y-8">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-amber-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-amber-400 animate-pulse">
              {loadingMessage}
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>

          <p className="text-sm text-gray-500 max-w-md mx-auto">
            正在使用 AI 深度分析您的答案，生成四阶金字塔诊断报告...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 错误状态渲染
  // ==========================================
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="p-8 bg-gray-900 border-red-500/50 max-w-md">
          <div className="text-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold">报告生成失败</h2>
            <p className="text-gray-400">{error}</p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setLocation("/quiz")}
                className="bg-amber-500 text-black hover:bg-amber-600"
              >
                重新测试
              </Button>
              <Button
                onClick={() => setLocation("/")}
                variant="outline"
                className="border-amber-400 text-amber-400 hover:bg-amber-400/10"
              >
                返回首页
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!reportData) {
    return null;
  }

  // ==========================================
  // 数据提取（兼容新旧格式）
  // ==========================================
  const yuanShen = reportData.yuanShen;
  const wuYuanLi = reportData.wuYuanLi;
  const lingZhong = reportData.lingZhong;
  const ultimate = reportData.ultimate;

  // 兼容旧格式
  const identity = reportData.identity || {
    title: yuanShen?.transformation?.ultimateForm?.name || "天命觉醒者",
    subtitle: `茧中形态：${yuanShen?.transformation?.cocoonForm?.name || "未知"}`,
    description: yuanShen?.roleDefinition?.description || "",
    score: yuanShen?.sanCaiRanking?.[0]?.score || 0,
    radar: wuYuanLi?.forces?.map(f => ({ subject: f.subject, A: f.score, fullMark: 100 })) || [],
  };

  const future = reportData.future || {
    scenarioA: lingZhong?.futureWarning || "",
    scenarioB: ultimate?.peakVision || "",
  };

  const keys = reportData.keys || ultimate?.unlockKeys?.practiceActions?.map(a => ({
    name: a.name,
    solution: a.method,
    courseIndex: a.courseIndex,
  })) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-amber-400/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="text-amber-400 hover:bg-amber-400/10"
          >
            ← 返回首页
          </Button>
          <div className="text-sm text-gray-400">
            报告生成时间: {new Date().toLocaleString("zh-CN")}
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="space-y-0">
        
        {/* ========================================== */}
        {/* 第一板块：元神觉醒 · 命运石板 */}
        {/* ========================================== */}
        <div className="relative">
          {/* 醒目标题 */}
          <div className="absolute top-0 left-0 right-0 z-20 pt-8 text-center pointer-events-none">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-black/60 backdrop-blur-md rounded-2xl border border-amber-400/30">
              <Crown className="w-8 h-8 text-amber-400 animate-pulse" />
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                  第一板块：元神觉醒
                </h2>
                <p className="text-amber-400/80 text-lg tracking-widest mt-1">命运石板</p>
              </div>
              <Crown className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
          </div>

          {/* SancaiTablet 组件 */}
          <SancaiTablet
            sancaiScores={sancaiScores}
            showHeader={false}
            showFooter={true}
            showTransformation={true}
          />
        </div>

        {/* 角色定义与蜕变描述（来自AI报告） */}
        {(yuanShen?.roleDefinition || yuanShen?.transformation) && (
          <div className="container mx-auto px-4 -mt-8 relative z-10">
            <Card className="p-8 bg-gradient-to-br from-gray-900/90 to-black/90 border-amber-400/30 backdrop-blur-sm">
              {/* 角色定义 */}
              {yuanShen?.roleDefinition && (
                <div className="p-6 bg-gray-800/50 rounded-lg border border-amber-400/20 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="w-8 h-8 text-amber-400" />
                    <div>
                      <h3 className="text-2xl font-bold text-amber-400">
                        {yuanShen.roleDefinition.system} · {yuanShen.roleDefinition.roleName}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {yuanShen.roleDefinition.description}
                  </p>
                </div>
              )}

              {/* 蜕变环详细描述 */}
              {yuanShen?.transformation && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 茧中形态 */}
                  <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Flame className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-red-400">茧中形态</h3>
                        <p className="text-red-300">{yuanShen.transformation.cocoonForm.name}</p>
                      </div>
                    </div>
                    <Badge className="mb-3 bg-red-500/20 text-red-400 border-red-500/50">
                      魔心：{yuanShen.transformation.cocoonForm.moXin}
                    </Badge>
                    <p className="text-red-200/80 leading-relaxed whitespace-pre-wrap">
                      {yuanShen.transformation.cocoonForm.description}
                    </p>
                  </div>

                  {/* 终极形态 */}
                  <div className="p-6 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Star className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-amber-400">终极形态</h3>
                        <p className="text-amber-300">{yuanShen.transformation.ultimateForm.name}</p>
                      </div>
                    </div>
                    <Badge className="mb-3 bg-amber-500/20 text-amber-400 border-amber-500/50">
                      天心：{yuanShen.transformation.ultimateForm.tianXin}
                    </Badge>
                    <p className="text-amber-200/80 leading-relaxed whitespace-pre-wrap">
                      {yuanShen.transformation.ultimateForm.description}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* 后续板块容器 */}
        <div className="container mx-auto px-4 py-8 space-y-8">
          
          {/* ========================================== */}
          {/* 第二板块：五原力雷达（能量引擎层） */}
          {/* ========================================== */}
          <div className="relative">
            {/* 醒目标题 */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-black/60 backdrop-blur-md rounded-2xl border border-blue-400/30">
                <Zap className="w-8 h-8 text-blue-400 animate-pulse" />
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-500">
                    第二板块：五原力雷达
                  </h2>
                  <p className="text-blue-400/80 text-lg tracking-widest mt-1">能量引擎层</p>
                </div>
                <Zap className="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
            </div>

            {/* 五原力金字塔组件 */}
            {(() => {
              // 从 wuYuanLi.forces 映射到 FiveForcesScores
              const mapForcesToScores = (): FiveForcesScores => {
                const defaultScores: FiveForcesScores = {
                  execution: 50,
                  influence: 50,
                  relationship: 50,
                  strategy: 50,
                  intuition: 50,
                };

                if (!wuYuanLi?.forces) return defaultScores;

                // 中文名称到英文key的映射
                const nameMap: Record<string, keyof FiveForcesScores> = {
                  "执行": "execution",
                  "影响": "influence",
                  "关系": "relationship",
                  "战略": "strategy",
                  "直觉": "intuition",
                };

                wuYuanLi.forces.forEach((force) => {
                  const key = nameMap[force.subject];
                  if (key) {
                    defaultScores[key] = force.score;
                  }
                });

                return defaultScores;
              };

              return (
                <FiveForcesPyramid
                  scores={mapForcesToScores()}
                  showHeader={false}
                  showFooter={true}
                  overflowThreshold={85}
                />
              );
            })()}

            {/* 五原力简述卡片 */}
            {wuYuanLi?.forces && wuYuanLi.forces.length > 0 && (
              <div className="container mx-auto px-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {wuYuanLi.forces.map((force, idx) => {
                    const icons = [
                      <Zap key="exec" className="w-5 h-5" />,
                      <Crown key="inf" className="w-5 h-5" />,
                      <Heart key="rel" className="w-5 h-5" />,
                      <Target key="str" className="w-5 h-5" />,
                      <Eye key="int" className="w-5 h-5" />,
                    ];
                    const colors = [
                      "border-orange-500/50 bg-orange-900/20",
                      "border-amber-500/50 bg-amber-900/20",
                      "border-green-500/50 bg-green-900/20",
                      "border-blue-500/50 bg-blue-900/20",
                      "border-purple-500/50 bg-purple-900/20",
                    ];
                    const textColors = [
                      "text-orange-400",
                      "text-amber-400",
                      "text-green-400",
                      "text-blue-400",
                      "text-purple-400",
                    ];
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border ${colors[idx]} backdrop-blur-sm`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={textColors[idx]}>{icons[idx]}</span>
                          <span className={`font-bold ${textColors[idx]}`}>{force.subject}原力</span>
                        </div>
                        {force.brief && (
                          <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                            {force.brief}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 深度分析 */}
            {wuYuanLi?.distributionAnalysis && (
              <div className="container mx-auto px-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <h4 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      能量分布解读
                    </h4>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {wuYuanLi.distributionAnalysis}
                    </p>
                  </div>
                  <div className="p-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <h4 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      互补关系分析
                    </h4>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {wuYuanLi.complementAnalysis}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ========================================== */}
          {/* 第三板块：12灵种与人生剧本（生命图谱层） */}
          {/* ========================================== */}
          <div className="relative">
            {/* 醒目标题 */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-black/60 backdrop-blur-md rounded-2xl border border-purple-400/30">
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-500">
                    第三板块：12灵种矩阵
                  </h2>
                  <p className="text-purple-400/80 text-lg tracking-widest mt-1">生命图谱层</p>
                </div>
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
            </div>

            {/* 12灵种矩阵组件 */}
            {(() => {
              // 从 lingZhong.lingZhongs 映射到 TwelveSeedsScores
              const mapLingZhongsToScores = (): TwelveSeedsScores => {
                const defaultScores: TwelveSeedsScores = {
                  beautyUgliness: 50,
                  truthFalsehood: 50,
                  goodEvil: 50,
                  dominance: 50,
                  indulgence: 50,
                  accumulation: 50,
                  courage: 50,
                  concentration: 50,
                  bravery: 50,
                  vision: 50,
                  benevolence: 50,
                  wisdom: 50,
                };

                if (!lingZhong?.lingZhongs) return defaultScores;

                // 中文名称到英文 key 的映射
                const nameMap: Record<string, keyof TwelveSeedsScores> = {
                  "美丑": "beautyUgliness",
                  "真假": "truthFalsehood",
                  "善恶": "goodEvil",
                  "支配欲": "dominance",
                  "陶醉欲": "indulgence",
                  "积累欲": "accumulation",
                  "胆量": "courage",
                  "定力": "concentration",
                  "勇气": "bravery",
                  "格局": "vision",
                  "仁爱": "benevolence",
                  "智慧": "wisdom",
                };

                lingZhong.lingZhongs.forEach((lz) => {
                  const key = nameMap[lz.type];
                  if (key) {
                    defaultScores[key] = lz.score;
                  }
                });

                return defaultScores;
              };

              // 找出沉睡的灵种（用于下方分析）
              const dormantSeeds = lingZhong?.lingZhongs?.filter(lz => lz.score < 60) || [];

              return (
                <>
                  <SpiritualSeedsMatrix
                    scores={mapLingZhongsToScores()}
                    showHeader={false}
                    showFooter={true}
                  />

                  {/* 沉睡灵种警示 - 扎心分析 */}
                  {dormantSeeds.length > 0 && (
                    <div className="container mx-auto px-4 mt-6">
                      <Card className="p-6 bg-red-900/20 border border-red-500/40">
                        <div className="flex items-center gap-3 mb-4">
                          <AlertTriangle className="w-8 h-8 text-red-400" />
                          <h3 className="text-2xl font-bold text-red-400">沉睡灵种警示</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          {dormantSeeds.map((lz, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-center"
                            >
                              <p className="font-bold text-red-400">{lz.type}</p>
                              <p className="text-2xl font-black text-red-500">{lz.score}</p>
                              <p className="text-xs text-red-300/70">沉睡中</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-red-200/80 text-sm leading-relaxed">
                          以上灵种分数低于60分，处于「沉睡」状态。这些能量的缺失正在悄然侵蚀孩子的学习动力和人生轨迹。
                          {dormantSeeds.some(s => s.type === "定力") && (
                            <span className="block mt-2 text-red-300 font-semibold">
                              ⚠️ 「定力」沉睡：孩子难以专注，容易被外界干扰，作业拖延、课堂走神成为常态。
                            </span>
                          )}
                          {dormantSeeds.some(s => s.type === "支配欲") && (
                            <span className="block mt-2 text-red-300 font-semibold">
                              ⚠️ 「支配欲」沉睡：缺乏内驱力和目标感，对学习提不起兴趣，容易随波逐流。
                            </span>
                          )}
                          {dormantSeeds.some(s => s.type === "胆量") && (
                            <span className="block mt-2 text-red-300 font-semibold">
                              ⚠️ 「胆量」沉睡：害怕挑战难题，遇到困难就退缩，形成"习得性无助"。
                            </span>
                          )}
                          {dormantSeeds.some(s => s.type === "勇气") && (
                            <span className="block mt-2 text-red-300 font-semibold">
                              ⚠️ 「勇气」沉睡：不敢举手发言、不敢尝试新事物，错失成长机会。
                            </span>
                          )}
                        </p>
                      </Card>
                    </div>
                  )}
                </>
              );
            })()}

            {/* 学业镜像（核心扎心部分） */}
            {lingZhong?.academicMirror && (
              <div className="container mx-auto px-4 mt-6">
                <Card className="p-6 bg-gradient-to-br from-red-900/30 to-gray-900/50 border border-red-500/40">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-red-400">学业照妖镜</h3>
                      <p className="text-red-300/70 text-sm">灵种缺失如何导致学业困境</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* 问题根源 */}
                    <div className="p-4 bg-red-950/30 rounded-lg border-l-4 border-red-500">
                      <h4 className="text-lg font-bold text-red-300 mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        问题根源
                      </h4>
                      <p className="text-red-200/80 leading-relaxed whitespace-pre-wrap">
                        {lingZhong.academicMirror.rootCause}
                      </p>
                    </div>

                    {/* 具体表现 */}
                    {lingZhong.academicMirror.manifestations?.length > 0 && (
                      <div className="p-4 bg-red-950/30 rounded-lg border-l-4 border-orange-500">
                        <h4 className="text-lg font-bold text-orange-300 mb-3 flex items-center gap-2">
                          <Eye className="w-5 h-5" />
                          具体表现
                        </h4>
                        <ul className="space-y-3">
                          {lingZhong.academicMirror.manifestations.map((m, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-orange-200/80">
                              <div className="w-6 h-6 rounded-full bg-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-orange-400">{idx + 1}</span>
                              </div>
                              <span className="leading-relaxed">{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 心理机制 */}
                    <div className="p-4 bg-red-950/30 rounded-lg border-l-4 border-purple-500">
                      <h4 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        心理机制
                      </h4>
                      <p className="text-purple-200/80 leading-relaxed whitespace-pre-wrap">
                        {lingZhong.academicMirror.psychologyExplanation}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* 未来警示 */}
            {(lingZhong?.futureWarning || future.scenarioA) && (
              <div className="container mx-auto px-4 mt-6">
                <Card className="p-6 bg-gradient-to-br from-yellow-900/30 to-gray-900/50 border border-yellow-500/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400">未来警示：十年后的崩塌剧本</h3>
                      <p className="text-yellow-300/70 text-sm">如果现在不修正，将会发生什么</p>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-950/30 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-yellow-200/90 leading-relaxed whitespace-pre-wrap text-lg">
                      {lingZhong?.futureWarning || future.scenarioA}
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* ========================================== */}
          {/* 第四板块：终极形态唤醒（生命跨越层） */}
          {/* ========================================== */}
          <Card className="p-8 bg-gradient-to-br from-amber-900/20 to-gray-900 border-amber-400/30 backdrop-blur-sm">
            <div className="text-center mb-6">
              <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/50 text-lg px-6 py-2">
                第四板块 · 终极形态唤醒
              </Badge>
            </div>

            {/* 巅峰描述 */}
            {(ultimate?.peakVision || future.scenarioB) && (
              <div className="p-6 bg-amber-900/20 border border-amber-500/30 rounded-lg mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                  <h3 className="text-2xl font-bold text-amber-400">辉煌人生图景</h3>
                </div>
                <p className="text-amber-100/90 leading-relaxed whitespace-pre-wrap text-lg">
                  {ultimate?.peakVision || future.scenarioB}
                </p>
              </div>
            )}

            {/* 改变命运的一句话 */}
            {ultimate?.unlockKeys?.destinyQuote && (
              <div className="text-center py-8 mb-8">
                <p className="text-3xl font-bold text-amber-400 italic">
                  "{ultimate.unlockKeys.destinyQuote}"
                </p>
                <p className="text-gray-400 mt-2">—— 刻入骨髓的觉醒咒语</p>
              </div>
            )}

            {/* 解锁密钥 */}
            <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-2">
              <Key className="w-8 h-8" />
              三把解锁密钥
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(ultimate?.unlockKeys?.practiceActions || keys).map((key: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-amber-400/30 rounded-lg hover:border-amber-400/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center">
                      <Key className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{key.name}</h4>
                      <Badge variant="outline" className="border-amber-400 text-amber-400 mt-1">
                        课程 {(key.courseIndex || 0) + 1}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {key.solution || key.method}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* ========================================== */}
          {/* 底部行动按钮 */}
          {/* ========================================== */}
          <div className="text-center py-8">
            <Button
              onClick={() => setLocation("/")}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold px-8 py-6 text-xl hover:from-amber-600 hover:to-yellow-700"
            >
              开启觉醒之旅 →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
