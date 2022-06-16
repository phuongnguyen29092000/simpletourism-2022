import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddTourModal from '../../components/modal/addTourModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomerBooked } from '../../redux/reducers/user/action'
import ConfirmModal from '../../components/modal/ConfirmModal/ConfirmModal'
import { getUser } from 'hooks/localAuth'

function ListUserOwner(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    let {account, listUserOwner} = useSelector((store) => store.user)
    const [ticketData, setTicketData] = useState([])
    
    const handleClose = ()=>{
        setOpen(!open)
    }
    useEffect(()=>{
        if(listUserOwner?.users?.length === 0) dispatch(getAllCustomerBooked(getUser()._id))
    },[listUserOwner.user])

    return (
        <div className='ticket-manager'>
            <div className='ticket-manager__listticket'>
                <table>
                    <thead>
                        <th className='th-2'>Tên khách hàng</th>
                        <th className='th-2'>Điện thoại</th>
                        <th className='th-1'>Email</th>
                        <th className='th-1'>Danh sách tour</th>
                        <th className='th-2'>Tổng vé đã đặt</th>
                        <th className='th-2'>Tổng tiền (VND)</th>
                        <th className='th-2'></th>
                    </thead>
                    <tbody>
                        {
                            listUserOwner?.users &&
                            listUserOwner?.users?.map((user, index) =>(
                                <tr key={index} style={{borderBottom:'5px solid white'}}>
                                    <td className='td-2'>{user?.givenName}</td>
                                    <td className='td-1'>{user?.phone?.map((phoneItem)=>(
                                        <div style={{margin:'3px 0px'}}>{phoneItem}</div>
                                    ))}</td>
                                    <td className='td-1'>{user?.email}</td>
                                    <td className='td-3'>{user?.totalTours?.map((tour)=>(
                                        <div style={{margin:'3px 0px'}}>{tour}</div>
                                    ))}</td>
                                    <td className='td-2' style={{textAlign:'center'}}>{user?.totalTickets}</td>
                                    <td className='td-3' style={{textAlign:'right'}}>{user?.totalPrice.toLocaleString().split(',').join('.')} đ</td>
                                    <td>
                                        <div className='action-col'>
                                            <div className='btn-action btn-edit'>
                                                <EditIcon fontSize='15px'/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <AddTourModal open={open} handleClose={handleClose}/>
        </div>
    );
}

export default ListUserOwner