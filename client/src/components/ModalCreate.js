import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Select, message, Upload } from 'antd';
import { useState } from 'react';
import './ModalCreate.css'
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
const { Option } = Select;


export const ModalCreate = () => {
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState({
    name: '',
    description: '',
    theme: ''})
    // image: '',
    // owner: '',
    // date: ''
    const [image, setImage] = useState('')
    


const changeHandler = (event) => {
    setModal({ ...modal, [event.target.name]: event.target.value });
};

const onFileChangeHandler = (event) => {
  setImage({[event.target.name]: event.target.files[0]})
  console.log('uuu' , event.target.files[0])
}
const createCollectionHandler = async () => {
 
  try {
    const data = await request( '/api/collection/create', 'POST', {...modal}, {Authorization: `Bearer ${auth.token}`})
    console.log(data)
    // await message.success(data.message);
  } catch (e) {
      showMessage(e.message);
  }
};

const downloadImage = async ()  => {
  try {
  const data = await request( '/api/collection/stats', 'POST', {image: image})
 console.log(data)

  } catch (e) {
    showMessage(e.message);
  }
}
const showMessage = (msg) => {
  message.error(msg);
};



  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

// const onChange = (value) => {
//   console.log(`selected ${value}`);
// };

const onSearch = (value) => {
  console.log('search:', value);
};

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    
    setIsModalVisible(false);
    downloadImage()
    createCollectionHandler()
    
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (value) => {
    setModal({...modal, 'theme': value})

  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Добавить коллекцию
      </Button>
      <Modal title="Добавить коллекцию" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className='modalInput'><h3 className='inputTitle'>Название</h3><Input placeholder="Введите название" name='name' onChange={changeHandler} /></div>
        <div className='modalInput'><h3 className='inputTitle'>Описание</h3><Input placeholder="Описание коллекции" name='description' onChange={changeHandler} /></div>
        <div className='modalInput'><h3>Тема</h3>
        <Select
    showSearch
    placeholder="Выберите тему"
    optionFilterProp="children"
    onChange={handleChange}
    onSearch={onSearch}
    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
  >
    <Option value='Jack'>Jack</Option>
    <Option  value='Lucy'>Lucy</Option>
    <Option value='Tom'>Tom</Option>
  </Select></div>
  
        <div className='modalInput'><h3>Загрузить изображение</h3>
        <Upload {...props}>
    <Button icon={<UploadOutlined />} 
    value={image}
    onChange={onFileChangeHandler}
    >Кликни чтобы загрузить</Button>
  </Upload>
  </div>
      </Modal>
    </>
  );
};