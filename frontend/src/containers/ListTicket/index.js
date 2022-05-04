import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddTourModal from '../../components/modal/addTourModal'

function ListTicket(props) {
    const [open, setOpen] = useState(false)

    const handleClose = ()=>{
        setOpen(!open);
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
                        <tr>
                        <td className='td-2'>Nguyễn Văn A</td>
                        <td className='td-2'>0964465300</td>
                        <td className='td-1'>lmvhlmvhlmvh@gmail.com</td>
                        <td className='td-1'>Du lịch Nha Trang</td>
                        <td className='td-3'>4</td>
                        <td className='td-2'>12.000.000</td>
                        <td className='td-3'>Trạng thái</td>
                            <td>
                                <div className='action-col'>
                                    <div className='btn-action btn-edit'>
                                        <EditIcon fontSize='15px'/>
                                    </div>
                                    <div className='btn-action btn-delete'>
                                        <DeleteOutlineIcon fontSize='15px'/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <AddTourModal open={open} handleClose={handleClose}/>
        </div>
    );
}

export default ListTicket;