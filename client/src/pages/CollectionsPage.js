import "./CollectionsPage.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ModalCreate } from "../components/ModalCreate";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { Card} from 'antd';
import { Button, Modal, Input, Select, message, Upload } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';
import { BrowserRouter, Link, NavLink } from "react-router-dom";
const { Meta } = Card;
const { Option } = Select;

export const CollectionsPage = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState('')
  const [modal, setModal] = useState({ name: "", description: "", theme: "" });
  const [recordToUpdate, setRecordToUpdate] = useState(null)

  const fetchCollections = useCallback(async () => {
    try {
      const fetched = await request("/api/collection/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setCollections(fetched);

    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections, collections]);

  const updateCollection = (collection) => {
    setCollections([...collections, collection])
  }

  const deleteCollection = async (id) => {
    try {
      const data = await request(`/api/collection/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      const updatedCollectionsList = collections.filter((item) => item._id !== id);
      setCollections(updatedCollectionsList);
      message.success(data.message);
    } catch (error) {
      message.error("Something went wrong, try again");
    }
  };

  function deleteCollectionHandler (event, id) {
    event.preventDefault()
    deleteCollection(id)
  }

  const showModal = (event, collection) => {
    
    event.preventDefault()
    console.log('SHOW: ', {collection})
    setModal({name: collection.name, description: collection.description, theme: collection.theme});
    setRecordToUpdate(collection)
    setIsModalVisible(true);
  };

  const handleOk = () => {
      editCollectionsHandler();
      setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changeHandler = (event) => {
    setModal({ ...modal, [event.target.name]: event.target.value });
  };

  const showMessage = (msg) => {
    message.error(msg);
  };

  const editCollectionsHandler = async () => {
    try {
        const data = await request(`/api/collection/${recordToUpdate._id}`, "PUT", {...recordToUpdate, name: modal.name, description: modal.description, theme: modal.theme}, { Authorization: `Bearer ${token}` });
        const updatedItemsList = collections.map((item) => item._id === recordToUpdate.id ? {...item, name: modal.name, description: modal.description, theme: modal.theme} : item);
        setCollections(updatedItemsList)
        await message.success(data.message);
    } catch (e) {
      showMessage(e.message);
    }
  };

  const onChangeInput = (event) => {
    const file = event.target.files.item(0)
    const reader = new FileReader();
    reader.onload = event => {
      setImage(event.target.result )
  
    };
    reader.readAsDataURL(file);
  
  }

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const handleChange = (value) => {
    setModal({...modal, 'theme': value})

  };



  return (
    <div className="container">
      <ModalCreate updateCollection={updateCollection} />

      <div className="collectionsList">
        {collections.map((collection, index) => {
          return (

            <Link to={`/detail/${collection._id}`}>
            <Card
              key={index}
              hoverable
              className="card"
              cover={<img alt="image" src={collection.image} />}
            >
              <Meta
                title={<div>{collection.theme}</div>}
                description={
                  <div>
                    <div>{collection.name}</div>
                    <div>{collection.description}</div>
                    <button type="primary" onClick={(event) => deleteCollectionHandler(event, collection._id)} style={{width: 20, height: 20, marginBottom: 16}} >Delete</button>
                    {/* <button onClick={(event) => showModal(event, collection)} style={{width: 20, height: 20, marginBottom: 16}} >Edit</button> */}
                    <Button block className="showModalBtn" onClick={(event) => showModal(event, collection)} icon={<PlusCircleOutlined />} >
        Изменить коллекцию
      </Button>

                    {/* <Button
              block
              className="showModalBtn"
              onClick={() => showModal(collection)}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              Изменить collection
            </Button>
            <Modal
              title="Изменить коллекцию"
              visible={isModalVisible}        
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="modalInput">
                <h3 className="inputTitle">Название</h3>
                <Input
                  placeholder="Изменить название"
                  name="name"
                  value={modal.name}
                  onChange={changeHandler}
                />
              </div>
              <div className="modalInput">
                <h3 className="inputTitle">Описание</h3>
                <Input
                  placeholder="Описание коллекции"
                  name="description"
                  value={modal.description}
                  onChange={changeHandler}
                />
              </div>

            </Modal> */}
                  </div>
                }
              />
            </Card>
            </Link>

          );
        })}
      </div>
      <Modal title="Добавить коллекцию" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
        <div className='modalInput'><h3 className='inputTitle'>Название</h3><Input placeholder="Введите название" value={modal.name} name='name' onChange={changeHandler} /></div>
        <div className='modalInput'><h3 className='inputTitle'>Описание</h3><Input placeholder="Описание коллекции" value={modal.description} name='description' onChange={changeHandler}  /></div>
        <div className='modalInput'><h3>Тема</h3>
        <Select
    showSearch
    placeholder="Выберите тему"
    optionFilterProp="children"
    onChange={handleChange}
    onSearch={onSearch}
    value={modal.name}
    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
  >
    <Option value='Книги'>Книги</Option>
    <Option  value='Музыка'>Музыка</Option>
    <Option value='Кино'>Кино</Option>
  </Select></div>

        <div className='modalInput'><h3>Загрузить изображение</h3>
        <input type="file" className="form-control-file" onChange={onChangeInput}/>
  </div>
      </Modal>
    </div>
  );
};
