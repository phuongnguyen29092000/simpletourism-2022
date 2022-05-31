import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddTourModal from '../../components/modal/addTourModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTicket, getAllTicket } from '../../redux/reducers/listTicket/action'
import ConfirmModal from '../../components/modal/ConfirmModal/ConfirmModal'
import { getUser } from 'hooks/localAuth'

function ListTicket(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [ticketDelete, setTicketDelete] = useState({})
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    let {list_ticket, listTicketPerTour} = useSelector((store) => store.listTicket)
    let {account} = useSelector((store) => store.user)
    const [ticketData, setTicketData] = useState([])
    
    const handleClose = ()=>{
        setOpen(!open);
    }
    useEffect(()=>{
        if(list_ticket.length === 0) dispatch(getAllTicket(getUser()._id))
    },[list_ticket])

    const handleDelete = () => {
        dispatch(deleteTicket(ticketDelete.id,()=>setOpenConfirmModal(false)))
    }
    return (
        <div className='ticket-manager'>
            <div className='ticket-manager__listticket'>
                <table>
                    <thead>
                        <th className='th-2'>Tên khách hàng</th>
                        <th className='th-2'>Điện thoại</th>
                        <th className='th-1'>Email</th>
                        <th className='th-1'>Tour</th>
                        <th className='th-2'>Số vé</th>
                        <th className='th-2'>Tổng tiền</th>
                        <th className='th-2'>Trạng thái</th>
                        <th className='th-2'></th>
                    </thead>
                    <tbody>
                        {
                            list_ticket.length !=0 ? 
                            list_ticket?.map((ticket, index) =>(
                                <tr key={index}>
                                <td className='td-2'>{ticket?.customerName}</td>
                                <td className='td-2'>{ticket?.phone}</td>
                                <td className='td-1'>{ticket?.email}</td>
                                <td className='td-1'>{ticket?.tourName}</td>
                                <td className='td-3'>{ticket?.numberPeople}</td>
                                <td className='td-2'>{parseInt(ticket?.paymentPrice*ticket?.numberPeople)}</td>
                                <td className='td-3'>{ticket?.status==0 ? "Chưa thanh toán" : 'Đã thanh toán'}</td>
                                    <td>
                                        <div className='action-col'>
                                            <div className='btn-action btn-edit'>
                                                <EditIcon fontSize='15px'/>
                                            </div>
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

                            )) : <span>Not Found</span>
                        }
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