<template>
  <div class="charts-container">
    <!-- 问卷列表 -->
    <div class="survey-item" v-for="(survey, index) in surveyList" :key="index">
      <!-- 问卷标题栏（展开/收起触发器） -->
      <div class="survey-header" @click="toggleExpand(index)">
        <h3 class="survey-title">{{ survey.title }}</h3>
        <span class="expand-icon">{{ expandedIndex === index ? '▼' : '▶' }}</span>
      </div>

      <!-- 展开内容：图表区域（仅v-if控制，无动画） -->
      <div class="survey-charts" v-if="expandedIndex === index">
        <!-- 1. 提交/未提交人数统计（饼图） -->
        <div class="chart-card">
          <h4 class="chart-subtitle">提交状态统计</h4>
          <EchartsBase :option="getSubmitStatusOption(survey.submitStats)" />
        </div>

        <!-- 2. 选择题选项比例（循环渲染每道题） -->
        <div class="chart-card" v-for="(question, qIndex) in survey.questions" :key="qIndex">
          <h4 class="chart-subtitle">{{ `题目${qIndex + 1}：${question.title}` }}</h4>
          <EchartsBase :option="getQuestionOption(question)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as echarts from 'echarts';
import type { 
  EChartsOption, 
  TooltipComponentOption, 
  LegendComponentOption, 
  PieSeriesOption, 
  BarSeriesOption,
  Color
} from 'echarts';

// 定义类型接口
interface SurveySubmitStats {
  submitted: number;
  unSubmitted: number;
}

interface SurveyQuestion {
  title: string;
  type: 'satisfaction' | 'singleChoice';
  options: Array<{ name: string; value: number }>;
}

interface SurveyItem {
  title: string;
  submitStats: SurveySubmitStats;
  questions: SurveyQuestion[];
}

// 模拟问卷数据
const surveyList = ref<SurveyItem[]>([
  {
    title: '2025用户满意度调研问卷',
    submitStats: {
      submitted: 186,
      unSubmitted: 42,
    },
    questions: [
      {
        title: '您对产品整体满意度如何？',
        type: 'satisfaction',
        options: [
          { name: '非常满意', value: 85 },
          { name: '满意', value: 62 },
          { name: '一般', value: 28 },
          { name: '不满意', value: 9 },
          { name: '非常不满意', value: 2 },
        ],
      },
      {
        title: '您主要使用产品的哪个功能？',
        type: 'singleChoice',
        options: [
          { name: '问卷创建', value: 120 },
          { name: '数据统计', value: 95 },
          { name: '模板库', value: 58 },
          { name: '团队协作', value: 35 },
        ],
      },
    ],
  },
  {
    title: '2025功能使用频率调研',
    submitStats: {
      submitted: 128,
      unSubmitted: 18,
    },
    questions: [
      {
        title: '您每周使用产品的次数？',
        type: 'singleChoice',
        options: [
          { name: '1-3次', value: 45 },
          { name: '4-6次', value: 38 },
          { name: '7次以上', value: 45 },
        ],
      },
    ],
  },
]);

// 控制展开/收起
const expandedIndex = ref<number | null>(null);
const toggleExpand = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
};

// 配置1：提交状态饼图（彻底修复hover文字重叠）
const getSubmitStatusOption = (stats: SurveySubmitStats): EChartsOption => {
  // 计算总数和百分比
  const total = stats.submitted + stats.unSubmitted;
  const submittedPercent = ((stats.submitted / total) * 100).toFixed(1);
  const unSubmittedPercent = ((stats.unSubmitted / total) * 100).toFixed(1);

  const tooltip: TooltipComponentOption = {
    trigger: 'item',
    textStyle: { color: '#333', fontSize: 12 },
    formatter: '{b}: {c} 人 ({d}%)',
    // 关闭提示框浮层与文字重叠
    position: ['50%', '50%'],
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: '#eee',
    borderWidth: 1,
    padding: 10,
  };

  const legend: LegendComponentOption = {
    orient: 'horizontal',
    bottom: 10,
    left: 'center',
    textStyle: { color: '#333', fontSize: 12 },
    itemGap: 20,
  };

  const series: PieSeriesOption[] = [
    {
      name: '提交状态',
      type: 'pie',
      radius: ['40%', '70%'], // 扩大内半径，给中心文字留足空间
      center: ['50%', '50%'], // 饼图居中
      avoidLabelOverlap: true,
      // 非hover状态：仅显示中心总计文字，关闭外部标签和标签线
      label: {
        show: true,
        position: 'center', // 固定中心显示
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        lineHeight: 20, // 关键：设置行高，避免换行重叠
        formatter: `总计\n${total} 人`, // 非hover只显示总计
      },
      labelLine: {
        show: false, // 彻底关闭外部标签线
      },
      // hover状态：隐藏总计，只显示当前区块的详细信息
      emphasis: {
        label: {
          show: true,
          position: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333',
          lineHeight: 20, // 换行行高
          formatter: (params) => {
            const { name, value } = params;
            const percent = name === '已提交' ? submittedPercent : unSubmittedPercent;
            return `${name}\n${value} 人\n(${percent}%)`;
          },
        },
        // hover时隐藏其他区块的文字干扰
        focus: 'self',
      },
      data: [
        { value: stats.submitted, name: '已提交' },
        { value: stats.unSubmitted, name: '未提交' },
      ],
      itemStyle: {
        color: (params): Color => {
          const colors: Color[] = ['#409EFF', '#E6A23C'];
          return colors[params.dataIndex] || '#666';
        },
        borderRadius: 8,
        shadowBlur: 5, // 降低阴影强度，避免遮挡文字
        shadowColor: 'rgba(0,0,0,0.05)',
      },
    },
  ];

  return {
    tooltip,
    legend,
    series,
    backgroundColor: 'transparent',
    // 增加内边距，避免文字溢出容器
    grid: {
      top: 20,
      bottom: 40,
      left: 20,
      right: 20,
    },
  } as EChartsOption;
};

// 配置2：选择题/满意度题柱状图（保持不变）
const getQuestionOption = (question: SurveyQuestion): EChartsOption => {
  const xData = question.options.map(item => item.name);
  const yData = question.options.map(item => item.value);

  const tooltip: TooltipComponentOption = {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    textStyle: { color: '#333' },
  };

  const xAxis = [
    {
      type: 'category',
      data: xData,
      axisLine: { lineStyle: { color: '#E5E7EB' } },
      axisLabel: { 
        color: '#333',
        fontSize: 12
      },
      axisTick: { alignWithLabel: true }
    },
  ];

  const yAxis = [
    {
      type: 'value',
      axisLine: { lineStyle: { color: '#E5E7EB' } },
      axisLabel: { 
        color: '#333', 
        fontSize: 12,
        formatter: '{value} 人'
      },
      splitLine: { lineStyle: { color: '#F3F4F6' } },
    },
  ];

  let gradientColors: [string, string];
  let highlightGradientColors: [string, string];
  if (question.type === 'satisfaction') {
    gradientColors = ['#C06C84', '#6C5CE7'];
    highlightGradientColors = ['rgba(192, 108, 132, 0.9)', 'rgba(108, 92, 231, 0.9)'];
  } else {
    gradientColors = ['#3498DB', '#2ECC71'];
    highlightGradientColors = ['rgba(52, 152, 219, 0.9)', 'rgba(46, 204, 113, 0.9)'];
  }

  const series: BarSeriesOption[] = [
    {
      name: '选择人数',
      type: 'bar',
      barWidth: '60%',
      data: yData,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: gradientColors[0] },
          { offset: 1, color: gradientColors[1] },
        ]),
        borderRadius: [4, 4, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: highlightGradientColors[0] },
            { offset: 1, color: highlightGradientColors[1] },
          ]),
        }
      }
    },
  ];

  return {
    tooltip,
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis,
    yAxis,
    series,
    backgroundColor: 'transparent',
  } as EChartsOption;
};
</script>

<style scoped lang="scss">
// 项目全局变量
$font-color-normal: #333;
$font-color-light: #999;
$bg-color: #f5f5f5;
$radius-lg: 8px;
$radius-base: 4px;

.charts-container {
  padding: 20px;
  min-height: 100vh;
  background-color: $bg-color;

  .survey-item {
    background: #fff;
    border: 1px solid #E5E7EB;
    border-radius: $radius-lg;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;
    overflow: hidden;

    .survey-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      cursor: pointer;
      border-bottom: 1px solid #F3F4F6;

      .survey-title {
        font-size: 18px;
        color: $font-color-normal;
        font-weight: 600;
        margin: 0;
      }

      .expand-icon {
        font-size: 16px;
        color: #409EFF;
        transition: transform 0.2s ease;
        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .survey-charts {
      padding: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
      align-items: flex-start;

      .chart-card {
        flex: 0 0 calc(50% - 10px);
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #E5E7EB;
        border-radius: $radius-lg;
        padding: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        min-height: 300px;
        display: flex;
        flex-direction: column;

        .chart-subtitle {
          font-size: 16px;
          color: $font-color-normal;
          margin: 0 0 10px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #F3F4F6;
          flex-shrink: 0;
        }

        // 强制饼图容器高度，确保文字有足够显示空间
        :deep(.echarts-container) {
          flex: 1;
          height: 280px !important; // 调高容器高度，避免文字挤压
        }
      }
    }
  }
}

// 响应式适配
@media (max-width: 768px) {
  .charts-container {
    .survey-item {
      .survey-charts {
        .chart-card {
          flex: 0 0 100%;
        }
      }
    }
  }
}
</style>