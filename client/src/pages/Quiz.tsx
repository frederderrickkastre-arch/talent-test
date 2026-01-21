import { useState } from "react";
import { useLocation } from "wouter";
import { questions, type TalentQuestion } from "@/data/questions";
import { Progress } from "@/components/ui/progress";

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ 
    commander: 0,  // 帅才
    general: 0,    // 将才（注意：数据结构中使用 general，不是 warrior）
    advisor: 0     // 慧才
  });

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleAnswer = (value: "shuai" | "jiang" | "hui" | "none", score: number, optionIndex: number) => {
    // 设置选中状态（视觉反馈）
    setSelectedIndex(optionIndex);
    
    const newScores = { ...scores };
    const currentQuestion = questions[current];
    
    // 根据 value 映射到对应的分数字段
    if (value === "shuai") {
      newScores.commander += score;
    } else if (value === "jiang") {
      newScores.general += score;
    } else if (value === "hui") {
      newScores.advisor += score;
    }
    // value === "none" 的情况不计分
    
    // 保存当前题目的答案
    const selectedOption = currentQuestion.options.find(opt => opt.value === value);
    if (selectedOption) {
      const newAnswers = { ...answers, [currentQuestion.id]: selectedOption.text };
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
      }, 200);
    }
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

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* 背景光晕效果 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-amber-400/3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-gray-400 text-sm mb-3">
            <span className="text-amber-400/70">天赋初筛</span>
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
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 leading-tight">
          {q.question}
        </h2>
        
        {/* 选项卡片 */}
        <div className="space-y-4 mb-8">
          {q.options.map((opt, idx) => {
            const isSelected = selectedIndex === idx;
            const optionLabel = optionLabels[idx] || String(idx + 1);
            
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.value, opt.score, idx)}
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
      </div>
    </div>
  );
}
// v1