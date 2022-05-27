const calculator = document.forms['calculator']
const sections = document.getElementsByTagName('section')
const total = document.getElementById('total')


const costByColor = {
    'red': 1.5,
    'pink': 1,
    'yellow': 1.2,
    'white': 1.3,
}

calculator.onchange = function() {
    for (let i = 1; i <= sections.length; i++) {
        const amount = 'amount-' + i
        const color = 'color-' + i
        if (calculator[amount].value == 1) {
            calculator[color][0].required = true
        }
    }
}

calculator.onsubmit = function(e) {
    e.preventDefault()
    const price = []
    for (let i = 1; i <= sections.length; i++) {
        const type = 'type-' + i
        const color = 'color-' + i
        const amount = 'amount-' + i
        if (calculator[amount].value > 0) {
            price.push(Number(calculator[type].value * costByColor[calculator[color].value] * calculator[amount].value))
        }
        saveToStorage(type, color, amount)
    }
    const sum = '' + parseFloat(price.reduce((el, sum) => sum += el, 0)).toFixed(2)
    const result = sum.split('.')
    total.textContent = result[0] + ' грн ' + result[1] + ' копеек'
    localStorage.setItem('total', total.textContent)
}

function saveToStorage(type, color, amount) {
    localStorage.setItem(type, calculator[type].value)
    localStorage.setItem(color, calculator[color].value)
    localStorage.setItem(amount, calculator[amount].value)
}