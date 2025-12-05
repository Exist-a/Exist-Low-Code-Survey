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

// 配置1：提交状态饼图（保留原有逻辑，无修改）
const getSubmitStatusOption = (stats: SurveySubmitStats): EChartsOption => {
  const tooltip: TooltipComponentOption = {
    trigger: 'item',
    textStyle: { color: '#333' },
  };

  const legend: LegendComponentOption = {
    orient: 'horizontal',
    bottom: 0,
    textStyle: { color: '#333' },
  };

  const series: PieSeriesOption[] = [
    {
      name: '提交状态',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: stats.submitted, name: '已提交' },
        { value: stats.unSubmitted, name: '未提交' },
      ],
      itemStyle: {
       color: (params): Color => {
          const colors: Color[] = ['#333', '#999'];
          return colors[params.dataIndex] || '#666';
        },
      },
    },
  ];

  return {
    tooltip,
    legend,
    series,
    backgroundColor: 'transparent',
  } as EChartsOption;
};

// 配置2：选择题/满意度题柱状图（核心修正：移除axisLabel.textStyle，直接配置color）
const getQuestionOption = (question: SurveyQuestion): EChartsOption => {
  const xData = question.options.map(item => item.name);
  const yData = question.options.map(item => item.value);

  const tooltip: TooltipComponentOption = {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    textStyle: { color: '#333' },
  };

  // 修正：移除axisLabel.textStyle，直接配置color（解决弃用警告）
  const xAxis = [
    {
      type: 'category',
      data: xData,
      axisLine: { lineStyle: { color: '#333' } },
      axisLabel: { color: '#333' }, // 直接配置颜色，替代textStyle.color
    },
  ];

  const yAxis = [
    {
      type: 'value',
      axisLine: { lineStyle: { color: '#333' } },
      axisLabel: { color: '#333' }, // 直接配置颜色，替代textStyle.color
      splitLine: { lineStyle: { color: '#eee' } },
    },
  ];

  const series: BarSeriesOption[] = [
    {
      name: '选择人数',
      type: 'bar',
      barWidth: '60%',
      data: yData,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#333' },
          { offset: 1, color: '#666' },
        ]),
      },
    },
  ];

  return {
    tooltip,
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
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

  .survey-item {
    background: #fff;
    border: 1px solid $font-color-light;
    border-radius: $radius-lg;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    overflow: hidden;

    .survey-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      cursor: pointer;
      border-bottom: 1px solid $font-color-light;

      .survey-title {
        font-size: 18px;
        color: $font-color-normal;
        font-weight: 600;
        margin: 0;
      }

      .expand-icon {
        font-size: 16px;
        color: $font-color-normal;
        // 移除动画相关的transition
      }
    }

    // 保留一行两个布局，移除所有动画样式
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
        border: 1px solid $font-color-light;
        border-radius: $radius-lg;
        padding: 15px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.08);

        .chart-subtitle {
          font-size: 16px;
          color: $font-color-normal;
          margin: 0 0 10px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid $font-color-light;
        }
      }
    }
  }
}
</style>