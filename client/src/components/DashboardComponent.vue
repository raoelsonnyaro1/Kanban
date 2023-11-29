<template>
    <v-container class="grey lighten-5">
        <div class="d-flex">
            <div class="col-6">
            <v-card
        class="mt-4 mx-auto"
    
      >
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="#137C8B"
          elevation="12"
          max-width="calc(100% - 32px)"
        >
          <v-sparkline
            :labels="labels"
            :value="value"
            color="white"
            line-width="2"
            padding="16"
          ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="text-h6 font-weight-light mb-2">
            User Registrations
          </div>
          <div class="subheading font-weight-light grey--text">
            Last Campaign Performance
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon
            class="mr-2"
            small
          >
            mdi-clock
          </v-icon>
          <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
        </v-card-text>
      </v-card>
    
        </div>
        <div class="col-6">
            <v-card
        class="mt-4 mx-auto"
    
      >
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="#137C8B"
          elevation="12"
          max-width="calc(100% - 32px)"
        >
          <v-sparkline
            :labels="labels"
            :value="value"
            color="white"
            line-width="2"
            padding="16"
          ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="text-h6 font-weight-light mb-2">
            User Registrations
          </div>
          <div class="subheading font-weight-light grey--text">
            Last Campaign Performance
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon
            class="mr-2"
            small
          >
            mdi-clock
          </v-icon>
          <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
        </v-card-text>
      </v-card>
    
        </div>
        
    </div>
    <div class="d-flex">
            <div class="col-4">
    <Doughnut :data="chartData" />
  </div>
</div>
    </v-container>
   
    
   
</template>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)
  export default {
    components: { Doughnut },
    data: () => ({
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
      chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            backgroundColor: ['#137C8B', '#709CA7', '#B8CBD0'], //Palette de couleur : #137C8B, #709CA7, #B8CBD0 , #7A90A4,#344D59
            data: [40, 20, 12]
          }
        ]
      }
    }),
  }
</script>