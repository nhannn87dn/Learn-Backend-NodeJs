/**
 * 
 * @returns Tạo số điện thoại Viêt Nam ngẫu nhiên
 */
function generateRandomMobile() {
    const prefixArray = ['032', '033', '034', '035', '036', '037', '038', '039', '058', '059', '070', '076', '077', '078', '079', '081', '082', '083', '084', '085', '086', '088', '089', '090', '091', '092', '093', '094', '096', '097', '098', '099'];
    const randomPrefix = prefixArray[Math.floor(Math.random() * prefixArray.length)];
    const randomNumber = Math.floor(Math.random() * 10000000);
    const mobileString = `${randomPrefix}${String(randomNumber).padStart(7, '0')}`;
    return mobileString;
}

module.exports =  generateRandomMobile;
  