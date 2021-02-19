/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
function findSubstring(s, words) {
  if (words.length === 0) return []

  const wordLen = words[0].length // 每个单词长度
  const strLength = words.length * wordLen // 所有单词拼接成的字符串总长度
  const map = words.reduce((p, c) => { 
    // 存储每个单词出现的次数，key 为单词，value 为次数
    p[c] = (p[c] || 0) + 1
    return p
  }, {})
  const res = []

  for (let i = 0; i < s.length - strLength + 1; i++) {
    // 依次遍历 s 中的字符
    // 每次选取由当前字符作为起始位置，长度为所有单词组成的字符串总长所组成的子串
    // 判断该子串中出现的单词次数是否与 tempMap 中每个单词出现次数匹配

    const tempMap = { ...map }
    let rest = words.length // 需要匹配的剩余单词数
    let start = i
    while (rest > 0) {
      const word = s.substr(start, wordLen) // 截取单词
      if (!(word in tempMap) || tempMap[word] === 0) break // 如果单词不存在或该单词已经完成匹配

      tempMap[word]--
      rest--
      start += wordLen
    }

    rest === 0 && res.push(i) // 全部匹配，插入起始位置
  }

  return res
}
