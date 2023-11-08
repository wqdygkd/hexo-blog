// 翻转整数
n = 12345
m = 0
do {
    let last = n % 10
    n = parseInt(n / 10)
    m = m * 10 + last
} while(Boolean(n))

console.log(m)
