// reportSchema.ts
// ==========================================
// 核心报告数据结构 (1.5万字报告的骨架)
// ==========================================

export interface AssessmentReport {
  id: string;
  meta: {
    userName: string;
    age: number;
    gender: string;
    reportDate: string;
    totalWords: number; // 约 14,420 字
  };

  // ------------------------------------------
  // 模块 1: 概览 (Overview)
  // ------------------------------------------
  overview: {
    persona: {
      title: string; // e.g. "奇幻创意家"
      quote: string; // e.g. "一个能用兔子耳朵把粉笔灰的神奇创意家"
      summary: string; // 200字综述
    };
    radar: {
      category: string; // e.g. "系统思维"
      score: number; // 0-100
      level: 'S' | 'A' | 'B';
    }[];
    metaphor: {
      object: string; // e.g. "自动贩卖机"
      description: string; // 为什么像它？
    };
    keyTraits: {
      // 核心特质 (优势/潜力/关注)
      name: string;
      type: 'strength' | 'potential' | 'concern';
      desc: string;
    }[];
  };

  // ------------------------------------------
  // 模块 2: 深度解读 (Interpretation)
  // ------------------------------------------
  interpretation: {
    bigFive: {
      name: string; // e.g. "开放性"
      score: number;
      description: string;
      // 【关键】AI必须回溯用户聊天记录，引用原话作为证据
      evidence: string; // e.g. "你说'用兔子耳朵当粉笔'，体现了..."
    }[];
    riasec: {
      // 霍兰德兴趣
      code: string; // e.g. "RAI"
      analysis: string;
    };
    learningStyle: {
      // 学习风格
      type: string; // e.g. "情境依赖型"
      suggestions: string;
    };
  };

  // ------------------------------------------
  // 模块 3: 行为建议 (Action)
  // ------------------------------------------
  actions: {
    cards: {
      title: string; // e.g. "家庭气象大会"
      type: 'Game' | 'Project' | 'Habit';
      timeRequired: string; // e.g. "30分钟/周"
      // 【关键】增加权威感的科学背书
      sciencePrinciple: string; // e.g. "利用多巴胺回路..."
      whyItFits: string; // 为什么适合这个孩子
      steps: string[]; // 执行步骤 1,2,3
      expectedOutcome: string; // 预期效果
    }[];
  };

  // ------------------------------------------
  // 模块 4: 发展规划 (Roadmap)
  // ------------------------------------------
  roadmap: {
    weeklyPlan: {
      week: number;
      theme: string; // e.g. "唤醒周"
      tasks: string[]; // 本周重点任务
    }[];
    dailyRoutine: {
      // 每日 SOP
      period: 'Morning' | 'Afternoon' | 'Evening';
      activity: string; // e.g. "魔法生物叫早"
      duration: string;
    }[];
  };

  // ------------------------------------------
  // 模块 5: 家长指南 (Parent Guide)
  // ------------------------------------------
  parentGuide: {
    communication: {
      // 话术红黑榜
      dontSay: string; // e.g. "别整天想没用的"
      harm: string; // 为什么不能说
      doSay: string; // e.g. "你的角度真特别"
    }[];
    dailyChecklist: string[]; // 家长每天要做的3件事
  };

  // ------------------------------------------
  // 模块 6: 附录资源 (Appendix)
  // ------------------------------------------
  appendix: {
    books: {
      title: string;
      reason: string;
    }[];
    movies: {
      title: string;
      reason: string;
    }[];
    games: {
      title: string;
      reason: string;
    }[];
  };
}
