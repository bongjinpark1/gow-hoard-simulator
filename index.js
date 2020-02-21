class Hoard {
    constructor () {
        this.level = 1
        this.currentExp = 0
        this.consumed = 0
        this.quality = 1
        this.treasureMap = [
            {
                exp: 10,
                rate: 5
            },
            {
                exp: 25,
                rate: 10
            },
            {
                exp: 50,
                rate: 20
            },
            {
                exp: 100,
                rate: 25
            },
            {
                exp: 250,
                rate: 30
            },
            {
                exp: 500,
                rate: 50
            }
        ]
    }

    levelUp (input) {
        if (input.length !== 6) throw new Error('Argument input must have length of 6.')

        let { rate, exp, qty } = input.reduce((result, qty, index) => {
            const treasure = this.treasureMap[index]
            result.rate += treasure.rate * qty
            result.exp += treasure.exp * qty
            result.qty += qty
            return result
        }, { rate: 0, exp: 0, qty: 0 })

        if (rate < 100) throw new Error('Rate must be greater than 100 but got ' + rate)

        const cost = qty * this.cost
        this.consumed += cost
        this.quality++

        // console.log(`${this.level} (${this.currentExp}/${this.expToNextLevel}) ${exp}`)

        while (exp) {
            if (exp + this.currentExp >= this.expToNextLevel) {
                exp -= this.expToNextLevel - this.currentExp
                this.currentExp = 0
                this.level++
            } else {
                this.currentExp = exp
                exp = 0
            }
            // console.log(`${this.level} (${this.currentExp}/${this.expToNextLevel}) ${exp}`)
        }

        console.log(`${input} | ${qty} | ${this.level}/${this.quality}, Chance: ${rate}, Cost: ${cost} Consumed: ${this.consumed}, Exp: ${this.currentExp}/${this.expToNextLevel}`)
    }

    get expToNextLevel () {
        return this.level + 1
    }

    get cost () {
        return (this.level - 1) * 200 + 800
    }
}

const input = [
    [0,0,5,0,0,0],
    [0,0,5,0,0,0],
    [0,0,5,0,0,0],
    [0,0,2,0,2,0],
    [0,0,2,0,2,0],
    [0,0,2,0,2,0],
    [0,0,0,2,2,0],
    [0,0,0,0,0,2],
    [0,0,0,0,0,2]
]

const hoard = new Hoard()

input.forEach((input) => {
    hoard.levelUp(input)
})