﻿
function init() {
    var app = new Vue({
        el: '#app',
        data: {
            positions: [],
            filter: '',
            properties: ['name', 'isin', 'open', 'close', 'duration', 'marketProfit', 'dividendProfit', 'totalProfit',
                'marketRoi', 'dividendRoi', 'totalRoi', 'marketRoiAnual', 'dividendRoiAnual', 'totalRoiAnual'],
            headers: ['Name', 'Isin', 'Open', 'Close', 'Duration', 'Market', 'Dividend', 'Total',
                'Market', 'Dividend', 'Total', 'Market', 'Dividend', 'Total'],
            performance: null,
            benchmark: null,
            diversification: {
                data: null,
                labels: null
            }
        },
        created: function () {
            this.get('/api/positions', {}, function (that, response) {
                that.positions = response
            });
            this.get('/api/performance', {}, function (that, response) {
                that.performance = response
            });
            this.get('/api/benchmark', {}, function (that, response) {
                that.benchmark = response
            });
            this.get('/api/diversification', {}, function (that, response) {
                that.diversification.data = response.data;
                that.diversification.labels = response.labels;
            });
        },
        filters: {
            formatValue: formatValue
        },
        methods: {
            get: function (url, data, onDone) {
                var that = this
                $.ajax({
                    url: url,
                    data: data,
                    dataType: 'json',
                    method: 'GET'
                }).then(function (response) {
                    if (response.error) {
                        console.err("ERROR: " + response.error);
                    } else {
                        onDone(that, response);
                    }
                }).catch(function (err) {
                    console.error("EXCEPTION:" + err);
                });
            }
        }
    })
}
