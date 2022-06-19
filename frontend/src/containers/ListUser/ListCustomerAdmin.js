import React, { useEffect, useState } from 'react'
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddTourModal from '../../components/modal/addTourModal'
import BecomeOwner from 'components/modal/BecomeOwner/BecomeOwner';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomerAdmin } from '../../redux/reducers/user/action'
import ConfirmModal from '../../components/modal/ConfirmModal/ConfirmModal'
import moment from 'moment';
 
function ListCustomerAdmin(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [customer, setCustomer]= useState({})
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    let {listCustomerAdmin} = useSelector((store) => store.user)
    
    const handleClose = ()=>{
        setOpen(!open)
    }
    useEffect(()=>{
        if(listCustomerAdmin?.customers?.length === 0) dispatch(getAllCustomerAdmin())
    },[listCustomerAdmin?.customers?.length])

    return (
        <div className='ticket-manager'>
            <div className='ticket-manager__listticket'>
                <table>
                    <thead>
                        <th className='th-2'>Ảnh đại diện</th>
                        <th className='th-2'>Tên khách hàng</th>
                        <th className='th-1'>Email</th>
                        <th className='th-1'>Quyền hạn</th>
                        <th className='th-2'>Ngày tạo</th>
                        <th className='th-2'>Cấp quyền <br></br> công ty </th>
                    </thead>
                    <tbody>
                        {
                            listCustomerAdmin.customers &&
                            listCustomerAdmin?.customers?.map((user, index) =>(
                                <tr key={index} style={{borderBottom:'5px solid white'}}>
                                    <td className='td-2' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <img style={{width:'70px'}}src={user?.photoUrl} alt=''/>
                                    </td>
                                    <td className='td-1'>
                                        {user?.familyName}{' '}{user?.givenName}
                                    </td>
                                    <td className='td-1'>{user?.email}</td>
                                    <td className='td-3'>Khách hàng</td>
                                    <td className='td-2'>{moment(user?.createdAt).format('YYYY-MM-DD LTS')}</td>
                                    <td style={{margin:'0px 0px 20px 0px'}}>
                                        <div className='action-col' style={{display:'flex', justifyContent:'center'}}>
                                            <div className='btn-action btn-edit' onClick={()=>{
                                                setOpen(!open)
                                                setCustomer(user)
                                            }}>
                                                <UpgradeIcon fontSize='15px'/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <BecomeOwner open={open} handleClose={handleClose} customer={customer}/>
        </div>
    );
}

export default ListCustomerAdmin