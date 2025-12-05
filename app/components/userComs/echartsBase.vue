<template>
  <div ref="chartRef" class="echarts-container" :style="{width, height }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

// 接收 props
const props = defineProps({
  // 图表配置项
  option: {
    type: Object as () => EChartsOption,
    required: true,
  },
  // 图表宽度（默认100%）
  width: {
    type: String,
    default: '100%',
  },
  // 图表高度（默认300px）
  height: {
    type: String,
    default: '300px',
  },
  // 是否自适应窗口变化
  autoResize: {
    type: Boolean,
    default: true,
  },
});

// 图表实例
const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: ECharts | null = null;

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;
  // 销毁已有实例
  if (chartInstance) {
    chartInstance.dispose();
  }
  nextTick()
  // 初始化
  chartInstance = echarts.init(chartRef.value);
  // 设置配置项
  chartInstance.setOption(props.option);
};

// 监听配置项变化，更新图表
watch(
  () => props.option,
  () => {
    if (chartInstance) {
      chartInstance.setOption(props.option);
    }
  },
  { deep: true }
);

// 自适应 resize
const resizeHandler = () => {
  console.log(chartInstance)
  if (chartInstance) {
    chartInstance.resize();
  }
};

// 生命周期
onMounted(() => {
  initChart();
  if (props.autoResize) {
    window.addEventListener('resize', resizeHandler);
  }
});

onUnmounted(() => {
  if (props.autoResize) {
    window.removeEventListener('resize', resizeHandler);
  }
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style scoped lang="scss">
.echarts-container {
  box-sizing: border-box;
  // 匹配项目风格：白色背景 + 轻微边框
  background: #fff;
  border-radius: $radius-lg;
  padding: 10px;
}
</style>