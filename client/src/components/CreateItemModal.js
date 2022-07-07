import React, { useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Select, message, Upload } from 'antd';
import { useState } from 'react';
import './ModalCreate.css'
import { PlusCircleOutlined } from '@ant-design/icons';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';


export const CreateItemModal = ({updateItems, collection}) => {
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState({
    name: '',
    id: '',
    tags: ''})


const changeHandler = (event) => {
  console.log('collec', collection)
    setModal({ ...modal, [event.target.name]: event.target.value });
};


const createCollectionHandler = async () => {
  try {
    const data = await request( '/api/item/add', 'POST', {...modal, collection}, {Authorization: `Bearer ${auth.token}`})
    updateItems(data)
    await message.success(data.message);
    console.log(data)
  } catch (e) {
      showMessage(e.message);
  }
};

const showMessage = (msg) => {
  message.error(msg);
};

const onSearch = (value) => {
  console.log('search:', value);
};

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    createCollectionHandler()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button block className="showModalBtn" onClick={showModal} type="primary" style={{marginBottom: 16}} >
        Добавить айтем
      </Button>
      <Modal title="Добавить айтем" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className='modalInput'><h3 className='inputTitle'>Название</h3><Input placeholder="Введите название" name='name' onChange={changeHandler} /></div>
        <div className='modalInput'><h3 className='inputTitle'>Теги</h3><Input placeholder="Описание коллекции" name='tags' onChange={changeHandler} /></div>
      </Modal>
    </>
  );
};