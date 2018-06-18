/**
 * 校验银行卡号并对比旧卡号
 */
function verifyBankcardNoWithOldNo(no,oldNo) {
  // 判空
  if (no === oldNo) {
    return "银行卡没变化，不用提交"
  }
  return verifyBankcardNo(no)
}

/**
 * 校验银行卡号
 */
function verifyBankcardNo(no) {

  // 判空
  if (no === "") {
    return "请填写银行卡号"
  }

  // 判断长度
  const len = no.length
  if (len !== 16 && len !== 19) {
    return "银行卡号长度不对"
  }

  // 判断bin(错误前置，无错继续往下走)
  const prefix = no.substr(0, 6) + ''
  // 16位银行卡，3种bin
  if (len === 16) {
    if (prefix !== '421349' &&
        prefix !== '434061' &&
        prefix !== '434062' &&
        prefix !== '524094' &&
        prefix !== '526410' &&
        prefix !== '552245' &&
        prefix !== '621080' &&
        prefix !== '621466' &&
        prefix !== '621488' &&
        prefix !== '621499' &&
        prefix !== '622966' &&
        prefix !== '622988' &&
        prefix !== '621082' &&
        prefix !== '623251' &&
        prefix !== '622382' &&
        prefix !== '621487' &&
        prefix !== '621083' &&
        prefix !== '621084' &&
        prefix !== '623350' &&
        prefix !== '620107') {
      return "不是有效的建设银行储蓄卡卡号，请核对银行卡"
    }
    // 19位银行卡号,5种bin
  } else {
    if (prefix !== '621284' &&
        prefix !== '436742' &&
        prefix !== '589970' &&
        prefix !== '620060' &&
        prefix !== '621081' &&
        prefix !== '621467' &&
        prefix !== '621598' &&
        prefix !== '621621' &&
        prefix !== '621700' &&
        prefix !== '622280' &&
        prefix !== '622700' &&
        prefix !== '621673' &&
        prefix !== '623211' &&
        prefix !== '623668' &&
        prefix !== '623094' &&
        prefix !== '623669' &&
        prefix !== '623656' &&
        prefix !== '623644') {
      return "不是有效的建设银行储蓄卡卡号，请核对银行卡"
    }
  }

  return "success"
}

module.exports = {
  verifyBankcardNoWithOldNo: verifyBankcardNoWithOldNo,
  verifyBankcardNo: verifyBankcardNo
}