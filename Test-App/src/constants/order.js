let orderStatus = [
    "pending", //Mới đặt hàng
    "confirmed", //Đã xác nhận đơn hàng
    "canceled", //Hủy đơn hàng
    "prepareShipping", //chuẩn bị giao hàng
    "shipping", //đang giao hàng
    "cancelShipping", //hủy giao hàng
    "shipped", //đã giao hàng
    "paid", //đã thanh toán
    "refund", //hoàn tiền
    "finished", //hoàn thành
];

const actionLogs = [...orderStatus, 'note'];

module.exports = {
    orderStatus,
    actionLogs
}