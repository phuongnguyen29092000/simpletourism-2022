const {transporter} = require('./node_mailer_setup')
const adminEmail = process.env.EMAIL

const emailBookTicket = async(infoTicket) =>{
    transporter.sendMail({
        to: infoTicket.email,
        from: adminEmail,
        subject: '[SimpleTourism] - Email xác nhận đặt tour du lịch.',
        html: `
            <h2> Simple Tourism thông báo: bạn đã hoàn tất đặt tour tại website của chúng tôi!</h2>
            <h3> Chi tiết vé bao gồm các thông tin sau:</h3>
            <ul>
                <li>Tên khách hàng: <b>${infoTicket.customerName}.</b></li>
                <li>Tên tour: <b>${infoTicket.tourName}.</b></li>
                <li>Điện thoại liên hệ: <b>${infoTicket.phone}.</b></li>
                <li>Số lượng vé: <b>${infoTicket.numberPeople}.</b></li>
                <li>Đơn giá: <b>${infoTicket.paymentPrice}</b></li>
                <li>Tổng tiền: <b>${parseInt(infoTicket.paymentPrice*infoTicket.numberPeople)} VNĐ.</b></li>
                <li>Trạng thái vé: <b>Đã thanh toán!</b></li>
            </ul>
            <p>Chúng tôi sẽ liên hệ với bạn trong thời gian ngắn nhất thông qua số điện thoại ở phía trên. Xin cảm ơn!</p>
            <p><i>Nếu có thông tin gì cần thay đổi mong bạn liên hệ lại với chúng tôi theo email này hoặc số điện thoại: <b>0395360327.</b></i></p>
            `
    }, 
    (error) => {
        if (error) {
          return console.log("There was an error: " + error);
        }
        console.log("Email sent successfully");
      }
    )
}

module.exports= {
    emailBookTicket
}
