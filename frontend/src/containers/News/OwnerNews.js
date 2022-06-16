import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {useNavigate} from 'react-router-dom'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material'
import AddNewsModal from '../../components/modal/addNewsModal'
import { useDispatch, useSelector } from 'react-redux'
import { getNewsPerCompany, deleteNews } from 'redux/reducers/news/action'
import ConfirmModal from '../../components/modal/ConfirmModal/ConfirmModal'
import PaginationCustom from 'components/common/PaginationCustom'
import { getUser } from 'hooks/localAuth'
import moment from 'moment'

function OwnerNews({keySearch = ''}) {
    const [open, setOpen] = useState(false) 
    const [openUpdate, setOpenUpdate] = useState(false) 
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [newsDelete, setNewsDelete] = useState({})
    const [newsUpdate, setNewsUpdate] = useState('')
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const [dataList, setDataList] = useState([])
    const [listAll, setListAll] = useState([])
    let navigate = useNavigate();
    
    let { listNewsCompany } = useSelector((store) => store.news)

    useEffect(() => {
        dispatch(getNewsPerCompany(getUser()._id,(data) => setListAll([...data?.filter((item) => item?.title?.toLowerCase().includes(keySearch.toLowerCase()))])))
        
    }, [keySearch, dispatch])

    useEffect(() => {
        setListAll(listNewsCompany)
    },[listNewsCompany])

    const handleOnChange = (e, value) => {
        let start = (value - 1) * 10;
        let end = start + 10 < listAll.length ? start + 10 : listAll.length;

        setDataList([...listAll.slice(start, end)])
        setPage(value)
    }

    useEffect(() => {
        setDataList([...listAll.slice(0, 10)])
        setPage(1)
    }, [listNewsCompany, listAll])
    
    const handleDelete = () => {
        dispatch(deleteNews(newsDelete.id,(res)=>{
            console.log(openConfirmModal);
            if(res) setOpenConfirmModal(false)
        }
        ))
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
                    <Button variant="contained" className='btn-add-tour' onClick={() => setOpen(true)}>Thêm tin tức</Button>
                </div>
            </div>
            <div className='tour-manager__listtour'>
                <table>
                    <thead>
                        <th className='th-title'>Tiêu đề</th>
                        <th className='th-description'>Nội dung</th>
                        <th className='th-2'>Ngày đăng</th>
                        <th className='th-2'>Lượt xem</th>
                        <th className='th-2'></th>
                    </thead>
                    <tbody>
                        {
                            dataList && dataList.map((news, index) => (
                                <tr key={index}>
                                    <td className='th-title'>{news.title}</td>
                                    <td className='th-description text-ellipsis'>{news.description}</td>
                                    <td>{moment(news.createdAt).format('DD/MM/YYYY LTS')}</td>
                                    <td style={{textAlign: 'center'}}>{news?.viewer}</td>
                                    <td>
                                        <div className='action-col'>
                                            <div className='btn-action btn-edit' onClick={()=>{
                                                setNewsUpdate(news)
                                                setOpenUpdate(true)
                                            }}>
                                                <EditIcon fontSize='15px' />
                                            </div>
                                            <div className='btn-action btn-delete' onClick={()=>{
                                                setNewsDelete({id: news._id, title: news.title})
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
            <AddNewsModal open={open} handleClose={handleClose} action="THÊM TIN TỨC MỚI"/>
            <AddNewsModal open={openUpdate} handleClose={handleCloseUpdate} news={newsUpdate} action="CẬP NHẬT TOUR"/>
            <ConfirmModal 
                handleAction={handleDelete} 
                content={`Bạn muốn xóa tin tức ${newsDelete.title}`} 
                setOpenConfirmModal = {setOpenConfirmModal}
                title= "Xác nhận"
                openConfirmModal={openConfirmModal}
            />
        </div>
    );
}

export default OwnerNews;