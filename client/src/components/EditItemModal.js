import React, { useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Select, message, Upload } from 'antd';
import { useState } from 'react';
import './ModalCreate.css'
import { PlusCircleOutlined } from '@ant-design/icons';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';


export const EditItemModal = ({itemsList, data, updateItems}) => {
  const {token} = useContext(AuthContext);
  const {request} = useHttp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState(
    {name: '',
  id: '',
  tags: ''})

const changeHandler = (event) => {
console.log(data.name)
    setModal({ ...modal, [event.target.name]: event.target.value });
};


const editCollectionHandler = async (id) => {
  try {
    const data = await request( `/api/item/${id}`, 'PUT', {...modal}, {Authorization: `Bearer ${token}`})
    const updatedItemsList = itemsList.map((item) => item._id === id ? {...item} : modal);
        updateItems(updatedItemsList);
    console.log('iwdwhidhi', modal)
    // await message.success(data.message);
  } catch (e) {
      showMessage(e.message);
  }
};
// const handleDelete = async (id) => {
//     try {
//         const data = await request(`/api/item/${id}`, 'DELETE', null, {
//             Authorization: `Bearer ${token}`});
//         const updatedItemsList = itemsList.filter((item) => item._id !== id);
//         setItemsList(updatedItemsList);
//         message.success(data.message);
//     } catch (error) {
//       message.error('Something went wrong, try again');
//     }
//   };

const showMessage = (msg) => {
  message.error(msg);
};

const onSearch = (value) => {
  console.log('search:', value);
};

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (id) => {
    setIsModalVisible(false);
    editCollectionHandler(id)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button block className="showModalBtn" onClick={showModal} type="primary" style={{marginBottom: 16}} >
        Изменить айтем
      </Button>
      <Modal title="Изменить айтем" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className='modalInput'><h3 className='inputTitle'>Название</h3><Input placeholder="Изменить название" name='name' onChange={changeHandler} /></div>
        <div className='modalInput'><h3 className='inputTitle'>Теги</h3><Input placeholder="Описание коллекции" name='tags' onChange={changeHandler} /></div>
      </Modal>
    </>
  );
};