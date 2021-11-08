let accounting = require('accounting-js');
let moment = require('moment')

let accountingConfig = {
    symbol: "",
    precision: 2,
    thousand: " ",
};


const _polybor = async () => {
    return {
        latest: accounting.formatMoney(12.02, accountingConfig),
        day: accounting.formatMoney(0.49, accountingConfig),
        week: accounting.formatMoney(-0.08, accountingConfig),
    }
}
const _polyborWeek = async () => {
    return {
        latest: accounting.formatMoney(13.64, accountingConfig),
        day: accounting.formatMoney(-0.61, accountingConfig),
        week: accounting.formatMoney(-4.38, accountingConfig),
    }
}

const _interestRate = async () => {

    return [
        {"date": "22-10-2021", "value": 16.58195},
        {"date": "23-10-2021", "value": 14.96066},
        {"date": "24-10-2021", "value": 18.55103},
        {"date": "25-10-2021", "value": 14.32083},
        {"date": "26-10-2021", "value": 14.90104},
        {"date": "27-10-2021", "value": 16.08059},
        {"date": "28-10-2021", "value": 18.04261},
        {"date": "29-10-2021", "value": 14.05464},
        {"date": "30-10-2021", "value": 19.17116},
        {"date": "31-10-2021", "value": 16.31508},
        {"date": "01-11-2021", "value": 12.09649},
        {"date": "02-11-2021", "value": 12.03231},
        {"date": "03-11-2021", "value": 14.15431},
        {"date": "04-11-2021", "value": 12.24449},
        {"date": "05-11-2021", "value": 9.99716},
        {"date": "06-11-2021", "value": 10.70502},
        {"date": "07-11-2021", "value": 11.52507},
        {"date": "08-11-2021", "value": 12.01926}
    ]


}

const _distributionRate = async () => {

    return [
        {"label": "-6%", "normalDist": 0, "ovnDist": 0},
        {"label": "-4%", "normalDist": 0, "ovnDist": 0},
        {"label": "-2%", "normalDist": 0, "ovnDist": 0},
        {"label": "0", "normalDist": 0, "ovnDist": 0},
        {"label": "2%", "normalDist": 0.001, "ovnDist": 0},
        {"label": "4%", "normalDist": 0.015, "ovnDist": 0},
        {"label": "6%", "normalDist": 0.20500000000000002, "ovnDist": 0},
        {"label": "8%", "normalDist": 1.636, "ovnDist": 5.88},
        {"label": "10%", "normalDist": 7.477, "ovnDist": 11.76},
        {"label": "12%", "normalDist": 19.57, "ovnDist": 17.65},
        {"label": "14%", "normalDist": 29.348999999999997, "ovnDist": 29.41},
        {"label": "16%", "normalDist": 25.215, "ovnDist": 17.65},
        {"label": "18%", "normalDist": 12.411999999999999, "ovnDist": 17.65},
        {"label": "20%", "normalDist": 3.5000000000000004, "ovnDist": 0},
        {"label": "22%", "normalDist": 0.565, "ovnDist": 0},
        {"label": "24%", "normalDist": 0.052, "ovnDist": 0},
        {"label": "26%", "normalDist": 0.003, "ovnDist": 0},
        {"label": "28%", "normalDist": 0, "ovnDist": 0}]
}


module.exports = {
    polybor: _polybor,
    polyborWeek: _polyborWeek,
    interestRate: _interestRate,
    distributionRate: _distributionRate,

}

