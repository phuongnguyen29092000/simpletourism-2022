import React, { useEffect, useState, useCallback } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddTourModal from '../../components/modal/addTourModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTicket, getAllTicket } from '../../redux/reducers/listTicket/action'
import ConfirmModal from '../../components/modal/ConfirmModal/ConfirmModal'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { getUser } from 'hooks/localAuth'
import moment from 'moment'

function ListTicket(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [ticketDelete, setTicketDelete] = useState({})
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    let {list_ticket, listTicketPerTour} = useSelector((store) => store.listTicket)
    let {account} = useSelector((store) => store.user)
    const [ticketData, setTicketData] = useState([])
    const [objTotal, setObjTotal] = useState({})
    
    const handleClose = ()=>{
        setOpen(!open);
    }
    useEffect(()=>{
        console.log(list_ticket.length);
        if(listTicketPerTour.length === 0) dispatch(getAllTicket(getUser()._id, (data) => {
            setTicketData(data)
        }))
        else setTicketData([...listTicketPerTour])
        // if(!list_ticket.loading) setObjTotal(calucateTotalPriceTicket(list_ticket))
    },[listTicketPerTour, list_ticket])

    const handleDelete = () => {
        dispatch(deleteTicket(ticketDelete.id,()=>setOpenConfirmModal(false)))
    }

    const calucateTotalPriceTicket = (tickets) =>{ 
        const totalPrice = tickets.reduce(function (a, b) {
            return a + Number(b?.numberPeople*b?.paymentPrice);
        }, 0)
        const totalTicket = tickets.reduce((a,b) =>{
            return a + Number(b?.numberPeople)
        },0)
        return {
            totalPrice: totalPrice,
            totalTicket: totalTicket
        }
    }

    const convertVienameseToEnglish = (str) =>{ 
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/ + /g," ");
        str = str.trim();
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        return str
    }

    const handleExportCSVFile = useCallback(() => {
        let csv =
          'Ten khach hang,So dien thoai,Email khach hang,Ngay dat,Thoi gian dat,Trang thai ve,So luong ve,Tong tien thanh toan\n'
        let temp = []
        temp = ticketData.map((ticket) => ({
          'Ten khach hang': convertVienameseToEnglish(ticket?.customerName) || '',
          'So dien thoai': `(+84)${ticket?.phone}` || '',
          'Email khach hang': ticket?.email || '',
          'Ngay dat': `${moment(ticket?.createdAt).format('YYYY-MM-DD')}` || '0000-00-00',
          'Thoi gian dat': `${moment(ticket?.createdAt).format('LTS')}` || '00:00:00',
          'Trang thai ve': 'Da thanh toan' || '',
          'So luong ve': ticket?.numberPeople || 0,
          'Tong tien thanh toan': (parseInt(ticket?.paymentPrice*ticket?.numberPeople).toLocaleString().split(',').join('.')) || 0,
        }))
        temp.forEach(function (row) {
          csv += Object.keys(row)
            .map((key) => '"' + row[key] + '"')
            .join(',')
          csv += '\n'
        })
    
        // let total = `Tong ve: ${objTotal.totalTicket} \nTong tien: ${objTotal.totalPrice} VND`
        let hiddenElement = document.createElement('a')
        hiddenElement.href =
          'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
        hiddenElement.target = '_blank'
        hiddenElement.download = `${ticketData[0].tourName}.csv`
        hiddenElement.click()
      }, [ticketData])

    return (
        <div className='ticket-manager'>
            <div style={{width:'170px', margin: '10px 0px 20px 0px', display:'flex', alignItems:'center', cursor:'pointer'}} onClick={()=>handleExportCSVFile(ticketData)}>
                <FileDownloadIcon color='action'></FileDownloadIcon>
                <span style={{color:'#858585', fontWeight:'700', marginLeft:'10px', fontSize:'14px', cursor:'pointer'}}>Export to CSV File</span>
            </div>
            <div className='ticket-manager__listticket'>
                <table>
                    <thead>
                        <th className='th-2'>Tên khách hàng</th>
                        <th className='th-2'>Điện thoại</th>
                        <th className='th-1'>Email</th>
                        <th className='th-1'>Tên tour</th>
                        <th className='th-2'>Đặt lúc</th>
                        <th className='th-2'>Trạng thái</th>
                        <th className='th-2'>Số vé</th>
                        <th className='th-2'>Tổng tiền (VND)</th>
                        <th className='th-2'></th>
                    </thead>
                    <tbody>
                        {
                            ticketData &&
                            ticketData?.map((ticket, index) =>(
                                <tr key={index}>
                                    <td className='td-2'>{ticket?.customerName}</td>
                                    <td className='td-2'>{ticket?.phone}</td>
                                    <td className='td-1'>{ticket?.email}</td>
                                    <td className='td-1'>{ticket?.tourName}</td>
                                    <td className='td-4' style={{minWidth:'180px'}}>{moment(ticket?.createdAt).format('YYYY-MM-DD LTS')}</td>
                                    <td className='td-3'>{ticket?.status==0 ? "Chưa thanh toán" : 'Đã thanh toán'}</td>
                                    <td className='td-3' style={{textAlign:'right'}}>{ticket?.numberPeople}</td>
                                    <td className='td-5' style={{textAlign:'right'}}>{(parseInt(ticket?.paymentPrice*ticket?.numberPeople).toLocaleString().split(',').join('.'))} đ</td>
                                    <td>
                                        <div className='action-col'>
                                            <div className='btn-action btn-delete' 
                                                onClick={()=>{
                                                    // setTicketDelete({id: _tour._id, tourName: _tour.tourName})
                                                    // setOpenConfirmModal(true)
                                                }}>
                                                <DeleteOutlineIcon fontSize='15px'/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        {/* <tr style={{height:'80px'}}>
                            <td className='td-2'></td>
                            <td className='td-2'></td>
                            <td className='td-1'></td>
                            <td className='td-1'></td>
                            <td className='td-4' style={{minWidth:'180px'}}></td>
                            <td className='td-3'></td>
                            <td className='td-3' style={{textAlign:'right'}}>
                                <div style={{marginBottom:'15px', fontWeight:'700'}}>Tổng vé:</div>
                                <span>{objTotal.totalTicket}</span>  
                            </td>
                            <td className='td-2' style={{textAlign:'right'}}>
                                <div style={{marginBottom:'15px', fontWeight:'700'}}>Tổng tiền:</div>
                                <span>{objTotal.totalPrice?.toLocaleString().split(',').join('.')} đ</span>    
                            </td>
                            <td></td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
            <AddTourModal open={open} handleClose={handleClose}/>
            <ConfirmModal 
                handleAction={handleDelete} 
                content={`Bạn muốn xóa ticket`} 
                setOpenConfirmModal = {setOpenConfirmModal}
                title= "Xác nhận"
                openConfirmModal={openConfirmModal}
            />
        </div>
    );
}

export default ListTicket;