import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { useDispatch, useSelector } from 'react-redux'
import { getAllOwnerAdmin, setActive } from '../../redux/reducers/user/action'
import ConfirmModal from '../../components/modal/ConfirmModal/ConfirmModal'
import moment from 'moment';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
 
function ListOwnerAdmin(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [updateActiveUser, setUpdateActiveUser] = useState('')
    let {listOwnerAdmin} = useSelector((store) => store.user)
    
    const handleClose = ()=>{
        setOpen(!open)
    }
    useEffect(()=>{
        if(listOwnerAdmin?.owners?.length === 0) dispatch(getAllOwnerAdmin())
    },[listOwnerAdmin?.owners?.length])

    const handleChangeActive = () =>{
        dispatch(setActive(updateActiveUser,()=> setOpenConfirmModal(false)))
    }
    
    return (
        <div className='ticket-manager'>
            <div className='ticket-manager__listticket'>
                <table>
                    <thead>
                        <th className='th-2'>Ảnh đại diện</th>
                        <th className='th-2'>Tên công ty</th>
                        <th className='th-2'>Tên người đại diện</th>
                        <th className='th-1'>Email</th>
                        <th className='th-1'>Quyền hạn</th>
                        <th className='th-2'>Ngày tạo</th>
                        <th className='th-2'>Hoạt động</th>
                        <th className='th-2'>Xóa</th>
                    </thead>
                    <tbody>
                        {
                            listOwnerAdmin.owners &&
                            listOwnerAdmin?.owners?.map((user, index) =>(
                                <tr key={index} style={{borderBottom:'5px solid white'}}>
                                    <td className='td-2' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <img style={{width:'70px', height:'70px'}}src={user?.photoUrl} alt=''/>
                                    </td>
                                    <td className='td-1'>{user?.companyName}</td>
                                    <td className='td-1'>
                                        {user?.familyName}{' '}{user?.givenName}
                                    </td>
                                    <td className='td-1'>{user?.email}</td>
                                    <td className='td-3'>Công ty du lịch</td>
                                    <td className='td-2'>{moment(user?.createdAt).format('YYYY-MM-DD LTS')}</td>
                                    <td className='td-switch'>  
                                        <FormGroup>
                                            <FormControlLabel control={<Switch checked={user?.active} onChange={()=>{
                                                setOpenConfirmModal(!openConfirmModal)
                                                setUpdateActiveUser(user)
                                            }} />}
                                            />
                                        </FormGroup>
                                    </td>
                                    <td style={{margin:'0px 0px 20px 0px'}}>
                                        <div className='action-col' style={{display:'flex', justifyContent:'center'}}>
                                            <div className='btn-action btn-delete'>
                                                <DeleteOutlineIcon fontSize='15px'/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <ConfirmModal 
                handleAction={handleChangeActive} 
                content={`Bạn muốn ${updateActiveUser?.active ? 'ngừng' : 'thiết lập'} hoạt động công ty ${updateActiveUser?.companyName}?`} 
                setOpenConfirmModal = {setOpenConfirmModal}
                title= "Xác nhận"
                openConfirmModal={openConfirmModal}
            />
        </div>
    );
}

export default ListOwnerAdmin