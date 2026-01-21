import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Key,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { generateReportByAI } from "@/services/aiService";
import type { ReportData, PyramidStatus } from "@/types/report";

export default function Report() {
  const [, setLocation] = useLocation();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("正在链接命运数据库...");
  const [error, setError] = useState<string | null>(null);

  // 加载动画消息列表
  const loadingMessages = [
    "正在链接命运数据库...",
    "分析第 1 层原力：安全基础...",
    "分析第 2 层原力：亲密关系...",
    "分析第 3 层原力：目标设定...",
    "分析第 4 层原力：成就动机...",
    "计算五维能力雷达图...",
    "生成未来剧本推演...",
    "解锁行动锦囊...",
    "报告生成完成！",
  ];

  useEffect(() => {
    // 从 sessionStorage 获取答案
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

    // 模拟加载动画
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length - 1) {
        messageIndex++;
        setLoadingMessage(loadingMessages[messageIndex]);
      }
    }, 800);

    // 调用 AI 生成报告
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
        {/* 背景动画 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ff88]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#00ff88]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* 加载内容 */}
        <div className="relative z-10 text-center space-y-8">
          {/* 旋转的科技感图标 */}
          <div className="relative">
            <div className="w-32 h-32 border-4 border-[#00ff88] border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-[#00ff88] animate-pulse" />
            </div>
          </div>

          {/* 加载消息 */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#00ff88] animate-pulse">
              {loadingMessage}
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>

          {/* 进度提示 */}
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            正在使用 AI 深度分析您的答案组合，生成个性化诊断报告...
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
                className="bg-[#00ff88] text-black hover:bg-[#00cc6a]"
              >
                重新测试
              </Button>
              <Button
                onClick={() => setLocation("/")}
                variant="outline"
                className="border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10"
              >
                返回首页
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // ==========================================
  // 报告数据渲染
  // ==========================================
  if (!reportData) {
    return null;
  }

  const { identity, pyramid, future, keys } = reportData;

  // 准备雷达图数据
  const radarData = identity.radar.map((item) => ({
    subject: item.subject,
    score: item.A,
    fullMark: item.fullMark,
  }));

  // 获取状态样式
  const getStatusStyle = (status: PyramidStatus) => {
    switch (status) {
      case "collapse":
        return {
          bg: "bg-red-900/30",
          border: "border-red-500/50",
          text: "text-red-400",
          icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
        };
      case "unstable":
        return {
          bg: "bg-yellow-900/30",
          border: "border-yellow-500/50",
          text: "text-yellow-400",
          icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
        };
      case "solid":
        return {
          bg: "bg-green-900/30",
          border: "border-green-500/50",
          text: "text-green-400",
          icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#00ff88]/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="text-[#00ff88] hover:bg-[#00ff88]/10"
          >
            ← 返回首页
          </Button>
          <div className="text-sm text-gray-400">
            报告生成时间: {new Date().toLocaleString("zh-CN")}
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* ========================================== */}
        {/* 板块 1: 身份卡 */}
        {/* ========================================== */}
        <Card className="p-8 bg-gradient-to-br from-gray-900 to-black border-[#00ff88]/30 backdrop-blur-sm">
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold text-[#00ff88] mb-2">
                {identity.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4">{identity.subtitle}</p>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-[#00ff88] text-black text-lg px-4 py-1">
                  总分: {identity.score} 分
                </Badge>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {identity.description}
              </p>
            </div>

            {/* 雷达图 */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-[#00ff88] mb-6">五维能力雷达图</h2>
              {radarData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#00ff88" strokeOpacity={0.3} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#00ff88", fontSize: 14 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "#00ff88", fontSize: 12 }}
                    />
                    <Radar
                      name="能力得分"
                      dataKey="score"
                      stroke="#00ff88"
                      fill="#00ff88"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-96 flex items-center justify-center text-gray-400">
                  暂无雷达图数据
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* ========================================== */}
        {/* 板块 2: 金字塔 */}
        {/* ========================================== */}
        <Card className="p-8 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-[#00ff88] mb-6">五原力金字塔</h2>
          <div className="space-y-4">
            {pyramid.map((layer, idx) => {
              const statusStyle = getStatusStyle(layer.status);
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-lg border ${statusStyle.bg} ${statusStyle.border}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {statusStyle.icon}
                      <div>
                        <h3 className="text-xl font-bold text-white">{layer.layer}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                layer.status === "collapse"
                                  ? "bg-gradient-to-r from-red-500 to-red-600"
                                  : layer.status === "unstable"
                                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                                  : "bg-gradient-to-r from-green-500 to-green-600"
                              }`}
                              style={{ width: `${layer.score}%` }}
                            />
                          </div>
                          <span className={`font-bold ${statusStyle.text}`}>
                            {layer.score} 分
                          </span>
                          <Badge
                            variant="outline"
                            className={`${statusStyle.border} ${statusStyle.text}`}
                          >
                            {layer.status === "collapse"
                              ? "塌陷"
                              : layer.status === "unstable"
                              ? "不稳"
                              : "稳固"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className={`leading-relaxed ${statusStyle.text}`}>
                    {layer.diagnosis}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ========================================== */}
        {/* 板块 3: 时光机（未来剧本） */}
        {/* ========================================== */}
        <Card className="p-8 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-[#00ff88] mb-6 flex items-center gap-2">
            <Calendar className="w-8 h-8" />
            未来剧本推演
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 剧本A：悲惨现状 */}
            <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold text-red-400">剧本A：维持现状</h3>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {future.scenarioA}
              </p>
            </div>

            {/* 剧本B：觉醒辉煌 */}
            <div className="p-6 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-green-400">剧本B：觉醒辉煌</h3>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {future.scenarioB}
              </p>
            </div>
          </div>
        </Card>

        {/* ========================================== */}
        {/* 板块 4: 密钥（行动锦囊） */}
        {/* ========================================== */}
        <Card className="p-8 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-[#00ff88] mb-6 flex items-center gap-2">
            <Key className="w-8 h-8" />
            解锁密钥
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keys.map((key, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-[#00ff88]/30 rounded-lg hover:border-[#00ff88]/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                    <Key className="w-5 h-5 text-[#00ff88]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{key.name}</h3>
                    <Badge variant="outline" className="border-[#00ff88] text-[#00ff88] mt-1">
                      课程 {key.courseIndex + 1}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {key.solution}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
