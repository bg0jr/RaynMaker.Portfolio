<template>
  <div>
    <h1>Cashflow</h1>

    <label>Limit: </label>
    <input v-model="limit" @keyup.enter="onLimitChanged">

    <table>
      <thead>
        <tr>
          <th class="date">Date</th>
          <th class="comment">Type/Comment</th>
          <th class="value">Value</th>
          <th class="value">Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in transactions" style="border-top-style:solid;border-top-width:1px" v-bind:key="t.date">
          <td class="date">
            {{ t.date }}
          </td>
          <td class="comment" style="padding-left:100px;padding-right:100px;">
            <b>{{ t.type }}</b><br />
            {{ t.comment }}
          </td>
          <td class="value">
            {{ t.value }}
          </td>
          <td class="value">
            {{ t.balance }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import * as my from '../assets/js/site.js'

  export default {
    name: 'Cashflow',
    data () {
      return {
        transactions: null,
        limit: 25
      }
    },
    created: function () {
      this.onLimitChanged()
    },
    methods: {
      onLimitChanged: function () {
        this.get(this, '/api/cashflow', { limit: this.limit }, function (that, response) {
          that.transactions = response
        })
      }
    },
    watch: {
      limit: function () {
        this.onLimitChanged()
      }
    },
    mixins: [my.webApi]
  }
</script>

<style scoped>
  .date {
    text-align: left;
  }

  .value {
    text-align: right;
  }

  .comment {
    text-align: center;
  }

  th, td {
    padding: 15px;
  }

  td {
    vertical-align: top;
  }
</style>
