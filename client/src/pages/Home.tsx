import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, Zap, Users, Lightbulb, TrendingUp } from "lucide-react";
import { useState } from "react";

/**
 * Design Philosophy: 科技极简主义 + 教育温度
 * - 深色背景 + 极光绿主色 + 毛玻璃效果
 * - 非对称布局，避免居中单调
 * - 流畅的动画和交互
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* 乔门书院品牌标识 */}
      <div className="relative z-50 bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-b border-amber-500/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center">
          <p className="text-xs sm:text-sm text-amber-200 font-medium">乔门书院出品 · 专业青少年天赋测评平台</p>
        </div>
      </div>

      {/* 导航栏 */}
      <nav className="relative z-50 border-b border-white/5 backdrop-blur-md bg-white/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                天赋探境
              </span>
              <p className="text-xs text-gray-500">by 乔门书院</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-300 hover:text-white transition">
              功能特性
            </a>
            <a href="#theory" className="text-sm text-gray-300 hover:text-white transition">
              理论基础
            </a>
            <a href="#testimonials" className="text-sm text-gray-300 hover:text-white transition">
              用户反馈
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左侧文案 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur">
                <span className="text-sm text-emerald-300 font-medium">AI + 心理学深度融合</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                每个孩子都有<br />
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  独特天赋密码
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                融合盖洛普优势理论、荣格心理类型、霍兰德职业兴趣等权威体系，科学解码孩子的天赋基因。
              </p>
            </div>

            {/* CTA 按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="/assessment">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 rounded-xl font-semibold text-lg h-14 px-8 group"
                >
                  开始天赋探索
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/5 rounded-xl font-semibold text-lg h-14 px-8"
              >
                了解更多
              </Button>
            </div>

            {/* 数据展示 */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { label: "测评维度", value: "7大" },
                { label: "分析指标", value: "50+" },
                { label: "报告页数", value: "20页" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition"
                >
                  <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧视觉 */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-md">
              {/* 中心圆形 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 blur-2xl"></div>

              {/* 旋转环 */}
              <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-spin" style={{ animationDuration: "20s" }}></div>
              <div className="absolute inset-8 rounded-full border border-blue-500/20 animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }}></div>

              {/* 中心图标 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center shadow-2xl">
                  <Brain className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* 浮动元素 */}
              {[
                { icon: Target, label: "精准定位", angle: 0 },
                { icon: Zap, label: "优势发挥", angle: 120 },
                { icon: TrendingUp, label: "成长指南", angle: 240 },
              ].map((item, idx) => {
                const Icon = item.icon;
                const rad = (item.angle * Math.PI) / 180;
                const x = Math.cos(rad) * 120;
                const y = Math.sin(rad) * 120;
                return (
                  <div
                    key={idx}
                    className="absolute w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center hover:bg-white/20 transition"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <Icon className="w-8 h-8 text-emerald-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">为什么要探寻天赋？</h2>
          <p className="text-gray-400 text-lg">在正确的方向上努力，才能事半功倍</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: "避免盲目试错",
              desc: "70%的学生在选科和专业选择上存在迷茫，天赋测评帮助精准定位",
              color: "from-emerald-500 to-emerald-600",
            },
            {
              icon: Zap,
              title: "放大优势效应",
              desc: "研究表明，发挥优势比弥补短板效率高6倍",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: Lightbulb,
              title: "建立自信根基",
              desc: "了解自己的独特价值，是心理健康和持续成长的基石",
              color: "from-purple-500 to-purple-600",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredCard(`why-${idx}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Theory Section */}
      <section id="theory" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">科学理论基础</h2>
          <p className="text-gray-400 text-lg">融合全球顶尖心理学研究成果</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "盖洛普优势", desc: "34项才干主题" },
            { name: "荣格类型", desc: "16型人格深度" },
            { name: "霍兰德理论", desc: "职业兴趣匹配" },
            { name: "大五人格", desc: "特质科学测量" },
            { name: "心流理论", desc: "最佳体验状态" },
            { name: "多元智能", desc: "8大智能领域" },
          ].map((theory, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur hover:border-emerald-500/30 transition text-center"
            >
              <h4 className="font-semibold text-lg mb-2">{theory.name}</h4>
              <p className="text-sm text-gray-400">{theory.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Value Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">报告核心价值</h2>
          <p className="text-gray-400 text-lg">不只是测评，更是成长指南</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "大脑使用说明书",
              desc: "解析认知风格、学习偏好、信息处理模式，让孩子学会'用对的方式学习'",
              icon: Brain,
            },
            {
              title: "核心超能力",
              desc: "发现孩子的3大核心优势，提供具体的发挥场景和提升路径",
              icon: Zap,
            },
            {
              title: "选科罗盘",
              desc: "基于天赋特质的学科匹配分析，为新高考选科提供科学依据",
              icon: Target,
            },
            {
              title: "未来航道",
              desc: "结合AI时代趋势，规划适合孩子天赋的职业发展方向",
              icon: TrendingUp,
            },
          ].map((value, idx) => {
            const Icon = value.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur hover:border-emerald-500/30 transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Difference Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-emerald-500/20 via-blue-500/10 to-purple-500/20 border border-white/10 backdrop-blur rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-12 text-center">我们的不同</h2>
          <p className="text-center text-gray-300 mb-12 text-lg">不是简单的性格测试</p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "多维度融合",
                desc: "7大测评维度交叉分析，而非单一量表",
              },
              {
                title: "AI深度解读",
                desc: "基于大模型的个性化内容生成，拒绝模板化",
              },
              {
                title: "行动导向",
                desc: "每个洞察都配有具体可执行的行动建议",
              },
              {
                title: "成长视角",
                desc: "关注潜力发展，而非简单贴标签",
              },
            ].map((diff, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-1 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{diff.title}</h4>
                  <p className="text-gray-400">{diff.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">真实用户反馈</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "报告里说我有'系统性思维'的天赋，建议我学编程。现在我已经能独立做小程序了，原来我不是'爱分心'，是脑子转得快！",
              author: "小明",
              role: "14岁 · 初二学生",
            },
            {
              quote:
                "家长指南里的沟通建议太实用了。以前总觉得女儿'太敏感'，现在知道这是她的'共情天赋'，我们的关系好多了。",
              author: "张女士",
              role: "家长",
            },
            {
              quote:
                "选科的时候特别纠结，报告分析说我适合'物化生'组合，还解释了为什么。现在高二了，成绩确实比以前好。",
              author: "小雨",
              role: "16岁 · 高二学生",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-emerald-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">准备好发现天赋了吗？</h2>
          <p className="text-xl text-gray-400 mb-8">15分钟测评，开启成长新视角</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 rounded-xl font-semibold text-lg h-14 px-10 group"
          >
            立即开始
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 backdrop-blur-md bg-white/2 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <span className="font-bold">天赋探境</span>
              </div>
              <p className="text-sm text-gray-400">AI与心理学的深度融合</p>
            </div>
            {[
              { title: "产品", links: ["功能特性", "定价方案", "常见问题"] },
              { title: "公司", links: ["关于我们", "博客", "联系我们"] },
              { title: "法律", links: ["隐私政策", "服务条款", "Cookie政策"] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-sm text-gray-400 hover:text-white transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
            <p className="text-amber-200/80 font-medium mb-2">乔门书院 · 专业青少年天赋测评平台</p>
            <p>&copy; 2024 天赋探境. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
