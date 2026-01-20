import { useState, useEffect } from "react";
import { assessmentApi } from "@/services/api";
import { ASSESSMENT_QUESTIONS } from "@/data/questions";
import { getConversationHistory } from "@/services/storage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";

type Step = "info" | "questions" | "ai_chat" | "report";

export default function Assessment() {
  const [step, setStep] = useState<Step>("info");
  const [assessmentId, setAssessmentId] = useState<number | null>(null);
  
  // 信息收集
  const [childName, setChildName] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("14");

  // 答题
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [question, setQuestion] = useState(ASSESSMENT_QUESTIONS[0] || null);

  // AI 对话
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);


  // 加载状态
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // 加载当前题目
  useEffect(() => {
    if (step === "questions" && currentQuestion >= 1 && currentQuestion <= 65) {
      const q = ASSESSMENT_QUESTIONS.find(q => q.questionNumber === currentQuestion);
      setQuestion(q || null);
    }
  }, [currentQuestion, step]);

  // 加载对话历史
  useEffect(() => {
    if (step === "ai_chat" && assessmentId) {
      // 从 localStorage 加载历史对话
      const history = getConversationHistory(assessmentId);
      if (history.length > 0) {
        setChatMessages(history.map(msg => ({ role: msg.role, content: msg.content })));
      } else {
        // 初始化欢迎消息
        setChatMessages([
          {
            role: "assistant",
            content: "你好！我是你的天赋测评AI导师。恭喜你完成了65道题目的测评。现在让我们一起深入探讨你的天赋和优势。你想先了解哪个方面呢？",
          },
        ]);
      }
    }
  }, [step, assessmentId]);

  const handleCreateAssessment = async () => {
    if (!childName) return;
    setIsCreating(true);
    try {
      const result = await assessmentApi.create({
        childName,
        gender: gender as "male" | "female",
        age: parseInt(age),
      });
      setAssessmentId(result.assessmentId);
      setStep("questions");
      setCurrentQuestion(1);
    } catch (error) {
      console.error("Failed to create assessment:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSaveAnswer = async () => {
    if (!assessmentId || !selectedOption) return;

    setIsSaving(true);
    try {
      await assessmentApi.saveAnswer({
        assessmentId,
        questionId: currentQuestion,
        selectedOption,
      });

      if (currentQuestion < 65) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // 完成问卷
        await assessmentApi.completeQuestionnaire({ assessmentId });
        setStep("ai_chat");
        setChatMessages([
          {
            role: "assistant",
            content: "你好！我是你的天赋测评AI导师。恭喜你完成了65道题目的测评。现在让我们一起深入探讨你的天赋和优势。你想先了解哪个方面呢？",
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to save answer:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAiChat = async () => {
    if (!assessmentId || !chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsChatLoading(true);

    try {
      console.log("准备调用 AI 对话 API...");
      const response = await assessmentApi.aiChat({
        assessmentId,
        message: userMessage,
      });

      console.log("收到 AI 回复:", response.response);
      setChatMessages((prev) => [...prev, { role: "assistant", content: response.response }]);
    } catch (error) {
      console.error("❌ AI 对话调用失败:", error);
      console.error("错误详情:", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
      });
      
      // 显示详细的错误信息给用户
      const errorMessage = error instanceof Error 
        ? `抱歉，AI 服务暂时不可用：${error.message}。请检查控制台查看详细错误信息。`
        : "抱歉，AI 服务暂时不可用。请检查控制台查看详细错误信息，或稍后重试。";
      
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!assessmentId) return;

    setIsGenerating(true);
    try {
      const result = await assessmentApi.generateReport({ assessmentId });
      // 跳转到新的报告页面
      window.location.href = `/report?id=${assessmentId}`;
    } catch (error) {
      console.error("Failed to generate report:", error);
      setIsGenerating(false);
    }
  };


  // 信息收集步骤
  if (step === "info") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-white/10 border-white/20 backdrop-blur">
          <h2 className="text-2xl font-bold mb-6">开始天赋探索</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="childName" className="text-white">孩子姓名</Label>
              <Input
                id="childName"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="请输入姓名"
                className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <Label className="text-white mb-3 block">性别</Label>
              <RadioGroup value={gender} onValueChange={setGender}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="text-white cursor-pointer">男孩</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="text-white cursor-pointer">女孩</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="age" className="text-white">年龄</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="6"
                max="18"
                className="mt-2 bg-white/10 border-white/20 text-white"
              />
            </div>

            <Button
              onClick={handleCreateAssessment}
              disabled={!childName || isCreating}
              className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  加载中...
                </>
              ) : (
                <>
                  开始测评
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // 答题步骤
  if (step === "questions") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 bg-white/10 border-white/20 backdrop-blur">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">第 {currentQuestion} 题 / 65</h2>
              <div className="w-full bg-white/10 rounded-full h-2 ml-4">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-blue-400 h-2 rounded-full transition-all"
                  style={{ width: `${(currentQuestion / 65) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {!question ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <>
              <p className="text-lg mb-6 text-gray-200">{question.questionText}</p>

              <RadioGroup value={selectedOption || ""} onValueChange={(v) => setSelectedOption(v as "A" | "B")}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition">
                    <RadioGroupItem value="A" id="optionA" />
                    <Label htmlFor="optionA" className="text-white cursor-pointer flex-1">
                      {question.optionA}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition">
                    <RadioGroupItem value="B" id="optionB" />
                    <Label htmlFor="optionB" className="text-white cursor-pointer flex-1">
                      {question.optionB}
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              <div className="flex gap-4 mt-8">
                <Button
                  onClick={() => {
                    setCurrentQuestion(Math.max(1, currentQuestion - 1));
                    setSelectedOption(null);
                  }}
                  disabled={currentQuestion === 1}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  上一题
                </Button>
                <Button
                  onClick={handleSaveAnswer}
                  disabled={!selectedOption || isSaving}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      保存中...
                    </>
                  ) : (
                    <>
                      {currentQuestion === 65 ? "完成测评" : "下一题"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    );
  }

  // AI 对话步骤
  if (step === "ai_chat") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white flex flex-col p-4">
        <div className="max-w-2xl mx-auto w-full flex flex-col h-screen">
          <h2 className="text-2xl font-bold mb-4">AI 导师对话</h2>

          <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-white/5 rounded-lg p-4 border border-white/10">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-emerald-500/30 border border-emerald-500/50"
                      : "bg-blue-500/30 border border-blue-500/50"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAiChat()}
              placeholder="输入你的想法..."
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            <Button
              onClick={handleAiChat}
              disabled={!chatInput.trim() || isChatLoading}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              {isChatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "发送"}
            </Button>
          </div>

          <Button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                生成报告中...
              </>
            ) : (
              "生成我的报告"
            )}
          </Button>
        </div>
      </div>
    );
  }


  return null;
}
