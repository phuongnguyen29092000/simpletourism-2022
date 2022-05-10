// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { getTypePlace} from '../../../redux/reducers/typePlace/action'
import TypePlaceAPI from '../../../api/TypePlaceAPI';
const Continents = [
    {
        value:'Asia',
        label: 'Châu Á'
    },
    {
        value:'Africa',
        label: 'Châu Phi'
    },
    {
        value:'Australia',
        label: 'Châu Úc'
    },
    {
        value:'Europe',
        label: 'Châu Âu'
    },
    {
        value:'North America',
        label: 'Bắc Mỹ'
    },
    {
        value:'South America',
        label: 'Nam Mỹ'
    },

];

const Discounts = ["10", "20", "30", "40", "50", "60", "70"]

const ConvertToImageURL = (url) => {
    if (url) return `http://localhost:4000/${url.slice(6)}`
    else return "";
}
function TourForm({ handleAddTour, tour, submit = false, setSubmit = ()=>{} }) {
    console.log(tour)
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();
    const formRef = useRef(null)
    const [start, setStart] = useState(tour ? tour.timeStart : new Date());
    const [end, setEnd] = useState(tour ? tour.timeEnd : new Date());
    const [dataPrevious, setDataPrevios] = useState(tour);
    const [imagePreview0, setImagePreview0] = useState();
    const [imagePreview1, setImagePreview1] = useState();
    const [imagePreview2, setImagePreview2] = useState();
    const [imagePreview3, setImagePreview3] = useState();
    // const [typePlaces, setTypePlaces] = useState([]);
    const [countries, setCountries] = useState([]);

    let {listTypePlace} = useSelector((store) => store.typePlace)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(listTypePlace.length === 0) dispatch(getTypePlace())
        // setTypePlaces(listTypePlace)
    },[])
    useEffect(()=>{
        TypePlaceAPI.getCountries()
        .then((result) => {
            if(result.status === 200){
                let dataTem = [...result.data.sort((a,b) => {
                    if (a.name.common > b.name.common) return 1;
                    if (a.name.common < b.name.common) return -1;
                    return 0;
                })]
                setCountries([...dataTem])
            }
        })
        .catch((e) => console.log(e))
    },[])
    useEffect(() => {
        return () => {
            imagePreview0 && URL.revokeObjectURL(imagePreview0.preview);
        }
    }, [imagePreview0]);
    useEffect(() => {
        return () => {
            imagePreview1 && URL.revokeObjectURL(imagePreview1.preview);
        }
    }, [imagePreview1]);
    useEffect(() => {
        return () => {
            imagePreview2 && URL.revokeObjectURL(imagePreview2.preview);
        }
    }, [imagePreview2]);
    useEffect(() => {
        return () => {
            imagePreview3 && URL.revokeObjectURL(imagePreview3.preview);
        }
    }, [imagePreview3]);

    const handleChangePreview = (e,i) => {
        let file = e.target.files[0];
        if(i===0) 
        {
            file.preview = URL.createObjectURL(file);
            setImagePreview0(file);
        }
        if(i===1){
            file.preview = URL.createObjectURL(file);
            setImagePreview1(file);
        } 
        if(i===2){
            file.preview = URL.createObjectURL(file);
            setImagePreview2(file);
        } 
        if(i===3){
            file.preview = URL.createObjectURL(file);
            setImagePreview3(file);
        } 
    };

    useEffect(() => {
        if(submit){
            formRef.current.click()
        }
    }, [submit]);

    const onHandleSubmit = (data) => {
        let formData = new FormData();

        for (let key in data) {
            if (key == 'imageAvatar') {
                formData.append('imageAvatar',imagePreview0)                
            }
            else if (key == 'imageSlide1'){
                formData.append('imageSlide1',imagePreview1)
            }
            else if (key == 'imageSlide2'){
                formData.append('imageSlide2',imagePreview1)
            }
            else if (key == 'imageSlide3'){
                formData.append('imageSlide3',imagePreview1)
            }
            else if(key == 'timeStart'){
                formData.append('timeStart', format(start, 'yyyy/MM/dd'))
            }
            else if(key == 'timeEnd'){
                formData.append('timeEnd', format(end, 'yyyy/MM/dd'))
            }
            else formData.append(key, data[key])
        }
        for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
        // const res = APIClient.createTour(formData);
        handleAddTour(formData);
        setSubmit(false)
    };
    return (
        <div className='create-tour-form-wrapper'>
            <form className='create-tour-formbody' action=" " onSubmit={handleSubmit(onHandleSubmit)} >
                <div className='form-group col-1'>
                    <label>Tên tour: </label>
                    <input {...register("tourName", {
                        required: "* Nhập tên tour.",
                        maxLength: {
                            value: 100,
                            message: '* Nhập tên quá dài.'
                        }
                    })}
                        defaultValue={tour && tour.tourName}
                    />
                    {errors.tourName && <div className="alert">{errors.tourName.message}</div>}
                </div>
                <div className="form-group col-1">
                    <label>Loại hình:</label>
                    <select {...register("typePlace", { required: "* Chọn loại hình" })} placeholder='category' defaultValue={tour && tour.typePlace}>
                        <option value="" hidden>Choose...</option>
                        {
                            listTypePlace.map((value, index) => (
                                <option value={value._id} key={index} selected={tour ? tour.typePlace === value : false}>{value.name}</option>
                            ))
                        }
                    </select>
                    {errors.region && <div className="alert">{errors.region.message}</div>}
                </div>
                <div className="form-group col-1">
                    <label>Châu lục:</label>
                    <select {...register("continent", { required: "* Chọn châu lục" })} placeholder='category' defaultValue={tour && tour.continent}>
                        <option value="" hidden>Choose...</option>
                        {
                            Continents.map((item, index) => (
                                <option value={item.value} key={index} selected={tour ? tour.continent === item.value : false}>{item.label}</option>
                            ))
                        }
                    </select>
                    {errors.continent && <div className="alert">{errors.continent.message}</div>}
                </div>
                <div className="form-group col-1">
                    <label>Quốc gia:</label>
                    <select {...register("countryName", { required: "* Chọn châu lục" })} placeholder='category' defaultValue={tour && tour.countryName} className='country-select'>
                        <option value="" hidden>Choose...</option>
                        <input type='text' />
                        {
                            countries.map((value, index) => (
                                <option value={value.name.common} key={index} selected={tour ? tour.countryName === index + 1 : false}>{value.name.common}</option>
                            ))
                        }
                    </select>
                    {errors.countryName && <div className="alert">{errors.countryName.message}</div>}
                </div>
                <div className="form-group col-1">
                    <label>Giá: </label>
                    <input type='text' {...register("price",
                        {
                            required: "* Nhập giá tiền",
                            min: {
                                value: 0,
                                message: "* Nhập lỗi"
                            },
                            max: {
                                value: 100000000,
                                message: "* Nhập lỗi"
                            },
                            pattern: {
                                value: /[0-9]/,
                                message: "* Nhập lỗi"
                            }
                        }
                    )}
                        defaultValue={tour && tour.price}
                    />
                    {errors.price && <div className="alert">{errors.price.message}</div>}
                </div>
                <div className="form-group col-1">
                    <label>Số lượng: </label>
                    <input type='text' defaultValue={tour && tour.amount} {...register("amount",
                        {
                            required: "* Nhập số lượng",
                            min: {
                                value: 0,
                                message: "* Nhập lỗi"
                            },
                            max: {
                                value: 50,
                                message: "* Nhập lỗi"
                            },
                            pattern: {
                                value: /[0-9]/,
                                message: "* Nhập lỗi"
                            }
                        }
                    )} />
                    {errors.amount && <div className="alert">{errors.amount.message}</div>}
                </div>
                <div className="form-group-date col-1 select-day" style={{ textAlign: 'left', marginTop: '10px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Typography sx={{ mt: 2, mb: 1, color: 'cadetblue', fontSize: '14px', width: '74px' }}>Thời gian: </Typography>
                        <Controller
                            name="timeStart"
                            control={control}
                            defaultValue={start}
                            render={({ field }) => (
                                <DatePicker
                                    value={start}
                                    mask="____/__/__"
                                    onChange={(newValue) => {
                                        setStart(newValue);
                                    }}
                                    renderInput={(startProps) => (
                                        <TextField {...startProps} />
                                    )}
                                />)}
                        />
                        <Box sx={{ margin: '10px', color: 'cadetblue', fontSize: '14px' }}>To</Box>
                        <Controller
                            name="timeEnd"
                            control={control}
                            defaultValue={end}
                            render={({ field }) => (
                                <DatePicker
                                    value={end}
                                    mask="____/__/__"
                                    onChange={(newValue) => {
                                        setEnd(newValue);
                                    }}
                                    renderInput={(endProps) => (
                                        <TextField {...endProps} />
                                    )}
                                />)}
                        />
                    </LocalizationProvider>
                </div>
                <div className="form-group col-1">
                    <label>Giảm giá:</label>
                    <select {...register("discount", { required: "* Chọn mức giảm giá" })} placeholder='discount' defaultValue={tour && tour.discount}>
                        <option value={0}>0%</option>
                        {
                            Discounts.map((value, index) => (
                                <option value={value / 100} key={index} selected={tour ? tour.discount == value / 100 : false}>{value}%</option>
                            ))
                        }
                    </select>
                    {errors.discount && <div className="alert">{errors.discount.message}</div>}
                </div>
                <div className="form-group col-1">
                    <label>Khách sạn: </label>
                    <input defaultValue={tour && tour.hotelName} {...register("hotelName", {
                        required: "* Nhập tên khách sạn!",
                        minLength: {
                            value: 0,
                            message: "* Nhập sai",
                        },
                        maxLength: {
                            value: 100,
                            message: "* Tên quá dài!"
                        }
                    })} />
                    {errors.hotelName && <div className="alert">{errors.hotelName.message}</div>}
                </div>
                <div className="form-group col-2">
                    <label>Lịch trình: </label>
                    <textarea type="text" defaultValue={tour && tour.schedule} style={{ height: '150px' }} {...register("schedule", {
                        required: "* Nhập lịch trình!",
                        minLength: {
                            value: 20,
                            message: "* Thêm thông tin lịch trình",
                        },
                        maxLength: {
                            value: 1024,
                            message: "* Thông tin quá dài!"
                        }
                    })} />
                    {errors.schedule && <div className="alert">{errors.schedule.message}</div>}
                </div>
                <div className="form-group col-2">
                    <label>Mô tả: </label>
                    <textarea style={{ height: '150px' }}  {...register("description", {
                        minLength: {
                            value: 20,
                            message: "* Nhập thêm thông tin mô tả",
                        },
                        maxLength: {
                            value: 1024,
                            message: "* Mô tả quá dài!"
                        }
                    })}
                        defaultValue={tour && tour.description}
                    />
                    {errors.description && <div className="alert">{errors.description.message}</div>}
                </div>
                <div className="form-group form-group-img col-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label>Hình ảnh: </label>
                    <input type='file' {...register("imageAvatar")} name="imageAvatar" onChange={(e)=>handleChangePreview(e,0)} id='image-0' className='image-select' />
                    <input type='file' {...register("imageSlide1")} name="imageSlide1" onChange={(e)=>handleChangePreview(e,1)} id='image-1' className='image-select'/>
                    <input type='file' {...register("imageSlide2")} name="imageSlide2" onChange={(e)=>handleChangePreview(e,2)} id='image-2' className='image-select'/>
                    <input type='file' {...register("imageSlide3")} name="imageSlide3" onChange={(e)=>handleChangePreview(e,3)} id='image-3' className='image-select'/>
                    <div className='image-slide'>
                        <div className='image-slide__item' onClick={()=>{document.getElementById('image-0').click()}}>
                            {(!imagePreview0 && !tour) && <AddIcon fontSize='large' />}
                            {imagePreview0 && <img src={imagePreview0.preview}/>}
                            {(!imagePreview0 && tour) && <img src={ConvertToImageURL(tour.imageUrl)}/>}
                        </div>
                        <div className='image-slide__item' onClick={()=>{document.getElementById('image-1').click()}}>
                            {(!imagePreview1 && !tour) && <AddIcon fontSize='large' />}
                            {imagePreview1 && <img src={imagePreview1.preview}/>}
                            {(!imagePreview1 && tour) && <img src={ConvertToImageURL(tour.imageUrl)}/>}
                        </div>
                        <div className='image-slide__item' onClick={()=>{document.getElementById('image-2').click()}}>
                            {(!imagePreview2 && !tour) && <AddIcon fontSize='large' />}
                            {imagePreview2 && <img src={imagePreview2.preview}/>}
                            {(!imagePreview2 && tour) && <img src={ConvertToImageURL(tour.imageUrl)}/>}
                        </div>
                        <div className='image-slide__item' onClick={()=>{document.getElementById('image-3').click()}}>
                            {(!imagePreview3 && !tour) && <AddIcon fontSize='large' />}
                            {imagePreview3 && <img src={imagePreview3.preview}/>}
                            {(!imagePreview3 && tour) && <img src={ConvertToImageURL(tour.imageUrl)}/>}
                        </div>
                    </div>
                </div>
                <button type='submit' ref={formRef} style={{display:'none'}}>SUBMIT</button>
            </form>

        </div>
    );
}

export default TourForm;