/**
 * 三才天赋测评题库
 * 包含 27 道单选题
 */

export interface QuestionOption {
  text: string;
  value: "shuai" | "jiang" | "hui" | "none"; // 帅才、将才、慧才、不计分
  score: number;
}

export interface TalentQuestion {
  id: number;
  question: string;
  options: QuestionOption[];
  dimension: string; // 题目维度说明
}

export const questions: TalentQuestion[] = [
  {
    id: 1,
    question: "班级要排演一出舞台剧，如果让你自己挑，你最想演谁？",
    options: [
      { text: "国王/总导演", value: "shuai", score: 5 },
      { text: "大将军/侠客", value: "jiang", score: 5 },
      { text: "神秘巫师/军师", value: "hui", score: 5 },
      { text: "没什么特别想演的，或者只想做个安静的观众/路人甲。", value: "none", score: 0 }
    ],
    dimension: "角色偏好"
  },
  
  {
    id: 2,
    question: "有人在背后说了你的坏话，传到你耳朵里，你的第一反应是？",
    options: [
      { text: "愤怒：想当众质问他。", value: "shuai", score: 5 },
      { text: "伤心：觉得被背叛了。", value: "jiang", score: 5 },
      { text: "盘算：暗中想办法反击。", value: "hui", score: 5 },
      { text: "没啥反应，也不想理会，觉得无所谓。", value: "none", score: 0 }
    ],
    dimension: "情绪反应"
  },
  
  {
    id: 3,
    question: "如果给你一盏神灯，只能许一个愿望，你会选？",
    options: [
      { text: "万人敬仰", value: "shuai", score: 5 },
      { text: "无敌力量", value: "jiang", score: 5 },
      { text: "超级财富", value: "hui", score: 5 },
      { text: "想不出来要什么，或者觉得这些都没意思。", value: "none", score: 0 }
    ],
    dimension: "价值追求"
  },
  
  {
    id: 4,
    question: "你最害怕发生的噩梦是哪一种？",
    options: [
      { text: "当众出丑", value: "shuai", score: 5 },
      { text: "被抛弃", value: "jiang", score: 5 },
      { text: "被困住/变穷", value: "hui", score: 5 },
      { text: "很少做噩梦，或者梦醒了就忘了，说不清楚。", value: "none", score: 0 }
    ],
    dimension: "恐惧类型"
  },
  
  {
    id: 5,
    question: "玩团队游戏（如王者/吃鸡），你最讨厌什么样的队友？",
    options: [
      { text: "不听话的", value: "shuai", score: 5 },
      { text: "卖队友的", value: "jiang", score: 5 },
      { text: "太笨的", value: "hui", score: 5 },
      { text: "都还好，或者我不怎么玩这种游戏/不介意输赢。", value: "none", score: 0 }
    ],
    dimension: "团队协作"
  },
  
  {
    id: 6,
    question: "拿到一笔巨额压岁钱，你第一反应想怎么花？",
    options: [
      { text: "买最酷的", value: "shuai", score: 5 },
      { text: "大家一起花", value: "jiang", score: 5 },
      { text: "存起来/捡漏", value: "hui", score: 5 },
      { text: "交给爸妈处理，或者没有什么特别想买的。", value: "none", score: 0 }
    ],
    dimension: "消费观念"
  },
  
  {
    id: 7,
    question: "遇到一道超级难的数学题，想了半天没做出来，你会？",
    options: [
      { text: "放弃/硬撑", value: "shuai", score: 5 },
      { text: "求救", value: "jiang", score: 5 },
      { text: "钻空子", value: "hui", score: 5 },
      { text: "先放着发会儿呆，或者等着老师讲。", value: "none", score: 0 }
    ],
    dimension: "问题解决"
  },
  
  {
    id: 8,
    question: "如果你有超能力，你觉得哪个最酷？",
    options: [
      { text: "言出法随", value: "shuai", score: 5 },
      { text: "金刚不坏", value: "jiang", score: 5 },
      { text: "读心术", value: "hui", score: 5 },
      { text: "都不太感兴趣，或者想要个没啥用的能力（如发呆）。", value: "none", score: 0 }
    ],
    dimension: "能力偏好"
  },
  
  {
    id: 9,
    question: "不小心打碎了家里的花瓶，你第一反应是？",
    options: [
      { text: "掩饰", value: "shuai", score: 5 },
      { text: "慌张", value: "jiang", score: 5 },
      { text: "找理由", value: "hui", score: 5 },
      { text: "愣在那儿，脑子一片空白，不知道该干嘛。", value: "none", score: 0 }
    ],
    dimension: "应对方式"
  },
  
  {
    id: 10,
    question: "你觉得下面哪个动物最像你？",
    options: [
      { text: "狮子", value: "shuai", score: 5 },
      { text: "狗狗/狼", value: "jiang", score: 5 },
      { text: "狐狸/猫头鹰", value: "hui", score: 5 },
      { text: "树懒/考拉，或者不知道像什么。", value: "none", score: 0 }
    ],
    dimension: "自我认知"
  },
  
  {
    id: 11,
    question: "如果努力了很久，还是没考好，你会？",
    options: [
      { text: "觉得丢人，不想去学校。", value: "shuai", score: 5 },
      { text: "找理由，推卸责任。", value: "hui", score: 5 },
      { text: "大哭一场，自暴自弃。", value: "jiang", score: 5 },
      { text: "说不上来，可能没什么特别强烈的感觉，或者以上都不是。", value: "none", score: 0 }
    ],
    dimension: "抗挫力"
  },
  
  {
    id: 12,
    question: "周末早上，原本计划写作业，但手机就在手边，你会？",
    options: [
      { text: "先玩一会儿，玩够了再写。", value: "shuai", score: 5 },
      { text: "边玩边写。", value: "hui", score: 5 },
      { text: "只有爸妈盯着的时候才写。", value: "jiang", score: 5 },
      { text: "以上情况都没有，或者我不确定我会怎么做。", value: "none", score: 0 }
    ],
    dimension: "自控力"
  },
  
  {
    id: 13,
    question: "鞋带开了或者书包太重，你通常会？",
    options: [
      { text: "伸出脚让爸妈帮我弄。", value: "shuai", score: 5 },
      { text: "自己弄，弄不好发脾气。", value: "jiang", score: 5 },
      { text: "懒得弄，拖着走。", value: "hui", score: 5 },
      { text: "可能会等别人提醒，或者看情况吧，都不是。", value: "none", score: 0 }
    ],
    dimension: "主角力"
  },
  
  {
    id: 14,
    question: "看到同学穿了一双你很想要的新鞋，你心里想？",
    options: [
      { text: "\"哼，肯定是假的。\"", value: "hui", score: 5 },
      { text: "\"我也要买！\"", value: "jiang", score: 5 },
      { text: "\"他就是显摆。\"", value: "shuai", score: 5 },
      { text: "没啥想法，或者没注意到，以上都不是。", value: "none", score: 0 }
    ],
    dimension: "幸福力"
  },
  
  {
    id: 15,
    question: "到了一个全是陌生人的新补习班，你会？",
    options: [
      { text: "谁也不理，装高冷。", value: "shuai", score: 5 },
      { text: "浑身不自在，想回家。", value: "jiang", score: 5 },
      { text: "只理看起来好说话的。", value: "hui", score: 5 },
      { text: "就在那坐着，不主动也不拒绝，以上都不是。", value: "none", score: 0 }
    ],
    dimension: "亲和力"
  },
  
  {
    id: 16,
    question: "妈妈唠叨你\"快点去洗澡\"，你正在看电视，你会？",
    options: [
      { text: "大喊：\"烦死了！\"", value: "shuai", score: 5 },
      { text: "假装没听见。", value: "hui", score: 5 },
      { text: "\"马上\"，但不动。", value: "jiang", score: 5 },
      { text: "以上都不是，或者不记得自己会怎么做。", value: "none", score: 0 }
    ],
    dimension: "沟通力"
  },
  
  {
    id: 17,
    question: "这周的作业很多，只有两天时间，你会？",
    options: [
      { text: "拖到最后哭着补。", value: "jiang", score: 5 },
      { text: "只做简单的。", value: "hui", score: 5 },
      { text: "写写玩玩。", value: "shuai", score: 5 },
      { text: "没有固定的做法，到时候再说，以上都不是。", value: "none", score: 0 }
    ],
    dimension: "效能力"
  },
  
  {
    id: 18,
    question: "上课的时候，窗外突然有鸟叫，你会？",
    options: [
      { text: "马上转头看。", value: "shuai", score: 5 },
      { text: "脑子里想游戏。", value: "hui", score: 5 },
      { text: "找人说话。", value: "jiang", score: 5 },
      { text: "以上都不是，或者没注意过自己会咋样。", value: "none", score: 0 }
    ],
    dimension: "专注力"
  },
  
  {
    id: 19,
    question: "老师讲了一个新知识点，你没听懂，你会？",
    options: [
      { text: "不敢问，装懂。", value: "shuai", score: 5 },
      { text: "放弃听讲。", value: "jiang", score: 5 },
      { text: "想着回家抄。", value: "hui", score: 5 },
      { text: "就那样听着，懂不懂无所谓，以上都不是。", value: "none", score: 0 }
    ],
    dimension: "学习力"
  },
  
  {
    id: 20,
    question: "如果你有100块钱，你想怎么用？",
    options: [
      { text: "全买零食花光。", value: "jiang", score: 5 },
      { text: "藏起来不舍得花。", value: "hui", score: 5 },
      { text: "请客充面子。", value: "shuai", score: 5 },
      { text: "交给家长，或者没想过怎么花，以上都不是。", value: "none", score: 0 }
    ],
    dimension: "创造力"
  },
  
  {
    id: 21,
    question: "你需要老师帮忙写推荐信，你会？",
    options: [
      { text: "不好意思去。", value: "jiang", score: 5 },
      { text: "觉得老师该主动找我。", value: "shuai", score: 5 },
      { text: "想送礼换名额。", value: "hui", score: 5 },
      { text: "就不去了，或者不知道该怎么办，以上都不是。", value: "none", score: 0 }
    ],
    dimension: "贵人力"
  },
  
  {
    id: 22,
    question: "小组活动，大家意见不统一，你会？",
    options: [
      { text: "拍桌子强迫大家。", value: "shuai", score: 5 },
      { text: "赌气不玩了。", value: "jiang", score: 5 },
      { text: "跟着起哄。", value: "hui", score: 5 },
      { text: "在旁边看着，不说话也不参与意见，以上都不是。", value: "none", score: 0 }
    ],
    dimension: "领导力"
  },
  
  {
    id: 23,
    question: "如果你想当班长，但是大家好像不太支持你，你会怎么做？",
    options: [
      { text: "立规矩。", value: "shuai", score: 5 },
      { text: "拉关系。", value: "jiang", score: 5 },
      { text: "用策略。", value: "hui", score: 5 },
      { text: "那就不当了，或者等着看有没有人选我。", value: "none", score: 0 }
    ],
    dimension: "领导方式"
  },
  
  {
    id: 24,
    question: "假如你独自一人遇到了大麻烦（比如迷路），你会先？",
    options: [
      { text: "镇定，找警察。", value: "shuai", score: 5 },
      { text: "跑着找。", value: "jiang", score: 5 },
      { text: "查地图/找替代。", value: "hui", score: 5 },
      { text: "站在原地等，或者不知道该干嘛。", value: "none", score: 0 }
    ],
    dimension: "应急能力"
  },
  
  {
    id: 25,
    question: "如果你赢了比赛，国王要给你奖励，你最想要？",
    options: [
      { text: "荣誉金牌。", value: "shuai", score: 5 },
      { text: "无敌军队。", value: "jiang", score: 5 },
      { text: "隐秘宝石。", value: "hui", score: 5 },
      { text: "随便给点什么都行，或者不想要奖励。", value: "none", score: 0 }
    ],
    dimension: "奖励偏好"
  },
  
  {
    id: 26,
    question: "遇到一个特别不讲理的人在骂人，你会怎么对付他？",
    options: [
      { text: "气场压制。", value: "shuai", score: 5 },
      { text: "骂回去。", value: "jiang", score: 5 },
      { text: "设套录音。", value: "hui", score: 5 },
      { text: "走开，或者忍着不说话。", value: "none", score: 0 }
    ],
    dimension: "冲突处理"
  },
  
  {
    id: 27,
    question: "你觉得真正的英雄，应该是样子的？",
    options: [
      { text: "威严如山。", value: "shuai", score: 5 },
      { text: "热血冲锋。", value: "jiang", score: 5 },
      { text: "聪明绝顶。", value: "hui", score: 5 },
      { text: "平平淡淡，或者没想过什么是英雄。", value: "none", score: 0 }
    ],
    dimension: "英雄观"
  }
];

/**
 * 根据答案计算三才天赋得分
 */
export function calculateTalentScores(answers: Record<number, string>): {
  commander: number; // 帅才（天）- 对应 shuai
  general: number;   // 将才（地）- 对应 jiang
  advisor: number;   // 慧才（人）- 对应 hui
} {
  const scores = {
    commander: 0,
    general: 0,
    advisor: 0
  };
  
  Object.entries(answers).forEach(([questionId, selectedText]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (question) {
      const option = question.options.find(opt => opt.text === selectedText);
      if (option && option.value !== "none") {
        // 将 value 映射到对应的分数字段
        if (option.value === "shuai") {
          scores.commander += option.score;
        } else if (option.value === "jiang") {
          scores.general += option.score;
        } else if (option.value === "hui") {
          scores.advisor += option.score;
        }
        // value === "none" 的情况不计分，直接跳过
      }
    }
  });
  
  return scores;
}

/**
 * 根据得分判定天赋类型
 */
export function determineTalentType(scores: {
  commander: number;
  general: number;
  advisor: number;
}): "将才" | "帅才" | "慧才" {
  const maxScore = Math.max(scores.commander, scores.general, scores.advisor);
  
  if (maxScore === scores.commander) {
    return "帅才";
  } else if (maxScore === scores.general) {
    return "将才";
  } else {
    return "慧才";
  }
}

// 兼容性导出：为了兼容 api.ts 对 ASSESSMENT_QUESTIONS 的引用需求
export const ASSESSMENT_QUESTIONS = questions;