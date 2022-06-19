import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {useNavigate} from 'react-router-dom'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material'
import AddTypePlaceModal from '../../components/modal/TypePlace'
import { useDispatch, useSelector } from 'react-redux'
import { getTypePlace, createTypePlace, updateTypePlace, deleteTypePlace} from 'redux/reducers/typePlace/action'
import ConfirmModal from '../../components/modal/ConfirmModal/ConfirmModal'
import PaginationCustom from 'components/common/PaginationCustom'
import { getUser } from 'hooks/localAuth'
import moment from 'moment'

function ListTypePlace() {
    const [open, setOpen] = useState(false) 
    const [openUpdate, setOpenUpdate] = useState(false) 
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [typeDelete, setTypeDelete] = useState({})
    const [typeUpdate, setTypeUpdate] = useState('')
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const [dataList, setDataList] = useState([])
    const [listAll, setListAll] = useState([])
    let navigate = useNavigate();
    
    let { listTypePlace, error } = useSelector((store) => store.typePlace)

    useEffect(() => {
        dispatch(getTypePlace())
    }, [dispatch])

    useEffect(() => {
        setListAll(listTypePlace)
    }, [listTypePlace])

    const handleOnChange = (e, value) => {
        let start = (value - 1) * 10;
        let end = start + 10 < listAll.length ? start + 10 : listAll.length;

        setDataList([...listAll.slice(start, end)])
        setPage(value)
    }

    useEffect(() => {
        setDataList([...listAll.slice(0, 10)])
        setPage(1)
    }, [listTypePlace, listAll])
    
    const handleDelete = () => {
        dispatch(deleteTypePlace(typeDelete._id, ()=> {
            setOpenConfirmModal(false)
        }
        ))
        if(Object.keys(error) !==0) setOpenConfirmModal(false)
    }
    
    const handleClose = () => {
        setOpen(!open);
    }
    const handleCloseUpdate = () => {
        setOpenUpdate(!openUpdate);
    }
   
    return (
        <div className='tour-manager'>
            <div className='tour-manager__add-tour'>
                <div className='btn-add'>
                    <Button variant="contained" className='btn-add-tour' onClick={() => setOpen(true)}>Thêm loại địa hình</Button>
                </div>
            </div>
            <div className='tour-manager__listtour'>
                <table>
                    <thead>
                        <th className='th-title'>Tên loại địa hình</th>
                        <th className='th-description'>Mô tả</th>
                        <th className='th-2'>Ngày tạo</th>
                        <th className='th-2'></th>
                    </thead>
                    <tbody>
                        {
                            dataList && dataList.map((type, index) => (
                                <tr key={index}>
                                    <td className='th-title'>{type.name}</td>
                                    <td className='th-description text-ellipsis'>{type.description}</td>
                                    <td>{moment(type.createdAt).format('DD/MM/YYYY LTS')}</td>
                                    <td>
                                        <div className='action-col'>
                                            <div className='btn-action btn-edit' onClick={()=>{
                                                setTypeUpdate(type)
                                                setOpenUpdate(true)
                                            }}>
                                                <EditIcon fontSize='15px' />
                                            </div>
                                            <div className='btn-action btn-delete' onClick={()=>{
                                                setTypeDelete(type)
                                                setOpenConfirmModal(true)
                                            }}>
                                                <DeleteOutlineIcon fontSize='15px' />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <PaginationCustom total={listAll.length} limit={10} page={page} onChange={handleOnChange} />
            </div>
            <AddTypePlaceModal open={open} handleClose={handleClose} action="THÊM LOẠI ĐỊA HÌNH MỚI"/>
            <AddTypePlaceModal open={openUpdate} handleClose={handleCloseUpdate} typePlace={typeUpdate} action="CẬP NHẬT LOẠI ĐỊA HÌNH"/>
            <ConfirmModal 
                handleAction={handleDelete} 
                content={`Bạn muốn xóa loại địa hình ${typeDelete.name}?`} 
                setOpenConfirmModal = {setOpenConfirmModal}
                title= "Xác nhận"
                openConfirmModal={openConfirmModal} 
            />
        </div>
    );
}

export default ListTypePlace;