import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material'
import AddTourModal from '../../components/modal/addTourModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTour, getAllTour } from '../../redux/reducers/listTour/action'
import ConfirmModal from '../../components/modal/ConfirmModal/ConfirmModal'
import PaginationCustom from 'components/common/PaginationCustom'
import RegardPrice from 'LogicResolve/RegardPrice'

function ListTour(props) {
    const [open, setOpen] = useState(false) 
    const [openUpdate, setOpenUpdate] = useState(false) 
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [tourDelete, setTourDelete] = useState({})
    const [tourUpdate, setTourUpdate] = useState('')
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const [dataList, setDataList] = useState([])
    
    let { listTour } = useSelector((store) => store.listTour)
    console.log(listTour?.length)
    useEffect(() => {
        if (listTour.length === 0) dispatch(getAllTour())
    }, [listTour])

    const handleOnChange = (e, value) => {
        let start = (value - 1) * 10;
        let end = start + 10 < listTour.length ? start + 10 : listTour.length;
        console.log(start, end)
        setDataList([...listTour.slice(start, end)])
        setPage(value)
    }

    useEffect(() => {
        setDataList([...listTour.slice(0, 10)])
    }, [listTour])
    
    const handleDelete = () => {
        dispatch(deleteTour(tourDelete.id,()=>setOpenConfirmModal(false)))
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
                    <Button variant="contained" className='btn-add-tour' onClick={() => setOpen(true)}>Thêm tour</Button>
                </div>
            </div>
            <div className='tour-manager__listtour'>
                <table>
                    <thead>
                        <th className='th-1'>Tên tour</th>
                        <th className='th-2'>Số lượng</th>
                        <th className='th-2'>Giá</th>
                        <th className='th-2'>Bắt đầu</th>
                        <th className='th-2'>Kết thúc</th>
                        <th className='th-2'>Khu vực</th>
                        <th className='th-2'></th>
                    </thead>
                    <tbody>
                        {
                            dataList && dataList.map((_tour, index) => (
                                <tr key={index}>
                                    <td>{_tour.tourName}</td>
                                    <td>{_tour.amount}</td>
                                    <td>{RegardPrice(_tour.price)}</td>
                                    <td>{new Date(_tour?.timeStart?.slice(0, 10))?.toLocaleDateString("en-GB")}</td>
                                    <td>{new Date(_tour?.timeEnd?.slice(0, 10))?.toLocaleDateString("en-GB")}</td>
                                    <td>{_tour.countryName}</td>
                                    <td>
                                        <div className='action-col'>
                                            <div className='btn-action btn-edit' onClick={()=>{
                                                setTourUpdate(_tour)
                                                setOpenUpdate(true)
                                            }}>
                                                <EditIcon fontSize='15px' />
                                            </div>
                                            <div className='btn-action btn-delete' onClick={()=>{
                                                setTourDelete({id: _tour._id, tourName: _tour.tourName})
                                                setOpenConfirmModal(true)
                                            }}>
                                                <DeleteOutlineIcon fontSize='15px' />
                                            </div>
                                            <div className='btn-action btn-ticket'>
                                                <ConfirmationNumberIcon fontSize='15px' />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <PaginationCustom total={listTour.length} limit={10} page={page} onChange={handleOnChange} />
            </div>
            <AddTourModal open={open} handleClose={handleClose} action="THÊM TOUR MỚI"/>
            <AddTourModal open={openUpdate} handleClose={handleCloseUpdate} tour={tourUpdate} action="CẬP NHẬT TOUR"/>
            <ConfirmModal 
                handleAction={handleDelete} 
                content={`Bạn muốn xóa tour ${tourDelete.tourName}`} 
                setOpenConfirmModal = {setOpenConfirmModal}
                title= "Xác nhận"
                openConfirmModal={openConfirmModal}
            />
        </div>
    );
}

export default ListTour;