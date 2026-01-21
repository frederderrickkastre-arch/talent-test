import { useLocation } from "wouter";
import {
  Sparkles,
  Compass,
  Triangle,
  EyeOff,
  Brain,
  Database,
  Zap,
  Star,
  Quote,
  ArrowRight,
  Shield,
  Clock,
  MessageCircle,
  Phone,
} from "lucide-react";

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden nebula-bg">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-purple/5 rounded-full blur-3xl" />

        {/* Data stream lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                right: 0,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Decorative top element */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <Sparkles className="w-6 h-6 text-gold absolute -top-2.5 left-1/2 -translate-x-1/2" />
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-wider">
          <span className="text-gradient-gold">乔门</span>
          <span className="text-foreground/80 mx-2">·</span>
          <span className="text-foreground">少年天命觉醒系统</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light tracking-wide">
          这不是测试，这是一次
          <span className="text-cyber-purple-light font-medium">穿越 20 年</span>
          的命运推演
        </p>

        {/* Secondary tagline */}
        <p className="text-sm md:text-base text-muted-foreground/70 mb-12 max-w-2xl mx-auto">
          融合三才古智慧 × AI 数据引擎 | 揭示您孩子的隐藏天赋密码
        </p>

        {/* CTA Button - 最大的按钮，添加跳转 */}
        <button
          onClick={() => setLocation("/quiz")}
          className="group relative px-12 py-7 text-xl font-semibold bg-gradient-to-r from-gold-dark via-gold to-gold-light text-background hover:from-gold hover:via-gold-light hover:to-gold border-0 rounded-xl transition-all duration-300 hover:scale-105 border-glow-gold"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            立即开启觉醒试炼
          </span>
        </button>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span>10,000+ 家庭信赖</span>
          </div>
          <div
            className="flex items-center gap-2"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="w-2 h-2 bg-cyber-purple-light rounded-full animate-pulse" />
            <span>AI 深度分析</span>
          </div>
          <div
            className="flex items-center gap-2"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span>三才理论基础</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

// ============================================
// PAIN POINTS SECTION
// ============================================
const painPoints = [
  {
    icon: Compass,
    title: "盲目跟风",
    description:
      "看别人学什么就学什么，孩子的兴趣班报了一堆，钱花了不少，却找不到真正的方向",
    stat: "73%",
    statLabel: "的家长陷入此困境",
  },
  {
    icon: Triangle,
    title: "金字塔陷阱",
    description:
      "所有人都在挤同一条赛道，99%的孩子注定成为'塔基'，却从不知道其他可能性",
    stat: "89%",
    statLabel: "的天赋被埋没",
  },
  {
    icon: EyeOff,
    title: "认知盲区",
    description:
      "用成人的经验和偏见限制孩子，看不见他们与生俱来的独特天赋密码",
    stat: "95%",
    statLabel: "的家长无法识别",
  },
];

function PainPointsSection() {
  return (
    <section className="relative py-24 px-4 bg-background">
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-warning-red/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-warning-red/30 bg-warning-red/5 mb-6">
            <div className="w-2 h-2 bg-warning-red rounded-full animate-pulse" />
            <span className="text-warning-red text-sm font-medium">警示</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            为什么 <span className="text-warning-red">90%</span> 的家长
            <br />
            都在做无效努力？
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            在错误的方向上，越努力越迷失。是时候打破认知牢笼了。
          </p>
        </div>

        {/* Pain Point Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-secondary/50 border border-warning-red/20 border-glow-red transition-all duration-300 hover:border-warning-red/40 hover:scale-[1.02]"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-warning-red/10 border border-warning-red/20 flex items-center justify-center mb-6 group-hover:bg-warning-red/20 transition-colors">
                <point.icon className="w-8 h-8 text-warning-red" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {point.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {point.description}
              </p>

              {/* Stat */}
              <div className="pt-4 border-t border-border/50">
                <span className="text-3xl font-bold text-warning-red">
                  {point.stat}
                </span>
                <span className="text-muted-foreground text-sm ml-2">
                  {point.statLabel}
                </span>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-warning-red/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// THEORY SECTION
// ============================================
const theories = [
  {
    icon: Sparkles,
    title: "三才古智",
    subtitle: "天·地·人",
    description: "源自《易经》的三才理论，揭示天赋、环境与人格的神秘联结",
    color: "gold",
  },
  {
    icon: Brain,
    title: "AI 神经引擎",
    subtitle: "Deep Learning",
    description: "千万级样本训练的深度学习模型，精准解码天赋基因图谱",
    color: "purple",
  },
  {
    icon: Database,
    title: "大数据图谱",
    subtitle: "10M+ Data Points",
    description: "整合全球教育心理学研究成果，构建多维天赋评估矩阵",
    color: "gold",
  },
  {
    icon: Zap,
    title: "量子推演",
    subtitle: "20 Years Forward",
    description: "基于时间序列分析，模拟未来20年人生发展轨迹与关键节点",
    color: "purple",
  },
];

function TheorySection() {
  return (
    <section className="relative py-24 px-4 nebula-bg overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-px h-96 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-px h-96 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium">核心引擎</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">AI + 古智慧</span>
            <br />
            <span className="text-foreground">双核驱动系统</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            将千年东方智慧与尖端人工智能深度融合，打造独一无二的天赋解读引擎
          </p>
        </div>

        {/* Theory Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {theories.map((theory, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                theory.color === "gold"
                  ? "border border-gold/30 border-glow-gold hover:border-gold/50"
                  : "border border-cyber-purple/30 hover:border-cyber-purple/50"
              }`}
              style={{
                boxShadow:
                  theory.color === "purple"
                    ? "0 0 20px rgba(109, 40, 217, 0.2), inset 0 0 20px rgba(109, 40, 217, 0.05)"
                    : undefined,
              }}
            >
              {/* Icon and Title Row */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                    theory.color === "gold"
                      ? "bg-gold/10 border border-gold/30"
                      : "bg-cyber-purple/10 border border-cyber-purple/30"
                  }`}
                >
                  <theory.icon
                    className={`w-7 h-7 ${
                      theory.color === "gold"
                        ? "text-gold"
                        : "text-cyber-purple-light"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {theory.title}
                  </h3>
                  <span
                    className={`text-xs font-mono ${
                      theory.color === "gold"
                        ? "text-gold/70"
                        : "text-cyber-purple-light/70"
                    }`}
                  >
                    {theory.subtitle}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {theory.description}
              </p>

              {/* Decorative element */}
              <div
                className={`absolute bottom-4 right-4 w-20 h-20 rounded-full opacity-10 blur-2xl ${
                  theory.color === "gold" ? "bg-gold" : "bg-cyber-purple"
                }`}
              />

              {/* Connection line for grid effect */}
              {index < 2 && (
                <div className="hidden md:block absolute -bottom-3 left-1/2 w-px h-6 bg-gradient-to-b from-gold/30 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Central connector visual */}
        <div className="flex justify-center mt-8">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

// ============================================
// VALUE SECTION
// ============================================
const reportModules = [
  {
    number: "01",
    items: ["天赋类型识别", "性格倾向分析", "学习风格画像"],
  },
  {
    number: "02",
    items: ["五维能量雷达图", "潜能激活建议", "成长路径规划"],
  },
  {
    number: "03",
    items: ["关键年龄节点", "最佳发展窗口", "风险预警提示"],
  },
];

function ValueSection() {
  return (
    <section className="relative py-24 px-4 bg-background overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 border border-gold rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 border border-cyber-purple rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Star className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium">报告内容</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">每个孩子都有</span>
            <br />
            <span className="text-gradient-purple">独特天赋密码</span>
          </h2>
        </div>

        {/* Report Modules Grid - Matching Reference Design */}
        <div className="space-y-6">
          {reportModules.map((module, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-card/30 border border-gold/30"
              style={{
                boxShadow:
                  "0 0 30px rgba(212, 175, 55, 0.1), inset 0 0 30px rgba(212, 175, 55, 0.02)",
              }}
            >
              {/* Number badge - positioned at top right */}
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full border border-gold/50 bg-background">
                <span className="text-gold font-medium text-sm">
                  {module.number}
                </span>
              </div>

              {/* Items row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {module.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center gap-3 px-5 py-4 rounded-full bg-secondary/80 border border-border/50"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
const testimonials = [
  {
    name: "王女士",
    location: "北京",
    avatar: "狮",
    spiritAnimal: "雄狮",
    spiritColor: "from-amber-500 to-orange-600",
    childAge: "12岁男孩",
    quote:
      "报告准确指出儿子的空间思维天赋，我们调整了学习方向，现在他在建模比赛中屡获大奖。早知道早受益！",
    rating: 5,
  },
  {
    name: "李先生",
    location: "上海",
    avatar: "虎",
    spiritAnimal: "白虎",
    spiritColor: "from-slate-400 to-slate-600",
    childAge: "9岁女孩",
    quote:
      "女儿性格内向，我一直担心。报告显示她有'深度思考者'天赋，现在她在写作和绘画上绽放光彩，自信多了。",
    rating: 5,
  },
  {
    name: "陈女士",
    location: "深圳",
    avatar: "凤",
    spiritAnimal: "凤凰",
    spiritColor: "from-red-500 to-pink-600",
    childAge: "15岁男孩",
    quote:
      "时光推演准确预测了高中选科的关键节点，帮我们提前布局。现在孩子的方向非常清晰，全家都轻松多了。",
    rating: 5,
  },
];

function TestimonialsSection() {
  return (
    <section className="relative py-24 px-4 nebula-bg overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-purple/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-purple/30 bg-cyber-purple/5 mb-6">
            <Quote className="w-4 h-4 text-cyber-purple-light" />
            <span className="text-cyber-purple-light text-sm font-medium">
              用户心声
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">他们已找到</span>
            <span className="text-gradient-gold">天命密码</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            来自全国各地家长的真实反馈，见证孩子的蜕变时刻
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:border-gold/30 hover:scale-[1.02]"
            >
              {/* Spirit Animal Badge */}
              <div className="absolute -top-4 left-8">
                <div
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.spiritColor} text-white text-sm font-medium flex items-center gap-2 shadow-lg`}
                >
                  <span className="text-lg">{testimonial.avatar}</span>
                  <span>{testimonial.spiritAnimal}</span>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-6 mb-6">
                <Quote className="w-8 h-8 text-gold/30 mb-4" />
                <p className="text-foreground leading-relaxed">
                  {'"'}
                  {testimonial.quote}
                  {'"'}
                </p>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              {/* User Info */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">孩子</p>
                    <p className="text-sm text-gold">{testimonial.childAge}</p>
                  </div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden rounded-br-2xl opacity-20">
                <div
                  className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${testimonial.spiritColor} blur-2xl`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER CTA SECTION
// ============================================
function FooterCTASection() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative py-32 px-4 bg-background overflow-hidden">
      {/* Massive background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 bg-gold/5 mb-8 animate-float">
          <MessageCircle className="w-5 h-5 text-gold" />
          <span className="text-gold font-medium">专业咨询</span>
        </div>

        {/* Main headline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
          <span className="text-foreground">开启您孩子的</span>
          <br />
          <span className="text-gradient-gold">天命觉醒之旅</span>
        </h2>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          想要深入了解孩子的天赋潜能？
          <br />
          <span className="text-foreground">
            联系乔门专业老师，获取一对一咨询服务
          </span>
        </p>

        {/* CTA Button - 添加跳转 */}
        <div className="mb-12">
          <button
            onClick={() => setLocation("/quiz")}
            className="group relative px-16 py-8 text-2xl font-bold bg-gradient-to-r from-gold-dark via-gold to-gold-light text-background hover:from-gold hover:via-gold-light hover:to-gold border-0 rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl"
            style={{
              boxShadow:
                "0 0 60px rgba(212, 175, 55, 0.4), 0 0 120px rgba(212, 175, 55, 0.2)",
            }}
          >
            <span className="relative z-10 flex items-center gap-4">
              <Phone className="w-7 h-7" />
              联系乔门老师
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gold" />
            <span>隐私全加密</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold" />
            <span>专业解读</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span>一对一咨询</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 p-6 rounded-2xl border border-gold/20 bg-gold/5 max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-4">
            <div className="w-3 h-3 bg-gold rounded-full animate-pulse" />
            <p className="text-foreground">
              已有 <span className="text-gold font-bold">8,742</span>{" "}
              位家长完成咨询
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 text-center text-sm text-muted-foreground/60">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-gradient-gold font-bold text-lg">
            乔门 JoyGate
          </span>
        </div>
        <p>© 2026 JoyGate. 融合三才古智慧与AI科技的天赋测评系统</p>
        <div className="mt-4 flex justify-center gap-6 text-xs">
          <a href="#" className="hover:text-gold transition-colors">
            隐私政策
          </a>
          <a href="#" className="hover:text-gold transition-colors">
            用户协议
          </a>
          <a href="#" className="hover:text-gold transition-colors">
            联系我们
          </a>
        </div>
      </footer>
    </section>
  );
}

// ============================================
// MAIN HOME COMPONENT
// ============================================
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PainPointsSection />
      <TheorySection />
      <ValueSection />
      <TestimonialsSection />
      <FooterCTASection />
    </main>
  );
}
