import React, { useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Select, message, Upload } from 'antd';
import { useState } from 'react';
import './ModalCreate.css'
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
const { Option } = Select;


export const ModalCreate = ({updateCollection}) => {
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState('')
  const [modal, setModal] = useState({
    name: '',
    description: '',
    theme: ''})


const changeHandler = (event) => {
    setModal({ ...modal, [event.target.name]: event.target.value });
};

const onChangeInput = (event) => {
  const file = event.target.files.item(0)
  const reader = new FileReader();
  reader.onload = event => {
    setImage(event.target.result )
    
  };
  reader.readAsDataURL(file);

}

const createCollectionHandler = async () => {
  try {
    const data = await request( '/api/collection/create', 'POST', {...modal, image}, {Authorization: `Bearer ${auth.token}`})
    updateCollection(data)
    await message.success(data.message);
  } catch (e) {
      showMessage(e.message);
  }
};

const showMessage = (msg) => {
  message.error(msg);
};



  // const props = {
  //   name: 'file',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  
    // onChange(info) {
    //   if (info.file.status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    
    //     message.success(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
  // };

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
    // downloadImage()
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
        <input type="file" className="form-control-file" onChange={onChangeInput}/>
  </div>
      </Modal>
    </>
  );
};