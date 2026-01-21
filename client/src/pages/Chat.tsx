import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { AIChatBox } from "@/components/AIChatBox";
import { callAIChat } from "@/services/api";
import type { Message } from "@/components/AIChatBox";

export default function Chat() {
  const [location] = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState<{
    commander: number;
    general: number;
    advisor: number;
  } | null>(null);

  // 从 URL 参数或 sessionStorage 获取分数
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split("?")[1] || "");
    const commander = parseInt(urlParams.get("commander") || "0");
    const general = parseInt(urlParams.get("general") || "0");
    const advisor = parseInt(urlParams.get("advisor") || "0");

    // 如果 URL 有参数，使用 URL 参数
    if (commander > 0 || general > 0 || advisor > 0) {
      setScores({ commander, general, advisor });
    } else {
      // 否则从 sessionStorage 获取
      const storedScores = sessionStorage.getItem("quizScores");
      if (storedScores) {
        try {
          setScores(JSON.parse(storedScores));
        } catch (e) {
          console.error("Failed to parse quiz scores:", e);
        }
      }
    }
  }, [location]);

  // 初始化：生成 AI 第一句话
  useEffect(() => {
    if (scores && messages.length === 0) {
      // 确定最高分项
      const maxScore = Math.max(scores.commander, scores.general, scores.advisor);
      let highestType = "";
      if (maxScore === scores.commander) {
        highestType = "帅才（统帅）";
      } else if (maxScore === scores.general) {
        highestType = "将才（先锋）";
      } else {
        highestType = "慧才（军师）";
      }

      // AI 的第一句话（自动生成）
      const firstMessage = `根据初步推演，你的天赋能量似乎主要集中在${highestType}... 但我想再通过几个问题确认一下。`;

      // 设置初始消息（只显示 AI 的第一句话，系统提示不显示）
      setMessages([
        {
          role: "assistant",
          content: firstMessage,
        },
      ]);
    }
  }, [scores, messages.length]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // 添加用户消息
    const userMessage: Message = { role: "user", content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // 构建对话历史（只包含 user 和 assistant 消息）
      const chatHistory = messages
        .filter((msg) => msg.role !== "system")
        .map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }));

      // 如果有分数，在第一条用户消息前添加系统提示（隐形指令）
      // 系统提示会作为第一条消息发送给 AI，但不显示给用户
      let messageToSend = content;
      if (scores && chatHistory.length === 0) {
        // 第一次对话，添加系统提示
        messageToSend = `[系统提示：用户初测分数为 帅:${scores.commander}, 将:${scores.general}, 慧:${scores.advisor}。请开始对话验证。]\n\n${content}`;
      }

      const response = await callAIChat(messageToSend, chatHistory);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "抱歉，AI 服务暂时不可用，请稍后重试。",
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">三才天赋对话验证</h1>
          {scores && (
            <p className="text-sm text-muted-foreground">
              初测分数：帅才 {scores.commander} 分 | 将才 {scores.general} 分 | 慧才 {scores.advisor} 分
            </p>
          )}
        </div>
        <AIChatBox
          messages={messages.filter((msg) => msg.role !== "system")}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          placeholder="输入你的回答..."
          emptyStateMessage="开始与 AI 对话，验证你的天赋类型"
        />
      </div>
    </div>
  );
}
