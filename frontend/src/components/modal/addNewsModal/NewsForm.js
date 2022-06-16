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
import { CONTINENTS } from '../../../Constants/dataForm';
import ConvertToImageURL from '../../../LogicResolve/ConvertToImageURL';
import NewsAPI from 'api/NewsAPI';

const Discounts = ["10", "20", "30", "40", "50", "60", "70"]

function NewsForm({ handleAddNews, handleUpdateNews, news, submit = false, setSubmit = ()=>{} }) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();
    const formRef = useRef(null)
    const [dataPrevious, setDataPrevios] = useState(news);
    // const [typePlaces, setTypePlaces] = useState([]);
    const {account} = useSelector((store) => store.user) 
    const dispatch = useDispatch()
    const [imagePreview, setImagePreview] = useState()

    useEffect(() => {
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview.preview);
        }
    }, [imagePreview]);

    const handleChangePreview = (e) => {
        const file = e.target.files[0];
        if (file) file.preview = URL.createObjectURL(file);
        setImagePreview(file);
    };

    useEffect(() => {
        if(submit){
            formRef.current.click()
        }
    }, [submit]);

    const onHandleSubmit = (data) => {
        let formData = new FormData();

        for (let key in data) {
            if (key == 'imageUrl') {
                console.log(123);
                formData.append('imageUrl',imagePreview)    
                console.log(formData);            
            }
            else formData.append(key, data[key])
        }
        for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
        formData.append("owner", account._id)
        if(news) handleUpdateNews(news._id.toString(), formData)
        else handleAddNews(formData);
        setSubmit(false)
    };
    return (
        <div className='create-tour-form-wrapper'>
            <form className='create-tour-formbody' action=" " onSubmit={handleSubmit(onHandleSubmit)} >
                <div className='form-group col-1'>
                    <label>Tiêu đề: </label>
                    <input {...register("title", {
                        required: "* Nhập tiêu đề tin tức.",
                        maxLength: {
                            value: 100,
                            message: '* Nhập tiêu đề tin tức quá dài.'
                        }
                    })}
                        defaultValue={news && news.title}
                        style={{width: '250px'}}
                    />
                    {errors.news && <div className="alert">{errors.title.message}</div>}
                </div>
             
                <div className="form-group col-2">
                    <label>Nội dung: </label>
                    <textarea style={{ height: '150px' }}  {...register("description", {
                        minLength: {
                            value: 20,
                            message: "* Nhập thêm nội dung",
                        },
                        maxLength: {
                            value: 2048,
                            message: "*Nội dung tin tức quá dài!"
                        }
                    })}
                        defaultValue={news && news.description}
                    />
                    {errors.description && <div className="alert">{errors.description.message}</div>}
                </div>
                <div className="form-group form-group-img col-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label>Hình ảnh: </label>
                    <input type='file' {...register("imageUrl")} name="imageUrl" onChange={(e)=>handleChangePreview(e)} id='image-0' className='image-select' />
                    <div className='image-slide'  style={{marginLeft:'65px'}} >
                        <div className='image-slide__item'onClick={()=>{document.getElementById('image-0').click()}}>
                            {(!imagePreview && !news) && <AddIcon fontSize='large' />}
                            {imagePreview && <img src={imagePreview.preview}/>}
                            {(!imagePreview && news) && <img src={ConvertToImageURL(news.imageUrl)}/>}
                        </div>
                    </div>
                </div>
                <button type='submit' ref={formRef} style={{display:'none'}}>SUBMIT</button>
            </form>

        </div>
    );
}

export default NewsForm;