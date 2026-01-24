import { useState } from "react";
import { useLocation } from "wouter";
import { questions, type TalentQuestion, type TalentType } from "@/data/questions";
import { Progress } from "@/components/ui/progress";

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ 
    commander: 0,  // 帅才 (S)
    general: 0,    // 将才 (J)
    advisor: 0     // 慧才 (H)
  });

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleAnswer = (type: TalentType, score: number, optionIndex: number, optionText: string) => {
    // 设置选中状态（视觉反馈）
    setSelectedIndex(optionIndex);
    
    const newScores = { ...scores };
    const currentQuestion = questions[current];
    
    // 根据 type 映射到对应的分数字段
    if (type === "S") {
      newScores.commander += score;
    } else if (type === "J") {
      newScores.general += score;
    } else if (type === "H") {
      newScores.advisor += score;
    }
    
    // 保存当前题目的答案
    const newAnswers = { ...answers, [currentQuestion.id]: optionText };
    setAnswers(newAnswers);
    
    // 延迟跳转，让用户看到选中效果
    setTimeout(() => {
      if (current < questions.length - 1) {
        setScores(newScores);
        setCurrent(current + 1);
        setSelectedIndex(null); // 重置选中状态
      } else {
        // 答题结束，保存完整答案和分数
        sessionStorage.setItem("quizScores", JSON.stringify(newScores));
        sessionStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
        
        // 跳转到聊天界面，通过 URL 参数传递分数
        setLocation(`/chat?commander=${newScores.commander}&general=${newScores.general}&advisor=${newScores.advisor}`);
      }
    }, 300);
  };

  const q: TalentQuestion | undefined = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  if (!q) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-400">题目加载中...</p>
        </div>
      </div>
    );
  }

  // 选项标签（A/B/C/D）
  const optionLabels = ["A", "B", "C", "D"];

  // 获取阶段名称
  const phaseNames = {
    1: "意象直觉",
    2: "情境探索",
    3: "天命领取"
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* 背景光晕效果 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-amber-400/3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* 阶段指示器 */}
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3].map((phase) => (
            <div 
              key={phase}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                q.phase === phase
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                  : q.phase > phase
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : "bg-slate-800/50 text-gray-500 border border-slate-700"
              }`}
            >
              阶段{phase}：{phaseNames[phase as 1 | 2 | 3]}
            </div>
          ))}
        </div>

        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-gray-400 text-sm mb-3">
            <span className="text-amber-400/70">天赋探险</span>
            <span className="text-amber-300 font-semibold">{current + 1} / {questions.length}</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 题目 - 金色渐变标题 */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 leading-tight text-center">
          {q.question}
        </h2>

        {/* 阶段一：图片选项卡片 */}
        {q.phase === 1 ? (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {q.options.map((opt, idx) => {
              const isSelected = selectedIndex === idx;
              const optionLabel = optionLabels[idx] || String(idx + 1);
              const hasImage = opt.imageUrl && opt.imageUrl.length > 0;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.type, opt.score, idx, opt.text)}
                  className={`relative rounded-xl transition-all duration-300 overflow-hidden group aspect-[3/4]
                    ${isSelected 
                      ? "ring-4 ring-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)] scale-105" 
                      : "ring-1 ring-white/10 hover:ring-amber-500/50 hover:scale-102"
                    }
                  `}
                >
                  {/* 图片区域（如果选项有图片URL则显示图片，否则显示渐变背景） */}
                  <div className={`absolute inset-0 ${
                    hasImage 
                      ? "bg-slate-800" 
                      : "bg-gradient-to-br from-slate-800 to-slate-900"
                  }`}>
                    {hasImage && (
                      <img 
                        src={opt.imageUrl} 
                        alt={opt.text}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          // 图片加载失败时隐藏图片
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    {/* 如果没有图片，显示一个占位符图标 */}
                    {!hasImage && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold
                          ${opt.type === "S" ? "bg-amber-500/20 text-amber-400" : ""}
                          ${opt.type === "J" ? "bg-emerald-500/20 text-emerald-400" : ""}
                          ${opt.type === "H" ? "bg-purple-500/20 text-purple-400" : ""}
                        `}>
                          {optionLabel}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* 底部文字遮罩 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                    <div className={`text-center font-medium text-sm leading-snug
                      ${isSelected ? "text-amber-300" : "text-gray-200 group-hover:text-amber-200"}
                    `}>
                      {opt.text}
                    </div>
                  </div>
                  
                  {/* 选中标记 */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          /* 阶段二/三：文字选项卡片 */
          <div className="space-y-4 mb-8">
            {q.options.map((opt, idx) => {
              const isSelected = selectedIndex === idx;
              const optionLabel = optionLabels[idx] || String(idx + 1);
              
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.type, opt.score, idx, opt.text)}
                  className={`w-full p-5 rounded-xl transition-all duration-300 text-left relative overflow-hidden group
                    ${isSelected 
                      ? "border-amber-400 bg-amber-500/10 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]" 
                      : "bg-slate-900/50 border-white/10 text-gray-200 hover:border-amber-500/50 hover:bg-slate-800/50"
                    }
                    border backdrop-blur-sm
                  `}
                >
                  {/* 选项序号/图标 */}
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all
                      ${isSelected 
                        ? "bg-amber-400 text-black" 
                        : "bg-white/5 text-gray-400 group-hover:bg-amber-500/20 group-hover:text-amber-300"
                      }
                    `}>
                      {optionLabel}
                    </div>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </div>
                  
                  {/* 选中时的金色光晕效果 */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 animate-pulse pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 维度提示（调试用，生产环境可隐藏） */}
        <div className="text-center text-xs text-gray-500 mt-4">
          维度：{q.dimension}
        </div>
      </div>
    </div>
  );
}
