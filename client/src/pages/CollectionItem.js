import { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useParams } from "react-router-dom";
import "./CollectionItem.css";
import { message, Popconfirm } from "antd";
import { AuthContext } from "../context/auth.context";
import { Space, Table, Tag, Button, Modal, Input } from "antd";
import React from "react";
import { CreateItemModal } from "../components/CreateItemModal";

export const CollectionItem = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [collection, setCollection] = useState([]);
  const [items, setItems] = useState([]);
  const collectionId = useParams().id;
  const [itemsList, setItemsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState({ name: "", tags: "" });

  const [recordToUpdate, setRecordToUpdate] = useState(null)

  const showModal = (record) => {
    setModal({name: record.name, tags: record.tags});
    setRecordToUpdate(record)
    setIsModalVisible(true);
  };

  const handleOk = () => {
      editItemsHandler();
      setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changeHandler = (event) => {
    setModal({ ...modal, [event.target.name]: event.target.value });
  };

  const editItemsHandler = async () => {
    try {
        console.log({result: {...recordToUpdate, name: modal.name, tags: modal.tags}})
        const data = await request(`/api/item/${recordToUpdate._id}`, "PUT", {...recordToUpdate, name: modal.name, tags: modal.tags}, { Authorization: `Bearer ${token}` });
        const updatedItemsList = itemsList.map((item) => item._id === recordToUpdate.id ? {...item, name: modal.name, tags: modal.tags} : item);
        setItemsList(updatedItemsList)
        await message.success(data.message);
    } catch (e) {
    //   showMessage(e.message);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      editable: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "Collections",
      key: "collectionsName",
      dataIndex: "collectionsName",
    },

    {
      title: "Action",
      key: "delete",
      render: (_, record) =>
        data.length ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: "Action",
      key: "edit",
      render: (_, record) =>
        data.length ? (
          <div>
            <Button
              block
              className="showModalBtn"
              onClick={() => showModal(record)}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              Изменить айтем
            </Button>
            <Modal
              title="Изменить айтем"
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
                <h3 className="inputTitle">Теги</h3>
                <Input
                  placeholder="Описание коллекции"
                  name="tags"
                  value={modal.tags}
                  onChange={changeHandler}
                />
              </div>
            </Modal>
          </div>
        ) : null,
    },
  ];

  const data = itemsList.map((item) => ({
    ...item,
    key: item._id
  }));

  const fetchItems = useCallback(async () => {
    try {
      const fetched = await request("/api/item/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      const lol = fetched.filter((item) => item.collections === collectionId)
      setItemsList(lol);
    } catch (e) {}
  }, [token, request, collectionId]);

  const updateItems = (item) => {
    setItems([...items, item])
  }


  useEffect(() => {
    fetchItems()
  }, [fetchItems, items]);


  const getCollection = useCallback(async () => {
    try {
      const fetched = await request(
        `/api/collection/${collectionId}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setCollection(fetched);
    } catch (e) {}
  }, [token, collectionId, request]);


  useEffect(() => {
    getCollection();
  }, [getCollection]);

  const handleDelete = async (id) => {
    try {
      const data = await request(`/api/item/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      const updatedItemsList = itemsList.filter((item) => item._id !== id);
      setItemsList(updatedItemsList);
      message.success(data.message);
    } catch (error) {
      message.error("Something went wrong, try again");
    }
  };

  //   const handleEdit = async (id) => {
  //     try {
  //         const data = await request(`/api/item/${id}`, 'DELETE', null, {
  //             Authorization: `Bearer ${token}`});
  //         console.log('data', data)
  //         const updatedItemsList = itemsList.filter((item) => item._id !== id);
  //         console.log(updatedItemsList)
  //         setItemsList(updatedItemsList);
  //         message.success(data.message);
  //     } catch (error) {
  //     //   message.error('Something went wrong, try again');
  //     }
  //   };

  return (
    <div className="containerItem">
      <div>
        <h2>{collection.name}</h2>
        <div>{collection.description}</div>
        <div>{collection.theme}</div>
        <img src={collection.image} alt="image" />
      </div>
      {/* <button type="primary" onClick={() => {console.log(collectionId)}} style={{width: 20, height: 20, marginBottom: 16}} ></button> */}
      <CreateItemModal updateItems={updateItems} collection={collection} />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
