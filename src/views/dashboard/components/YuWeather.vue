<template>
  <div class="card weather">
    <div class="city-selected l-salmon">
      <el-row :gutter="0" class="table-list">
        <el-col :span="14">
          <div class="info">
            <div class="city">
              <span>City:</span>
              Shang Hai
            </div>
            <div class="night">Day - 14:05 PM</div>
            <div class="temperature">34°</div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="icon">
            <Drizzling class="panel-icon" />
          </div>
        </el-col>
      </el-row>
    </div>

    <table class="table table-striped">
      <tbody>
        <tr>
          <td>Wind</td>
          <td class="font-medium">ESE 16 mph</td>
        </tr>
        <tr>
          <td>Humidity</td>
          <td class="font-medium">66%</td>
        </tr>
        <tr>
          <td>Pressure</td>
          <td class="font-medium">28.18 in</td>
        </tr>
        <tr>
          <td>Cloud Cover</td>
          <td class="font-medium">65%</td>
        </tr>
        <tr>
          <td>Ceiling</td>
          <td class="font-medium">25380 ft</td>
        </tr>
      </tbody>
    </table>

    <div class="week-weather">
      <ul class="days-list">
        <li v-for="day in weekDays" :key="day.name" class="day">
          <p>{{ day.name }}</p>
          <component :is="day.icon" class="panel-icon" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { Cloudy, Drizzling, Sunny, WindPower } from '@element-plus/icons-vue'

const weekDays = [
  { name : '周一', icon : Cloudy },
  { name : '周二', icon : Cloudy },
  { name : '周三', icon : Sunny },
  { name : '周四', icon : WindPower },
  { name : '周五', icon : Cloudy },
  { name : '周六', icon : Drizzling },
  { name : '周日', icon : Sunny }
]

defineOptions( {
  name : 'YuWeather'
} )
</script>

<style lang="scss">
.card {
  background: var(--app-panel-bg);
  transition: 0.5s;
  border: 0;
  border-radius: 0.1875rem;
  position: relative;
  width: 100%;
  box-shadow: 0 -3px 31px 0 rgb(0 0 0 / 5%), 0 6px 20px 0 rgb(0 0 0 / 2%);
}
.weather {
}
.city-selected {
  font-size: 14px;
  padding: 20px;
  font-weight: 400;
  background: linear-gradient(45deg, #746bbe, #9d9ec5) !important;
  position: relative;
  overflow: hidden;
  color: #fff;
  border-radius: 3px 3px 0 0;
  box-sizing: content-box;
  height: 145px;
  .city {
    height: 36px;
    font-size: 24px;
    span {
      font-size: 13px;
      font-weight: bold;
      text-transform: lowercase;
    }
  }
  .night {
    height: 22px;
    line-height: 22px;
    font-size: 15px;
    text-transform: uppercase;
  }
  .temperature {
    font-size: 70px;
    height: 87px;
    line-height: 87px;
    position: relative;
    font-weight: bold;
  }
  .icon {
    height: 145px;
    position: relative;
    .panel-icon {
      position: absolute;
      left: 0;
      bottom: 10px;
      color: #fff;
      width: 70px;
      height: 70px;
    }
  }
}

.table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  td,
  th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  tbody tr td {
    padding: 14px 20px;
  }
}
.table-striped {
  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.week-weather {
  padding: 10px 0 18px;

  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .days-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .day {
    width: 14.28%;
    min-width: 62px;
    box-sizing: border-box;
    padding: 12px 2px;
    text-align: center;

    p {
      padding: 0;
      margin: 0 0 8px;
      font-size: 13px;
      line-height: 20px;
      height: 20px;
      white-space: nowrap;
    }

    .panel-icon {
      width: 32px;
      height: 32px;
      color: #343434;
    }
  }
}

.carousel {
}
.slide {
}
</style>
