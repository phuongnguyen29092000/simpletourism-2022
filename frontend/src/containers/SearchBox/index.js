import React, { useCallback, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { debounce } from 'lodash'
import { Search } from '@mui/icons-material';
import ListTourAPI from 'api/ListTourAPI';
import useNotification from 'hooks/notification';
import TourCardMini from 'components/Cards/TourCardMini';
import ConvertToImageURL from 'LogicResolve/ConvertToImageURL';
import SpinnerLoading from 'components/SpinnerLoading'
import { useNavigate } from 'react-router-dom';
import { CheckExpiredToken } from 'ultis/authUtil';
const SearchBox = ({ onClose }) => {
    const [listResult, setListResult] = useState([])
    const [moreTour, setMoreTour] = useState(false)
    const [loading, setLoading] = useState(false)
    const [valueInput, setValueInput] = useState('')
    const navigate = useNavigate();
    const searchTourDebounce = useCallback(debounce(async (param) => {
        await CheckExpiredToken()
        ListTourAPI.searchTour({ q: param })
            .then((rs) => {
                if (rs.status === 200) {
                    if (rs.data.data.length > 6) {
                        setListResult(rs.data.data.slice(0, 6))
                        setMoreTour(true)
                    } else {
                        setListResult(rs.data.data)
                        setMoreTour(false)
                    }
                } else {
                    setListResult([])
                    setMoreTour(false)
                }
                setLoading(false)
            }).catch((error) => {
                setListResult([])
                setMoreTour(false)
                setLoading(false)
            })
    }, 500), [])

    const handleLoadSearchPage = () => {
        navigate(`/ket-qua?q=${valueInput}`)
    }

    const handleSearchTour = (e) => {
        if (e.target.value.trim() === '') {
            setListResult([])
            setMoreTour(false)
            setLoading(false)
            setValueInput('')
        }
        else {
            setValueInput(e.target.value)
            searchTourDebounce(e.target.value)
            setLoading(true)
        }
    }
    return (
        <div className='search-box' style={{ width: '300px' }}>
            <div className='search-box__header'>
                <div className='btn-cancel'>
                    <CloseIcon className='cancel' onClick={onClose} />
                </div>
                <OutlinedInput
                    className='search-input'
                    placeholder='search...'
                    value={valueInput}
                    color='primary'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleLoadSearchPage()
                        }
                    }}
                    onChange={(e) => {
                        handleSearchTour(e)
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleLoadSearchPage}
                                edge="end"
                            >
                                <SearchIcon className='search-icon' />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </div>
            <div className='search-box__result'>
                {loading ? <SpinnerLoading /> :
                    listResult.length > 0 ?
                        (
                            listResult.map((tour, index) => (
                                <div className='mini-tour-card' title={tour.tourName} key={index} onClick={() => navigate(`/tour-chi-tiet/${tour._id}`)}>
                                    <TourCardMini
                                        name={tour.tourName}
                                        img={ConvertToImageURL(tour.imageAvatar)}
                                        rating={tour.ratingsAverage}
                                        _id={tour._id}
                                    />
                                </div>
                            ))
                        )
                        : valueInput.trim() !== '' ?
                            (
                                <div className='title-not-found'>
                                    <h4>Không tìm thấy!</h4>
                                </div>
                            )
                            :
                            (<></>)
                }
                {
                    moreTour &&
                    <div className='title-more'>
                        <span onClick={() => handleLoadSearchPage()}>Xem tất cả</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchBox;