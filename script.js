const fs = require('fs')

function question1() {
  fs.readFile('./santa.txt', (err, data) => {
    const direction = data.toString()
    const directionsArray = direction.split('')
    const answer = directionsArray.reduce((acc, currentValue) => {
      if (currentValue === '(') {
        return (acc += 1)
      } else if (currentValue === ')') {
        return (acc -= 1)
      }
    }, 0)
    console.log('floor: ', answer)
  })
}

question1()

function question2() {
  fs.readFile('santa.txt', (err, data) => {
    const direction = data.toString()
    const directionsArray = direction.split('')
    let acc = 0
    let counter = 0
    answer = directionsArray.some((currentItem) => {
      if (currentItem === '(') {
        acc += 1
      } else if (currentItem === ')') {
        acc -= 1
      }
      counter++
      return acc < 0
    })
    console.log('basement entered at: ', counter)
  })
}

question2()

// fs.readFile('./hello.txt', (err, data) => {
//   if (err) {
//     console.log('errroooorrrr')
//   }

// })

// const file = fs.readFileSync('./hello.txt')
// console.log(file.toString())

// Append
// fs.appendFile('./hello.txt', ' This is so cool!', (err) => {
//   if (err) {
//     console.log(err)
//   }
// })

//write
// fs.writeFile('./bye.txt', 'Sad to see you go :(', (err) => {
//   if (err) {
//     console.log(err)
//   }
// })

// Delete
// fs.unlink('./bye.txt', (err) => {
//   if (err) {
//     console.log(err)
//   }
//   console.log('Inception')
// })
