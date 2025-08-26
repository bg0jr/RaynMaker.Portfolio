<script setup>
  import { computed } from 'vue'
  import { Pie } from 'vue-chartjs'
  import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
  import * as pl from '../../../../packages/GooglePaletteJs/palette.js'

  Chart.register(ArcElement, Tooltip, Legend)

  const props = defineProps({
    data: Array,
    labels: Array,
    width: Number,
    height: Number
  })

  const safeData = computed(() => (Array.isArray(props.data) ? props.data : []))

  const backgrounds = computed(() => {
    if (safeData.value.length > 0) {
      return pl.palette('tol', Math.min(safeData.value.length, 12)).map((hex) => '#' + hex)
    }
    return []
  })

  const pieData = computed(() => ({
    labels: props.labels,
    datasets: [
      {
        data: safeData.value,
        backgroundColor: backgrounds.value
      }
    ]
  }))

  const pieOptions = {
    responsive: false,
    maintainAspectRatio: false
  }
</script>

<template>
  <Pie :data="pieData" :options="pieOptions" :width="width" :height="height" />
</template>
