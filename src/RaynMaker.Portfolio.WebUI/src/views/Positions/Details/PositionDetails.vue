<template>
  <div>
    <CCard>
      <CCardHeader>
        <CCardTitle>{{ name }}</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <table>
          <tbody>
            <tr>
              <th>Isin:</th>
              <td>{{ isin }}</td>
            </tr>
            <tr>
              <th>Shares</th>
              <td>{{ data.shares }}</td>
            </tr>
            <tr>
              <th style="padding-right: 20px">Buying Price / Buying Value</th>
              <td>{{ data.buyingPrice }} {{ currency }} / {{ data.buyingValue }} {{ currency }}</td>
            </tr>
            <tr>
              <th>Price / Value</th>
              <td>{{ data.currentPrice }} {{ currency }} / {{ data.currentValue }} {{ currency }}</td>
            </tr>
            <tr>
              <th>Profit</th>
              <td>{{ data.totalProfit }} {{ currency }} ({{ data.totalRoi }} %)</td>
            </tr>
            <tr>
              <th>Dividends</th>
              <td>{{ data.totalDividends }} {{ currency }} ({{ data.dividendsRoi }} %)</td>
            </tr>
          </tbody>
        </table>
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>
        <CCardTitle>Transactions</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <table class="table table-bordered table-sm table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Shares</th>
              <th>Price</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data.transactions" :key="item.id">
              <td>{{ item.date }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.shares }}</td>
              <td>{{ item.price }} {{ currency }}</td>
              <td>{{ item.value }} {{ currency }}</td>
            </tr>
          </tbody>
        </table>
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>
        <CCardTitle>Dividends</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <table class="table table-bordered table-sm table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data.dividends" :key="item.id">
              <td>{{ item.date }}</td>
              <td>{{ item.value }} {{ currency }}</td>
            </tr>
          </tbody>
        </table>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
  import API from '@/api'

  export default {
    name: 'PositionDetails',

    data() {
      return {
        data: {}
      }
    },

    computed: {
      name() {
        return this.$route.params.name
      },
      isin() {
        return this.$route.params.isin
      },
      currency() {
        return this.data.currency
      }
    },

    async created() {
      const response = await API.get(`/positionDetails?isin=${this.isin}`)
      this.data = response.data
    }
  }
</script>
