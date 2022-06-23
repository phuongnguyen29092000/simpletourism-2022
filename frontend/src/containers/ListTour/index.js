import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {useNavigate} from 'react-router-dom'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material'
import AddTourModal from '../../components/modal/addTourModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTour, getTourByOwner } from 'redux/reducers/listTour/action'
import { getTicketPerTour } from '../../redux/reducers/listTicket/action'
import ConfirmModal from '../../components/modal/ConfirmModal/ConfirmModal'
import PaginationCustom from 'components/common/PaginationCustom'
import RegardPrice from 'LogicResolve/RegardPrice'
import { ROUTE_LIST_TICKET } from '../../route/type';
import { getUser } from 'hooks/localAuth'
import useNotification from 'hooks/notification'
import { setActiveUrl } from 'redux/reducers/activeUrl/action'

function ListTour({keySearch = ''}) {
    const [open, setOpen] = useState(false) 
    const [openUpdate, setOpenUpdate] = useState(false) 
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [tourDelete, setTourDelete] = useState({})
    const [tourUpdate, setTourUpdate] = useState('')
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const [dataList, setDataList] = useState([])
    const [listAll, setListAll] = useState([])
    let navigate = useNavigate();
    useEffect(() => {
        document.title = 'Simple Tourism | Quản lý tour'
        dispatch(setActiveUrl('list-tour'))
    },[])
    let { listTourOwner } = useSelector((store) => store.listTour)

    useEffect(() => {
        setListAll([...listTourOwner?.filter((item) => item?.tourName?.toLowerCase().includes(keySearch.toLowerCase()))])
        
    }, [keySearch])

    useEffect(() => {
        setListAll(listTourOwner)
    },[listTourOwner])

    useEffect(()=>{
        if(!listTourOwner.length) dispatch(getTourByOwner(getUser()._id))
    }, [])

    const handleOnChange = (e, value) => {
        let start = (value - 1) * 10;
        let end = start + 10 < listAll.length ? start + 10 : listAll.length;

        setDataList([...listAll.slice(start, end)])
        setPage(value)
    }

    useEffect(() => {
        setDataList([...listAll.slice(0, 10)])
        setPage(1)
    }, [listTourOwner, listAll])

    const getTickerPerTour = (id) => {
        dispatch(getTicketPerTour(id,() => {
            navigate(`${ROUTE_LIST_TICKET}`)
        }))
    }
    
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
                                            <div className='btn-action btn-ticket' onClick={()=>{
                                                getTickerPerTour(_tour._id.toString())
                                            }}>
                                                <ConfirmationNumberIcon fontSize='15px' />
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