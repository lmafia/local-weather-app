<template>
  <i :class="`qi-${searchWeather(weatherZh)}-fill text-${size}xl`"></i>
</template>
<script setup>
defineProps(["weatherZh", "size"]);

const iconWeatherMap = {
  windy: [
    "有风",
    "平静",
    "微风",
    "和风",
    "清风",
    "强风/劲风",
    "疾风",
    "大风",
    "烈风",
    "风暴",
    "狂爆风",
    "飓风",
    "热带风暴",
    "龙卷风",
  ],
  cloudy: ["阴", "少云", "晴间多云", "多云"],
  snow: [
    "雪",
    "阵雪",
    "小雪",
    "中雪",
    "大雪",
    "暴雪",
    "小雪-中雪",
    "中雪-大雪",
    "大雪-暴雪",
    "冷",
  ],
  foggy: [
    "浮尘",
    "扬沙",
    "沙尘暴",
    "强沙尘暴",
    "雾",
    "浓雾",
    "强浓雾",
    "轻雾",
    "大雾",
    "特强浓雾",
  ],
  sunny: ["晴", "热"],
  sleet: ["雨雪天气", "雨夹雪", "阵雨夹雪"],
  rain: [
    "阵雨",

    "雷阵雨并伴有冰雹",
    "小雨",
    "中雨",
    "强阵雨",
    "强雷阵雨",
    "极端降雨",
    "毛毛雨/细雨",
    "雨",
    "小雨-中雨",
    "中雨-大雨",
    "冻雨",
  ],
  storm: [
    "大雨",
    "雷阵雨",
    "大雨-暴雨",
    "暴雨",
    "大暴雨",
    "特大暴雨",
    "暴雨-大暴雨",
    "大暴雨-特大暴雨",
  ],
  haze: ["霾", "中度霾", "重度霾", "严重霾", "未知"],
};

const searchWeather = (chineseWeatherDesc) => {
  const key = Object.keys(iconWeatherMap).find((key) =>
    iconWeatherMap[key].includes(chineseWeatherDesc)
  );
  return key;
};
</script>
