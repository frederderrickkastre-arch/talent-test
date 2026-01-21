import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { questions, calculateTalentScores, type TalentQuestion } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface QuizScores {
  commander: number; // 帅才
  general: number;    // 将才
  advisor: number;   // 慧才
}

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>("");

  const currentQuestion: TalentQuestion | undefined = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // 当选择改变时，自动保存答案
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    if (currentQuestion) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: value,
      }));
    }
  };

  // 自动跳转到下一题
  useEffect(() => {
    if (selectedOption && currentQuestion) {
      // 延迟500ms后自动跳转，给用户视觉反馈
      const timer = setTimeout(() => {
        if (isLastQuestion) {
          handleCompleteQuiz();
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedOption("");
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedOption, currentQuestion, isLastQuestion]);

  // 完成答题
  const handleCompleteQuiz = () => {
    // 计算得分
    const scores = calculateTalentScores(answers);
    
    // 保存到 sessionStorage，供聊天界面使用
    sessionStorage.setItem("quizScores", JSON.stringify(scores));
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
    
    // 跳转到聊天界面，传递分数信息
    setLocation(`/chat?commander=${scores.commander}&general=${scores.general}&advisor=${scores.advisor}`);
  };

  // 手动下一题（备用）
  const handleNext = () => {
    if (selectedOption) {
      if (isLastQuestion) {
        handleCompleteQuiz();
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption("");
      }
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">题目加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* 进度条 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              第 {currentQuestionIndex + 1} / {questions.length} 题
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* 题目卡片 */}
        <Card className="p-6 md:p-8">
          <div className="mb-6">
            <div className="text-xs text-muted-foreground mb-2">
              {currentQuestion.dimension}
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              {currentQuestion.question}
            </h2>
          </div>

          {/* 选项 */}
          <RadioGroup
            value={selectedOption}
            onValueChange={handleOptionChange}
            className="space-y-4"
          >
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all ${
                  selectedOption === option.text
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem
                  value={option.text}
                  id={`option-${index}`}
                  className="mt-1"
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer text-base leading-relaxed"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* 手动下一题按钮（备用） */}
          {selectedOption && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleNext} size="lg" className="gap-2">
                {isLastQuestion ? "完成答题" : "下一题"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
