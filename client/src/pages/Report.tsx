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
  Clock,
  Calendar,
  Lightbulb,
  Target,
  ArrowRight,
  BookOpen,
  Film,
  Gamepad2,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { AssessmentReport } from "@/types/reportSchema";

// ==========================================
// 静态 Mock 报告数据（1.0 版本）
// ==========================================
const mockReport: AssessmentReport = {
  id: "report_001",
  meta: {
    userName: "测试用户",
    age: 14,
    gender: "male",
    reportDate: new Date().toISOString(),
    totalWords: 14420,
  },
  overview: {
    persona: {
      title: "奇幻创意家",
      quote: "一个能用兔子耳朵把粉笔灰的神奇创意家",
      summary: "你是一个充满想象力的创意天才。你的思维不受常规束缚，总能从独特的角度看待问题。你善于将看似不相关的事物联系起来，创造出令人惊喜的解决方案。这种创新能力是你最宝贵的财富，也是你未来发展的核心优势。",
    },
    radar: [
      { category: "创新思维", score: 90, level: "S" },
      { category: "系统思维", score: 75, level: "A" },
      { category: "共情能力", score: 85, level: "A" },
      { category: "学习能力", score: 80, level: "A" },
      { category: "领导力", score: 70, level: "B" },
    ],
    metaphor: {
      object: "自动贩卖机",
      description: "你就像一台自动贩卖机，总是能在需要的时候提供各种创意和想法。你的思维灵活多变，能够根据不同情况快速切换模式，就像贩卖机可以提供不同种类的商品一样。",
    },
    keyTraits: [
      {
        name: "想象力丰富",
        type: "strength",
        desc: "你拥有天马行空的想象力，能够创造出独特的想法和解决方案。",
      },
      {
        name: "思维灵活",
        type: "strength",
        desc: "你能够快速适应新环境，从不同角度思考问题。",
      },
      {
        name: "创新潜力",
        type: "potential",
        desc: "你有巨大的创新潜力，可以通过系统化训练进一步提升。",
      },
      {
        name: "执行能力",
        type: "potential",
        desc: "将创意转化为实际行动的能力还有提升空间。",
      },
      {
        name: "注意力分散",
        type: "concern",
        desc: "有时会因为想法太多而难以专注，需要学会筛选和聚焦。",
      },
      {
        name: "细节把控",
        type: "concern",
        desc: "在追求创新的同时，需要注意细节的完善。",
      },
    ],
  },
  interpretation: {
    bigFive: [
      {
        name: "开放性",
        score: 92,
        description: "你具有极高的开放性，对新事物充满好奇，喜欢探索未知领域。你能够接受不同的观点和想法，思维不受传统束缚。",
        evidence: "你说'用兔子耳朵当粉笔'，体现了你丰富的想象力和打破常规的思维方式。",
      },
      {
        name: "责任心",
        score: 75,
        description: "你具有一定的责任心，能够完成基本任务，但在长期坚持方面还有提升空间。",
        evidence: "基于测评得分推演，你在完成任务时表现稳定。",
      },
      {
        name: "外向性",
        score: 80,
        description: "你比较外向，喜欢与人交流，能够表达自己的想法。在团队中能够积极参与讨论。",
        evidence: "你在对话中表现出良好的沟通意愿。",
      },
      {
        name: "宜人性",
        score: 85,
        description: "你具有较高的宜人性，能够理解他人感受，善于合作。你关心他人，愿意帮助别人解决问题。",
        evidence: "基于测评得分推演，你展现出良好的共情能力。",
      },
      {
        name: "神经质",
        score: 60,
        description: "你的情绪相对稳定，能够较好地应对压力和挑战。偶尔会有一些焦虑，但整体情绪管理良好。",
        evidence: "基于测评得分推演，你的情绪稳定性较好。",
      },
    ],
    riasec: {
      code: "RAI",
      analysis: "你的兴趣类型是研究型(R)、艺术型(A)和调研型(I)的组合。你适合从事需要创新思维和深度思考的工作，如科学研究、艺术创作、产品设计等领域。",
    },
    learningStyle: {
      type: "情境依赖型",
      suggestions: "你更适合通过实际项目和情境来学习。建议你多参与实践项目，通过动手操作来加深理解。同时，可以尝试将抽象概念与具体场景联系起来，这样能提高学习效率。",
    },
  },
  actions: {
    cards: [
      {
        title: "家庭气象大会",
        type: "Game",
        timeRequired: "30分钟/周",
        sciencePrinciple: "利用多巴胺回路，通过游戏化方式激发学习兴趣，提高参与度。",
        whyItFits: "这个游戏能够充分发挥你的想象力和创造力，同时培养系统思维能力。",
        steps: [
          "每周选择一个天气主题（如：台风、彩虹、雪）",
          "和家人一起讨论这个天气现象的形成原理",
          "用创意方式表达（绘画、故事、模型等）",
        ],
        expectedOutcome: "提升对自然现象的理解，增强家庭互动，培养表达能力。",
      },
      {
        title: "创意日记本",
        type: "Habit",
        timeRequired: "15分钟/天",
        sciencePrinciple: "通过持续记录培养元认知能力，增强自我反思和规划能力。",
        whyItFits: "能够帮助你整理和记录各种创意想法，避免遗忘，同时培养坚持的习惯。",
        steps: [
          "准备一个专门的创意日记本",
          "每天记录一个创意想法或观察",
          "每周回顾并选择最有价值的想法深入思考",
        ],
        expectedOutcome: "积累创意素材库，提升思维组织能力，培养持续学习的习惯。",
      },
      {
        title: "科学实验项目",
        type: "Project",
        timeRequired: "2小时/周",
        sciencePrinciple: "通过动手实践激活多感官学习，加深对科学原理的理解。",
        whyItFits: "能够满足你的探索欲望，通过实验验证想法，培养科学思维。",
        steps: [
          "选择一个感兴趣的科学主题（如：化学反应、物理现象）",
          "设计一个简单的实验方案",
          "执行实验并记录观察结果",
          "分析结果并得出结论",
        ],
        expectedOutcome: "提升科学素养，培养实验设计能力，增强逻辑思维。",
      },
    ],
  },
  roadmap: {
    weeklyPlan: [
      {
        week: 1,
        theme: "唤醒周",
        tasks: [
          "完成创意日记本的第一周记录",
          "参与一次家庭气象大会",
          "阅读一本关于创新的书籍",
        ],
      },
      {
        week: 2,
        theme: "探索周",
        tasks: [
          "开始第一个科学实验项目",
          "继续创意日记记录",
          "尝试用新方法解决一个问题",
        ],
      },
      {
        week: 3,
        theme: "深化周",
        tasks: [
          "完成科学实验并总结",
          "分享创意日记中的优秀想法",
          "参与团队协作项目",
        ],
      },
      {
        week: 4,
        theme: "整合周",
        tasks: [
          "回顾四周的成长和收获",
          "制定下个月的改进计划",
          "向他人展示自己的创意成果",
        ],
      },
    ],
    dailyRoutine: [
      {
        period: "Morning",
        activity: "魔法生物叫早",
        duration: "10分钟",
      },
      {
        period: "Afternoon",
        activity: "创意时间",
        duration: "30分钟",
      },
      {
        period: "Evening",
        activity: "反思总结",
        duration: "15分钟",
      },
    ],
  },
  parentGuide: {
    communication: [
      {
        dontSay: "别整天想没用的",
        harm: "这会打击孩子的创新积极性，扼杀想象力。",
        doSay: "你的角度真特别，能详细说说你的想法吗？",
      },
      {
        dontSay: "这有什么用？",
        harm: "会让孩子觉得自己的创意没有价值，失去探索的动力。",
        doSay: "这个想法很有趣，我们看看能不能实现它。",
      },
      {
        dontSay: "按我说的做",
        harm: "会限制孩子的独立思考能力，阻碍创新思维发展。",
        doSay: "你觉得哪种方法更好？我们可以一起讨论。",
      },
    ],
    dailyChecklist: [
      "每天至少给孩子一次表达创意的机会",
      "认真倾听孩子的想法，不要急于否定",
      "鼓励孩子将想法付诸实践，提供必要的支持",
    ],
  },
  appendix: {
    books: [
      {
        title: "《创新者的基因》",
        reason: "帮助你理解创新的本质，学习如何培养创新思维。",
      },
      {
        title: "《思维导图》",
        reason: "学会用视觉化方式整理思维，提升思维组织能力。",
      },
    ],
    movies: [
      {
        title: "《头脑特工队》",
        reason: "通过动画形式理解情绪和思维的关系，激发对心理学的兴趣。",
      },
      {
        title: "《隐藏人物》",
        reason: "展现创新思维如何改变世界，激励你追求梦想。",
      },
    ],
    games: [
      {
        title: "《我的世界》",
        reason: "通过创造和建造培养空间思维和系统思维能力。",
      },
      {
        title: "《文明》系列",
        reason: "培养战略思维和系统规划能力，理解复杂系统的运作。",
      },
    ],
  },
};

export default function Report() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [report, setReport] = useState<AssessmentReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  // ==========================================
  // 简化版：直接加载静态数据
  // ==========================================
  useEffect(() => {
    // 模拟短暂加载（可选，也可以直接设置）
    setTimeout(() => {
      setReport(mockReport);
      setIsGenerating(false);
    }, 500);
  }, []);

  // ==========================================
  // 渲染保护
  // ==========================================
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#00ff88] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="p-8 bg-gray-900 border-[#00ff88]">
          <div className="text-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold">报告加载失败</h2>
            <Button
              onClick={() => setLocation("/")}
              className="bg-[#00ff88] text-black hover:bg-[#00cc6a]"
            >
              返回首页
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ==========================================
  // 安全解构数据
  // ==========================================
  const overview = report?.overview || {
    persona: { title: "", quote: "", summary: "" },
    radar: [],
    metaphor: { object: "", description: "" },
    keyTraits: [],
  };

  const interpretation = report?.interpretation || {
    bigFive: [],
    riasec: { code: "", analysis: "" },
    learningStyle: { type: "", suggestions: "" },
  };

  const actions = report?.actions || { cards: [] };
  const roadmap = report?.roadmap || { weeklyPlan: [], dailyRoutine: [] };
  const parentGuide = report?.parentGuide || { communication: [], dailyChecklist: [] };
  const appendix = report?.appendix || { books: [], movies: [], games: [] };
  const meta = report?.meta || { userName: "", age: 0, gender: "", reportDate: "", totalWords: 0 };

  // 准备雷达图数据
  const radarData = (overview?.radar || []).map((item) => ({
    category: item?.category || "",
    score: item?.score || 0,
    fullMark: 100,
  }));

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
            报告生成时间: {meta?.reportDate ? new Date(meta.reportDate).toLocaleString("zh-CN") : "未知"}
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-900/50 border border-[#00ff88]/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#00ff88] data-[state=active]:text-black"
            >
              概览
            </TabsTrigger>
            <TabsTrigger
              value="interpretation"
              className="data-[state=active]:bg-[#00ff88] data-[state=active]:text-black"
            >
              深度
            </TabsTrigger>
            <TabsTrigger
              value="actions"
              className="data-[state=active]:bg-[#00ff88] data-[state=active]:text-black"
            >
              建议
            </TabsTrigger>
            <TabsTrigger
              value="roadmap"
              className="data-[state=active]:bg-[#00ff88] data-[state=active]:text-black"
            >
              规划
            </TabsTrigger>
            <TabsTrigger
              value="parent"
              className="data-[state=active]:bg-[#00ff88] data-[state=active]:text-black"
            >
              家长
            </TabsTrigger>
            <TabsTrigger
              value="appendix"
              className="data-[state=active]:bg-[#00ff88] data-[state=active]:text-black"
            >
              附录
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: 概览 */}
          <TabsContent value="overview" className="mt-8 space-y-8">
            {/* 用户头像 + 称号 + 金句 */}
            <Card className="p-8 bg-gradient-to-br from-gray-900 to-black border-[#00ff88]/30 backdrop-blur-sm">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-2 border-[#00ff88]">
                  <AvatarFallback className="bg-[#00ff88]/20 text-[#00ff88] text-3xl font-bold">
                    {meta?.userName?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-5xl font-bold text-[#00ff88] mb-2">
                    {overview?.persona?.title || ""}
                  </h1>
                  <p className="text-xl text-gray-300 italic mb-4">
                    "{overview?.persona?.quote || ""}"
                  </p>
                  <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                    {overview?.persona?.summary || ""}
                  </p>
                </div>
              </div>
            </Card>

            {/* 雷达图 */}
            <Card className="p-8 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-[#00ff88] mb-6">五维能力雷达图</h2>
              {radarData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#00ff88" strokeOpacity={0.3} />
                    <PolarAngleAxis
                      dataKey="category"
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
            </Card>

            {/* 形象比喻 */}
            <Card className="p-6 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-[#00ff88]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#00ff88] mb-2">
                    你就像一台 {overview?.metaphor?.object || ""}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {overview?.metaphor?.description || ""}
                  </p>
                </div>
              </div>
            </Card>

            {/* 核心特质 */}
            <Card className="p-6 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-[#00ff88] mb-4">核心特质</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(overview?.keyTraits || []).map((trait, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${
                      trait?.type === "strength"
                        ? "bg-green-900/20 border-green-500/30"
                        : trait?.type === "potential"
                        ? "bg-blue-900/20 border-blue-500/30"
                        : "bg-yellow-900/20 border-yellow-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {trait?.type === "strength" && (
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                      )}
                      {trait?.type === "potential" && (
                        <Target className="w-5 h-5 text-blue-400 mt-0.5" />
                      )}
                      {trait?.type === "concern" && (
                        <XCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      )}
                      <div>
                        <Badge
                          variant="outline"
                          className={`mb-2 ${
                            trait?.type === "strength"
                              ? "border-green-500 text-green-400"
                              : trait?.type === "potential"
                              ? "border-blue-500 text-blue-400"
                              : "border-yellow-500 text-yellow-400"
                          }`}
                        >
                          {trait?.type === "strength"
                            ? "优势"
                            : trait?.type === "potential"
                            ? "潜力"
                            : "关注"}
                        </Badge>
                        <h4 className="font-semibold text-white mb-1">{trait?.name || ""}</h4>
                        <p className="text-sm text-gray-400">{trait?.desc || ""}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Tab 2: 深度解读 */}
          <TabsContent value="interpretation" className="mt-8 space-y-6">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#00ff88]">大五人格分析</h2>
              {(interpretation?.bigFive || []).map((dimension, idx) => (
                <Card
                  key={idx}
                  className="p-6 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {dimension?.name || ""}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00ff88] to-[#00cc6a]"
                            style={{ width: `${dimension?.score || 0}%` }}
                          />
                        </div>
                        <span className="text-[#00ff88] font-bold">
                          {dimension?.score || 0}分
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {dimension?.description || ""}
                  </p>
                  {/* 证据高亮 */}
                  <div className="mt-4 p-4 bg-purple-900/30 border-l-4 border-purple-500 rounded-r-lg">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-purple-300 mb-1">
                          对话中的证据：
                        </p>
                        <p className="text-purple-200 italic leading-relaxed">
                          "{dimension?.evidence || ""}"
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Separator className="bg-[#00ff88]/20" />

            {/* RIASEC */}
            <Card className="p-6 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-[#00ff88] mb-4">霍兰德兴趣类型</h3>
              <div className="space-y-3">
                <Badge className="bg-[#00ff88] text-black text-lg px-4 py-2">
                  {interpretation?.riasec?.code || ""}
                </Badge>
                <p className="text-gray-300 leading-relaxed">
                  {interpretation?.riasec?.analysis || ""}
                </p>
              </div>
            </Card>

            {/* 学习风格 */}
            <Card className="p-6 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-[#00ff88] mb-4">学习风格</h3>
              <div className="space-y-3">
                <Badge
                  variant="outline"
                  className="border-[#00ff88] text-[#00ff88] text-lg px-4 py-2"
                >
                  {interpretation?.learningStyle?.type || ""}
                </Badge>
                <p className="text-gray-300 leading-relaxed">
                  {interpretation?.learningStyle?.suggestions || ""}
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 3: 行为建议 */}
          <TabsContent value="actions" className="mt-8">
            <h2 className="text-3xl font-bold text-[#00ff88] mb-6">个性化行动建议</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(actions?.cards || []).map((card, idx) => (
                <Card
                  key={idx}
                  className="p-6 h-full bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex-1">{card?.title || ""}</h3>
                    <Badge
                      variant="outline"
                      className={`ml-2 ${
                        card?.type === "Game"
                          ? "border-green-500 text-green-400"
                          : card?.type === "Project"
                          ? "border-blue-500 text-blue-400"
                          : "border-purple-500 text-purple-400"
                      }`}
                    >
                      {card?.type === "Game"
                        ? "游戏"
                        : card?.type === "Project"
                        ? "项目"
                        : "习惯"}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{card?.timeRequired || ""}</span>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">科学原理</p>
                      <p className="text-sm text-gray-300">{card?.sciencePrinciple || ""}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">为什么适合你：</p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {card?.whyItFits || ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#00ff88] mb-2">执行步骤：</p>
                      <ol className="space-y-2">
                        {(card?.steps || []).map((step, stepIdx) => (
                          <li key={stepIdx} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="w-6 h-6 rounded-full bg-[#00ff88]/20 text-[#00ff88] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {stepIdx + 1}
                            </span>
                            <span className="flex-1">{step || ""}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">预期效果</p>
                      <p className="text-sm text-[#00ff88]">{card?.expectedOutcome || ""}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab 4: 发展规划 */}
          <TabsContent value="roadmap" className="mt-8">
            <h2 className="text-3xl font-bold text-[#00ff88] mb-6">30天启动计划</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#00ff88]" />
                  周计划
                </h3>
                <div className="space-y-4">
                  {(roadmap?.weeklyPlan || []).map((week, idx) => (
                    <Card
                      key={idx}
                      className="p-6 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#00ff88] font-bold text-lg">
                            第{week?.week || 0}周
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-[#00ff88] mb-2">
                            {week?.theme || ""}
                          </h4>
                          <ul className="space-y-2">
                            {(week?.tasks || []).map((task, taskIdx) => (
                              <li
                                key={taskIdx}
                                className="flex items-start gap-2 text-gray-300"
                              >
                                <ArrowRight className="w-4 h-4 text-[#00ff88] mt-1 flex-shrink-0" />
                                <span>{task || ""}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator className="bg-[#00ff88]/20" />

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#00ff88]" />
                  每日 SOP
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(roadmap?.dailyRoutine || []).map((routine, idx) => (
                    <Card
                      key={idx}
                      className="p-4 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm"
                    >
                      <Badge
                        variant="outline"
                        className="mb-3 border-[#00ff88] text-[#00ff88]"
                      >
                        {routine?.period === "Morning"
                          ? "早晨"
                          : routine?.period === "Afternoon"
                          ? "下午"
                          : "晚上"}
                      </Badge>
                      <h4 className="font-semibold text-white mb-2">
                        {routine?.activity || ""}
                      </h4>
                      <p className="text-sm text-gray-400">{routine?.duration || ""}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 5: 家长指南 */}
          <TabsContent value="parent" className="mt-8">
            <h2 className="text-3xl font-bold text-[#00ff88] mb-6">家长沟通指南</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">话术红黑榜</h3>
                <div className="space-y-4">
                  {(parentGuide?.communication || []).map((comm, idx) => (
                    <Card
                      key={idx}
                      className="p-6 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <XCircle className="w-5 h-5 text-red-400" />
                            <span className="font-semibold text-red-400">别说</span>
                          </div>
                          <p className="text-red-300 mb-2">"{comm?.dontSay || ""}"</p>
                          <p className="text-xs text-red-400/80">{comm?.harm || ""}</p>
                        </div>
                        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="font-semibold text-green-400">要说</span>
                          </div>
                          <p className="text-green-300">"{comm?.doSay || ""}"</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator className="bg-[#00ff88]/20" />

              <div>
                <h3 className="text-xl font-bold text-white mb-4">每日检查清单</h3>
                <Card className="p-6 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm">
                  <ul className="space-y-3">
                    {(parentGuide?.dailyChecklist || []).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                        <span>{item || ""}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab 6: 附录 */}
          <TabsContent value="appendix" className="mt-8">
            <h2 className="text-3xl font-bold text-[#00ff88] mb-6">推荐资源</h2>
            <div className="space-y-8">
              {(appendix?.books || []).length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#00ff88]" />
                    推荐书籍
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(appendix?.books || []).map((book, idx) => (
                      <Card
                        key={idx}
                        className="p-4 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm"
                      >
                        <h4 className="font-semibold text-white mb-2">{book?.title || ""}</h4>
                        <p className="text-sm text-gray-400">{book?.reason || ""}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {(appendix?.movies || []).length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Film className="w-5 h-5 text-[#00ff88]" />
                    推荐电影
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(appendix?.movies || []).map((movie, idx) => (
                      <Card
                        key={idx}
                        className="p-4 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm"
                      >
                        <h4 className="font-semibold text-white mb-2">{movie?.title || ""}</h4>
                        <p className="text-sm text-gray-400">{movie?.reason || ""}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {(appendix?.games || []).length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-[#00ff88]" />
                    推荐游戏
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(appendix?.games || []).map((game, idx) => (
                      <Card
                        key={idx}
                        className="p-4 bg-gray-900/50 border-[#00ff88]/20 backdrop-blur-sm"
                      >
                        <h4 className="font-semibold text-white mb-2">{game?.title || ""}</h4>
                        <p className="text-sm text-gray-400">{game?.reason || ""}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
