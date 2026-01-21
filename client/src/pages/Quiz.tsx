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

  const handleAnswer = (type: "commander" | "general" | "advisor", score: number) => {
    const newScores = { 
      ...scores, 
      [type]: scores[type] + score 
    };
    
    if (current < questions.length - 1) {
      setScores(newScores);
      setCurrent(current + 1);
    } else {
      // 答题结束，跳转到对话，并带上分数
      // 保存到 sessionStorage
      sessionStorage.setItem("quizScores", JSON.stringify(newScores));
      
      // 跳转到聊天界面，通过 URL 参数传递分数
      setLocation(`/chat?commander=${newScores.commander}&general=${newScores.general}&advisor=${newScores.advisor}`);
    }
  };

  const q: TalentQuestion | undefined = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  if (!q) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-400">题目加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-gray-400 text-sm mb-2">
            <span>天赋初筛</span>
            <span>{current + 1} / {questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* 题目 */}
        <h2 className="text-2xl font-bold mb-8">{q.question}</h2>
        
        {/* 选项 */}
        <div className="space-y-4">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt.type, opt.score)}
              className="w-full p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all text-left border border-gray-700 hover:border-green-500"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
// v1